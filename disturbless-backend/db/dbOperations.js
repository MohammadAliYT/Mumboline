const { calculateLimit, calculateSkip } = require("./dbutils");
const {
  UserTransaction,
  Messages,
  Numbers,
  ReleasedNumber,
  User,
  Calls,
  ReservedNumbers,
} = require("./models");
const { getSubscriptionQuota, getExpiryDate } = require("./subscriptions");
const { getRandomLabel } = require("../util/util");
const moment = require("moment");

async function getTransactionSession(orderId) {
  try {
    const transactionObject = await UserTransaction.findOne(
      {
        "transactionEvents.orderId": orderId,
      },
      {
        transactionEvents: {
          $elemMatch: {
            orderId: orderId,
          },
        },
      }
    );
    return transactionObject;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function getTransactionSessionForSubscription(subscriptionId) {
  try {
    return await UserTransaction.findOne(
      {
        "transactionEvents.subscriptionId": subscriptionId,
      },
      {
        transactionEvents: {
          $elemMatch: {
            subscriptionId: subscriptionId,
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function saveTransactionSession(
  userId,
  sessionId,
  number,
  isoCountry,
  transactionType,
  amount,
  addressSid,
  interval
) {
  let response = UserTransaction.updateOne(
    {
      _id: userId,
    },
    {
      $push: {
        transactionEvents: {
          orderId: sessionId,
          transactionType: transactionType,
          amount: amount,
          number: number,
          isoCountry: isoCountry,
          date: new Date(),
          addressSid: addressSid,
          interval: interval,
        },
      },
    },
    {
      upsert: true,
    }
  );

  return response;
}

async function getNewMessagesForAGivenContact(
  userId,
  disturblessNumber,
  contactNumber,
  unixTime
) {
  return Messages.aggregate([
    {
      $match: {
        userId: userId,
        disturblessNumber: disturblessNumber,
        contactNumber: contactNumber,
      },
    },
    {
      $project: {
        disturblessNumber: 1,
        contactNumber: 1,
        newMessages: {
          $filter: {
            input: "$messages",
            as: "message",
            cond: {
              $gt: ["$$message.when", new Date(unixTime)],
            },
          },
        },
      },
    },
  ]);
}

function getAllNewMessages(userId, unixTime) {
  return Messages.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $project: {
        disturblessNumber: 1,
        contactNumber: 1,
        newMessages: {
          $filter: {
            input: "$messages",
            as: "message",
            cond: {
              $gte: ["$$message.when", new Date(Number(unixTime))],
            },
          },
        },
      },
    },
  ]);
}

// TODO: hasNumberAndStillActive
async function hasNumber(user, number) {
  let document = await Numbers.aggregate([
    {
      $match: {
        _id: user._id,
        // _id: "6467244213d0ee7eb36d5a5b",
      },
    },
    {
      $unwind: "$numbers",
    },
    {
      $match: {
        "numbers.number": number,
      },
    },
  ]);

  return document.length > 0;
}

async function getMessages(
  user,
  disturblessNumber,
  foreignNumber,
  lowerBound,
  upperBound
) {
  let documents = await Messages.aggregate([
    {
      $match: {
        userId: user._id,
      },
    },
    {
      $unwind: "$messages",
    },
    {
      $match: {
        $and: [
          {
            disturblessNumber: disturblessNumber,
          },
          {
            contactNumber: foreignNumber,
          },
        ],
      },
    },
    {
      $sort: {
        "messages.when": -1,
      },
    },
    // {
    //   $limit: calculateLimit(upperBound),
    // },
    // {
    //   $skip: calculateSkip(lowerBound),
    // },
    {
      $project: {
        contact: "$contactNumber",
        number: "$disturblessNumber",
        when: "$messages.when",
        source: "$messages.SmsStatus",
        content: "$messages.Body",
        RecordingUrl: "$messages.RecordingUrl",
        TranscriptionText: "$messages.TranscriptionText",
      },
    },
  ]);

  documents.reverse();

  if (documents == null || documents.length == 0) return ["No messages yet"];
  else return documents;
}

async function getCalls(
  userId,
  disturblessNumber,
  contactNumber,
  lowerBound,
  upperBound
) {
  try {
    const documents = await Calls.aggregate([
      {
        $match: {
          userId,
          disturblessNumber,
          contactNumber,
          // calls: {
          //   $elemMatch: {
          //     disturblessNumber: disturblessNumber,
          //     contactNumber : contactNumber,
          //   },
          // },
        },
      },
      // {
      //   $unwind: "$calls",
      // },
      // {
      //   $match: {
      //     $and: [
      //       {
      //         disturblessNumber: disturblessNumber,
      //       },
      //       {
      //         contactNumber: contactNumber,
      //       },
      //     ],
      //   },
      // },
      // {
      //   $sort: {
      //     "calls.when": -1,
      //   },
      // },
      // {
      //   $limit: calculateLimit(upperBound),
      // },
      // {
      //   $skip: calculateSkip(lowerBound),
      // },
      // {
      //   $project: {
      //     contact: "$contactNumber",
      //     number: "$disturblessNumber",
      //     when: "$messages.when",
      //     source: "$messages.SmsStatus",
      //     content: "$messages.Body",
      //   },
      // },

      // {
      //   $group: {
      //     _id: "$disturblessNumber",
      //     calls: {
      //       $addToSet: "$contactNumber",
      //     },
      //   },
      // },

      // newMessages: {
      //   $filter: {
      //     input: "$messages",
      //     as: "message",
      //     cond: {
      //       $gt: ["$$message.when", new Date(unixTime)],
      //     },
      //   },
      // },
    ]);

    // documents.reverse();

    return documents;
  } catch (error) {
    return { error: error.message };
  }
}

async function getUserBalanceById(id) {
  let document = await UserTransaction.findById(id).lean();

  if (document == null) return {};
  else return document.balance;
}

// async function getUserActivityById(id) {
//   let document = await UserTransaction.findById(id);
//   console.log("Break here");
// }

async function getRecentReceivedMessagesById(id, direction) {
  let document = await Messages.aggregate([
    {
      $match: {
        userId: id,
      },
    },
    {
      $unwind: "$messages",
    },
    {
      $match: {
        "messages.SmsStatus": direction,
      },
    },
    {
      $sort: {
        "messages.when": -1,
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        // _id: 0,
        contact: "$contactNumber",
        ourNumber: "$disturblessNumber",
        message: "$messages.Body",
        when: "$messages.when",
        status: "$messages.SmsStatus",
      },
    },
  ]);

  if (document == null) return {};
  else return document;
}

async function getActiveNumbers(id) {
  return await Numbers.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $project: {
        _id: 0,
        numbers: "$numbers.number",
      },
    },
  ]);
}

async function getNumbers(id) {
  return await Numbers.find({
    _id: id,
  });
}

async function getContactsPerNumberById(id) {
  return await Messages.find(
    { userId: id },
    { _id: 0, disturblessNumber: 1, contactNumber: 1 }
  ).sort({ updatedAt: -1 });
}

async function getCallsPerNumberById(id) {
  return await Calls.aggregate([
    {
      $match: {
        userId: id,
      },
    },
    {
      $unwind: "$calls",
    },
    {
      $sort: {
        "calls.when": -1,
      },
    },
    {
      $group: {
        _id: "$disturblessNumber",
        calls: {
          $addToSet: "$contactNumber",
        },
      },
    },
    {
      $project: {
        _id: 0,
        disturblessNumber: "$_id",
        calls: 1,
      },
    },
  ]);
}

async function numberExistsInNumbersCollection(userId, number) {
  let document = await Numbers.findOne({
    _id: userId,
    "numbers.number": number,
  });

  if (document == null) return false;
  else return true;
}

function updateNumberSettings(req, res, settings, number) {
  Numbers.findOneAndUpdate(
    {
      _id: req.user._id,
      "numbers.number": number,
    },
    {
      $set: {
        "numbers.$.label": settings.label,
        "numbers.$.settings.forwarding.toEmail": settings.toEmail,
        "numbers.$.settings.forwarding.emailAddress": settings.emailAddress,
        "numbers.$.settings.forwarding.toPrimaryPhone": settings.toPrimaryPhone,
        "numbers.$.settings.forwarding.primaryPhoneNumber":
          settings.primaryPhoneNumber,
        "numbers.$.settings.forwarding.voiceMailGreeting":
          settings.voiceMailGreeting,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) res.status(500).json({ error: "Internal server error" });
      else res.json(doc);
    }
  );
}
async function updateNumberSetting(id, number, setting, value) {
  try {
    return await Numbers.findOneAndUpdate(
      {
        _id: id,
        "numbers.number": number,
      },
      {
        $set: {
          [`numbers.$.settings.forwarding.${setting}`]: value,
        },
      },
      { new: true }
    );
  } catch (error) {
    return { error: error.message };
  }
}

async function disableNumber(id, number) {
  try {
    return Numbers.findOneAndUpdate(
      {
        _id: id,
        "numbers.number": number,
      },
      {
        $set: {
          "numbers.$.autoRenew": false,
          "numbers.$.isActive": false,
        },
      },
      { new: true }
    );
  } catch (error) {
    return { error: error.message };
  }
}

async function enableNumber(id, number) {
  try {
    return Numbers.findOneAndUpdate(
      {
        _id: id,
        "numbers.number": number,
      },
      {
        $set: {
          "numbers.$.autoRenew": true,
          "numbers.$.isActive": true,
        },
      },
      { new: true }
    );
  } catch (error) {
    return { error: error.message };
  }
}

async function deleteNumber(id, sid) {
  try {
    return Numbers.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          numbers: {
            sid,
          },
        },
      }
    );
  } catch (error) {
    return { error: error.message };
  }
}

async function orderIdAlreadyExists(userId, orderId) {
  let transactions = await UserTransaction.findOne({
    _id: userId,
    "transactionEvents.orderId": orderId,
  });

  if (transactions == null) return false;
  else return true;
}

async function appendReservedNumber(number) {
  return await ReservedNumbers.create({ number, expireAt: moment() });
}

async function getReservedNumber(number) {
  const numbers = await ReservedNumbers.find();
  return numbers.map(({ number }) => number);
}

async function appendTransaction(
  userId,
  orderId,
  transactionType,
  transactionAmount,
  balanceIncrement = 0,
  number,
  addressSid,
  subscriptionId,
  phoneNumberSid
) {
  try {
    const transaction = await UserTransaction.updateOne(
      {
        _id: userId,
      },
      {
        $inc: {
          currentBalance: balanceIncrement,
        },
        $push: {
          transactionEvents: {
            orderId: orderId,
            transactionType: transactionType,
            amount: transactionAmount,
            number: number,
            date: new Date(),
            addressSid: addressSid,
            subscriptionId: subscriptionId,
            phoneNumberSid: phoneNumberSid,
          },
        },
      },
      {
        upsert: true,
      }
    );

    return transaction;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function getNumber(userId, number) {
  try {
    return await Numbers.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: "$numbers",
      },
      {
        $match: {
          "numbers.number": number,
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function getNumberWithoutUser(number) {
  try {
    return await Numbers.aggregate([
      {
        $unwind: "$numbers",
      },
      {
        $match: {
          "numbers.number": number,
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getNumberWithSubscriptionId(id) {
  try {
    return await Numbers.aggregate([
      {
        $unwind: "$numbers",
      },
      {
        $match: {
          "numbers.subscriptionId": id,
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    return [];
  }
}

// TODO: Support multiple providers by providing neutral params to the provider
async function appendNumber(
  userId,
  number,
  friendlyName,
  isoCountry,
  sid,
  addressRequirements,
  addressSid,
  subscriptionId,
  interval
) {
  // push a numbers object into the numbers array with an updateOne
  try {
    const userEmail = await getUserEmail(userId);
    const response = await Numbers.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          numbers: {
            number: number,
            friendlyName: friendlyName,
            sid: sid,
            addressRequirements: addressRequirements,
            addressSid: addressSid,
            provider: "TWILIO",
            costData: {
              inboundSmsPrice: 0.0075,
              outboundSmsPrice: 0.0075,
            },
            country: getCountryNameByCode(isoCountry),
            label: getRandomLabel(),
            verified: false,
            subscriptionId: subscriptionId,
            billingId:
              "insertWhicheverIdToIdentifyTransactionOrBillingMethodHere",
            isActive: true,
            autoRenew: true,
            expires: getExpiryDate(interval),
            firstPurchased: new Date(),
            settings: {
              forwarding: {
                toEmail: false,
                emailAddress: userEmail.username,
                toPrimaryPhone: false,
                primaryPhoneNumber: "",
                voiceMailGreeting: "Hello, please leave a message!",
              },
            },
            subscriptions: [getSubscriptionQuota(interval)],
          },
        },
      },
      {
        upsert: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function appendReleasedNumber(userId, number) {
  try {
    return await ReleasedNumber.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          numbers: number,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function appendNotificationSubscription(userId, subscription) {
  return await User.updateOne(
    { _id: userId },
    {
      $addToSet: {
        subscriptions: subscription,
      },
    }
  );
}

async function deleteNotificationSubscription(userId, subscription) {
  return await User.updateOne(
    { _id: userId },
    {
      $pull: {
        subscriptions: subscription,
      },
    }
  );
}

async function getNotificationSubscriptions(userId) {
  return await User.findOne({ _id: userId }, { _id: 0, subscriptions: 1 });
}

async function getReleasedNumbersByCountry(isoCountry) {
  try {
    return await ReleasedNumber.find({
      isoCountry,
    });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function getReleasedNumber(phoneNumber) {
  try {
    return await ReleasedNumber.find({
      phoneNumber,
    });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function deleteReleasedNumber(phoneNumber) {
  try {
    return await ReleasedNumber.deleteOne({
      phoneNumber,
    });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function cancelNumberSubscription(userId, number) {
  return await Numbers.updateOne(
    {
      _id: userId,
      "numbers.number": number,
    },
    {
      $set: {
        "numbers.$.autoRenew": false,
      },
    }
  );
}

async function getActiveNumberSubscriptions(userId) {
  let numbers = await Numbers.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $unwind: "$numbers",
    },
    // {
    //   $match: {
    //     "numbers.autoRenew": true,
    //   },
    // },
    {
      $project: {
        _id: 0,
        "numbers.number": 1,
        "numbers.friendlyName": 1,
        "numbers.subscriptionId": 1,
        "numbers.provider": 1,
        "numbers.autoRenew": 1,
        "numbers.lastPaidForUsing": 1,
        "numbers.country": 1,
        "numbers.expires": 1,
        "numbers.subscriptions": 1,
      },
    },
    {
      $project: {
        autoRenew: "$numbers.autoRenew",
        provider: "$numbers.provider",
        subscriptionId: "$numbers.subscriptionId",
        number: "$numbers.number",
        friendlyName: "$numbers.friendlyName",
        lastPaidForUsing: "$numbers.lastPaidForUsing",
        country: "$numbers.country",
        expires: "$numbers.expires",
        subscription: "$numbers.subscriptions",
      },
    },
  ]);

  return numbers;
}

async function getUserSettings(userId) {
  let response = await User.findById(userId, "settings");

  return response;
}

async function getUserInfo(userId) {
  return await User.findById(userId);
}

async function updateUsername(userId, newUsername) {
  try {
    return await User.updateOne(
      {
        _id: userId,
      },
      { $set: { username: newUsername, verified: true } }
    );
  } catch (error) {
    return { error: error.message };
  }
}

async function isUserExist(username) {
  return await User.find({ username });
}

async function getUserEmail(userId) {
  return await User.findById(userId, "username");
}

async function updateUserNotificationSettings(userId, updateObject) {
  let { sendPushSms, sendPushVoice } = updateObject;

  let response = await User.findByIdAndUpdate(userId, {
    $set: {
      "settings.pushNotifications.voice": sendPushVoice,
      "settings.pushNotifications.text": sendPushSms,
    },
  });

  return response;
}

async function getWhitelist(userId) {
  let response = await User.findById(userId, "settings.whitelist");

  return response;
}

async function getBlacklist(userId) {
  let response = await User.findById(userId, "settings.blacklist");

  return response;
}

async function addToWhitelist(userId, phoneNumber) {
  let response = await User.updateOne(
    {
      _id: userId,
    },
    {
      $addToSet: {
        "settings.whitelist": phoneNumber,
      },
    }
  );

  return response;
}

async function addToBlacklist(userId, phoneNumber) {
  let response = await User.updateOne(
    {
      _id: userId,
    },
    {
      $addToSet: {
        "settings.blacklist": phoneNumber,
      },
    }
  );

  return response;
}

async function removeFromWhitelist(userId, phoneNumber) {
  let response = await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        "settings.whitelist": phoneNumber,
      },
    }
  );

  return response;
}

async function removeFromBlacklist(userId, phoneNumber) {
  let response = await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        "settings.blacklist": phoneNumber,
      },
    }
  );

  return response;
}

function getCountryNameByCode(countryCode) {
  const countriesCodes = {
    CA: "Canada",
    GB: "United Kingdom",
    US: "United States",
  };

  return countriesCodes[countryCode];
}

function getIsoCodeByCountryName(country) {
  const codes = {
    Canada: "CA",
    "United Kingdom": "GB",
    "United States": "US",
  };

  return codes[country];
}

async function addNewQuota(userId, number, type) {
  const increment = type === "Basic Monthly" ? 10 : 120;
  try {
    return await Numbers.findOneAndUpdate(
      {
        _id: userId,
        "numbers.number": number,
      },
      {
        $inc: {
          "numbers.$[num].subscriptions.$[sub].quota.total_sentSMS": increment,
          "numbers.$[num].subscriptions.$[sub].quota.total_smsForwarding":
            increment,
          "numbers.$[num].subscriptions.$[sub].quota.total_voiceMailForwarding":
            increment,
          "numbers.$[num].subscriptions.$[sub].quota.total_callForwarding":
            increment,
          "numbers.$[num].subscriptions.$[sub].quota.sentSMS": increment,
          "numbers.$[num].subscriptions.$[sub].quota.smsForwarding": increment,
          "numbers.$[num].subscriptions.$[sub].quota.voiceMailForwarding":
            increment,
          "numbers.$[num].subscriptions.$[sub].quota.callForwarding": increment,
        },
      },
      {
        arrayFilters: [{ "num.number": number }, { "sub.type": type }],
        new: true,
      }
    );
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function getQuota(userId, number, objectKey, type) {
  return await Numbers.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $unwind: "$numbers",
    },
    {
      $match: {
        "numbers.number": number,
      },
    },
    {
      $unwind: "$numbers.subscriptions",
    },
    {
      $match: {
        "numbers.subscriptions.type": type,
      },
    },
    {
      $project: { quota: "$numbers.subscriptions.quota" },
    },
    {
      $match: {
        // "quota.sentSMS": { $gte: -1 },
        $expr: { $gte: [`quota.${objectKey}`, -1] },
      },
    },
    {
      $project: {
        sms: { $ifNull: [`$quota.${objectKey}`, 0] },
      },
    },
  ]);
}

async function updateQuota(userId, number, objectKey, type) {
  const existingDocument = await Numbers.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $unwind: "$numbers",
    },
    {
      $match: {
        "numbers.number": number,
      },
    },
    {
      $unwind: "$numbers.subscriptions",
    },
    {
      $match: {
        "numbers.subscriptions.type": type,
      },
    },
    {
      $project: { quota: "$numbers.subscriptions.quota" },
    },
    {
      $match: {
        // "quota.sentSMS": { $gte: -1 },
        $expr: { $gte: [`quota.${objectKey}`, -1] },
      },
    },
    {
      $project: {
        sms: { $ifNull: [`$quota.${objectKey}`, 0] },
      },
    },
  ]);
  if (existingDocument[0].sms > 0) {
    const updatedDocument = await Numbers.findOneAndUpdate(
      {
        _id: userId,
        "numbers.number": number,
        [`numbers.subscriptions.quota.${objectKey}`]: { $gt: 0 },
      },
      {
        $inc: {
          [`numbers.$[num].subscriptions.$[sub].quota.${objectKey}`]: -1,
        },
      },
      {
        arrayFilters: [{ "num.number": number }, { "sub.type": type }],
        new: true,
      }
    );
    return updatedDocument;
  } else {
    console.log("Cannot update sentSMS. The value is zero or less than zero.");
    return null;
  }
}
module.exports = {
  getMessages,
  getCalls,
  getUserBalanceById,
  getRecentReceivedMessagesById,
  getActiveNumbers,
  getNumbers,
  getReleasedNumbersByCountry,
  getReleasedNumber,
  deleteNumber,
  deleteReleasedNumber,
  getContactsPerNumberById,
  getCallsPerNumberById,
  hasNumber,
  getNewMessagesForAGivenContact,
  numberExistsInNumbersCollection,
  updateNumberSetting,
  updateNumberSettings,
  disableNumber,
  enableNumber,
  orderIdAlreadyExists,
  getAllNewMessages,
  appendNumber,
  appendReservedNumber,
  getReservedNumber,
  appendReleasedNumber,
  appendTransaction,
  saveTransactionSession,
  getTransactionSession,
  getTransactionSessionForSubscription,
  getActiveNumberSubscriptions,
  getNumber,
  getNumberWithoutUser,
  getNumberWithSubscriptionId,
  cancelNumberSubscription,
  getUserSettings,
  getUserInfo,
  getUserEmail,
  updateUserNotificationSettings,
  getWhitelist,
  getBlacklist,
  addToWhitelist,
  addToBlacklist,
  removeFromWhitelist,
  removeFromBlacklist,
  getCountryNameByCode,
  getQuota,
  updateQuota,
  updateUsername,
  isUserExist,
  addNewQuota,
  appendNotificationSubscription,
  deleteNotificationSubscription,
  getNotificationSubscriptions,
};
