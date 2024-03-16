const {
  getNumbers,
  numberExistsInNumbersCollection,
  updateNumberSetting,
  updateNumberSettings,
  orderIdAlreadyExists,
  saveTransactionSession,
  disableNumber,
  enableNumber,
  getNumber,
  getReservedNumber,
  appendReservedNumber,
  appendNumber,
  isUserExist,
} = require("../db/dbOperations");

const {
  appendVerifiedId,
  removeVerifiedId,
  editFriendlyName,
} = require("../db/verifiedIdsCollectionUtils");

const {
  cancelSubscription,
  reactivateSubscription,
} = require("../stripeFunctions");

const {
  suspendPaypalSubscription,
  reactivatePaypalSubscription,
} = require("../paypal/paypal");

const { makeAddress } = require("../twilioFunctions");

const { STRIPE_SECRET, APP_NAME } = process.env;
const stripe = require("stripe")(STRIPE_SECRET);
const { getOrderData } = require("../paypal/paypal");

var sem = require("semaphore")(1);
var orderIds = [];

var express = require("express"),
  router = express.Router(),
  {
    getAvailableCountries,
    getTwilioNumbersByCountry,
    lookupPhoneNumberCountry,
    buyPhoneNumber,
    deletePhoneNumber,
    generateVerifyCode,
    verifyCode,
  } = require("../twilioFunctions");

router.get("/numbers/reserve/:number/", async (req, res) => {
  const { number } = req.params;
  appendReservedNumber(number);
  res.send("number is reserved.");
});

router.post("/numbers/purchase/stripe/", async (req, res) => {
  let { number, subscription, addressSid } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        // price: STRIPE_PRODUCT_PRICE_ID,
        quantity: 1,
        price_data: {
          unit_amount: subscription.monthly ? 499 : 4999,
          recurring: {
            interval: subscription.monthly ? "month" : "year",
          },
          currency: "USD",
          product_data: {
            name: `Purchase number: ${number.phoneNumber}`,
            description: `Virtual number: ${number.phoneNumber}`,
          },
        },
      },
    ],
    subscription_data: {
      metadata: {
        email: req.user.username,
        number: number.phoneNumber,
      },
    },
    mode: "subscription",
    // customer: req.user.username,
    success_url: `${APP_NAME}/numbers/?success=true`,
    cancel_url: `${APP_NAME}/numbers/?canceled=true`,
  });

  appendReservedNumber(number.phoneNumber);
  saveTransactionSession(
    req.user._id,
    session.id,
    number.phoneNumber,
    number.isoCountry,
    "STRIPE_PAYMENT_ATTEMPT",
    subscription.monthly ? 499 : 4999,
    addressSid,
    subscription.monthly ? "month" : "year"
  );
  res.json({ redirection_url: session.url });
});

router.post("/numbers/purchase/paypal/", async (req, res) => {
  const { orderId, subscriptionId, number, isoCountry, amount, addressSid } =
    req.body;

  try {
    saveTransactionSession(
      req.user._id,
      orderId,
      number.phoneNumber,
      number.isoCountry,
      "PAYPAL_PAYMENT_SUCCESS",
      amount,
      addressSid,
      amount == 4.99 ? "month" : "year"
    );

    let phonePurchaseResponse;
    if (isoCountry === "GB") {
      phonePurchaseResponse = await buyPhoneNumber(number, addressSid);
    } else {
      phonePurchaseResponse = await buyPhoneNumber(number);
    }
    console.log("phonePurchaseResponse ==>", phonePurchaseResponse);
    if (phonePurchaseResponse?.error)
      return res.status(500).json(phonePurchaseResponse);

    await appendNumber(
      req.user._id,
      phonePurchaseResponse.phoneNumber,
      phonePurchaseResponse.friendlyName,
      isoCountry,
      phonePurchaseResponse.sid,
      phonePurchaseResponse.addressRequirements,
      addressSid,
      subscriptionId,
      amount == 4.99 ? "month" : "year"
    );

    res.json({ received: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/numbers/getavailablecountries/", async (req, res) => {
  let countries = await getAvailableCountries();
  res.json({ countries: countries });
});

router.get("/numbers/bycountry/:countryShortCode/", async (req, res) => {
  let { countryShortCode } = req.params;
  try {
    const twilioNumbers = await getTwilioNumbersByCountry(countryShortCode);
    const reservedNumbers = await getReservedNumber();

    const availableNumbers = twilioNumbers.filter(
      ({ phoneNumber }) => !reservedNumbers.includes(phoneNumber)
    );

    res.json({ availableNumbers });
  } catch (error) {
    res.status(404).json({
      error:
        "An error occured internally or the country short code doesn't exist." +
        error.message,
    });
  }
});

router.get("/numbers/", async (req, res) => {
  const [numbersData] = await getNumbers(req.user._id);
  res.json({ numbers: numbersData?.numbers || {} });
});

// route with api/numbers/:number/cancel/
router.get("/numbers/:number/cancel/", async (req, res) => {
  try {
    const { number } = req.params;
    const numbersData = await getNumber(req.user._id, number);
    if (numbersData.length > 0) {
      const isStripe = numbersData[0].numbers.subscriptionId.startsWith("sub");
      let cancelSubscriptionRes, next_billing_time;
      if (isStripe) {
        cancelSubscriptionRes = await cancelSubscription(
          numbersData[0].numbers.subscriptionId
        );
      } else {
        cancelSubscriptionRes = await suspendPaypalSubscription(
          numbersData[0].numbers.subscriptionId
        );
      }
      if (cancelSubscriptionRes?.error)
        return res.status(400).json(cancelSubscriptionRes);

      const disableNumRes = await disableNumber(req.user._id, number);
      if (disableNumRes?.error) return res.status(400).json(disableNumRes);

      return res.send("Number cancelled successfully");
    } else {
      return res
        .status(400)
        .json({ error: "Number not found for this account." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/numbers/:number/reactivate/", async (req, res) => {
  const { number } = req.params;
  const numbersData = await getNumber(req.user._id, number);
  if (numbersData.length > 0) {
    const isStripe = numbersData[0].numbers.subscriptionId.startsWith("sub");
    let reactivateRes;
    if (isStripe) {
      reactivateRes = await reactivateSubscription(
        numbersData[0].numbers.subscriptionId
      );
    } else {
      reactivateRes = await reactivatePaypalSubscription(
        numbersData[0].numbers.subscriptionId
      );
    }
    if (reactivateRes?.error) return res.status(400).json(reactivateRes);

    const enableNumRes = await enableNumber(req.user._id, number);
    console.log("enableNumRes ==>", enableNumRes);
    if (enableNumRes?.error) return res.status(400).json(enableNumRes);

    return res.send("Number reactivated successfully");
  } else {
    return res
      .status(400)
      .json({ error: "Number not found for this account." });
  }
});

router.post("/numbers/:number/settings/", (req, res) => {
  const { number } = req.params;
  if (numberExistsInNumbersCollection(req.user._id, number)) {
    updateNumberSettings(req, res, req.body, number);
  } else {
    res.json({
      error:
        "An Error has occured while updating the settings for the number" +
        number,
    });
  }
});

router.post("/numbers/verifynew/", async (req, res) => {
  const { number, email, update } = req.body;
  if (update) {
    const users = await isUserExist(email);
    if (users.length) {
      return res.status(400).json({
        status: false,
        message: "An account with this email already exist",
      });
    }
  }
  let verifyRes;
  if (number) {
    verifyRes = await generateVerifyCode(number, "sms");
  } else if (email) {
    verifyRes = await generateVerifyCode(email, "email");
  }
  console.log("verifyRes ==>", verifyRes);
  if (verifyRes?.error) return res.status(400).json(verifyRes);
  res.json({
    message: `A verification code has been sent to ${verifyRes.to}`,
    to: verifyRes.to,
    channel: verifyRes.channel,
  });
});

router.post("/numbers/verifycheck/", async (req, res) => {
  const { code, to, channel, friendlyName } = req.body;
  const verifyRes = await verifyCode(to, code);
  console.log("verifyCodeRes ==>", verifyRes);
  if (verifyRes?.error) return res.status(400).json(verifyRes);

  if (verifyRes.status === "approved") {
    const appendRes = await appendVerifiedId(
      req.user._id,
      to,
      friendlyName,
      channel
    );
    console.log("appendVerifiedIdREs ==>", appendRes);
  }
  res.json({
    status: verifyRes.status,
  });
});

router.post("/numbers/deleteVerifiedId/", async (req, res) => {
  const { number, email } = req.body;
  let deleteRes;
  if (number) {
    deleteRes = await removeVerifiedId(req.user._id, number, "number");
  } else if (email) {
    deleteRes = await removeVerifiedId(req.user._id, email, "email");
  }
  console.log("deleteRes ==>", deleteRes);
  if (deleteRes?.error) return res.status(400).json(deleteRes);
  res.json({
    message: `${number || email} deleted successfully`,
  });
});

router.post("/numbers/editFriendlyName/", async (req, res) => {
  const { number, email, friendlyName } = req.body;
  let updateRes;
  if (number) {
    updateRes = await editFriendlyName(
      req.user._id,
      "number",
      number,
      friendlyName
    );
  } else if (email) {
    updateRes = await editFriendlyName(
      req.user._id,
      "email",
      email,
      friendlyName
    );
  }
  console.log("updateRes ==>", updateRes);
  if (updateRes?.error) return res.status(400).json(updateRes);
  res.json({
    message: "Updated Successfully",
  });
});

router.post("/numbers/makeAddress/", async (req, res) => {
  // return res.json({
  //   message: `Address created successfully`,
  //   sid: "AD2446fce08a5fd0dea7a8748b62fca1ec",
  // });
  const { customerName, street, city, region, postalCode, isoCountry } =
    req.body;

  const makeAddressRes = await makeAddress(
    customerName,
    street,
    city,
    region,
    postalCode,
    isoCountry
  );
  if (makeAddressRes.error) return res.status(200).json(makeAddressRes);
  res.json({
    message: `Address created successfully`,
    sid: makeAddressRes.sid,
  });
});
async function handleOrder(req, orderId, res, number) {
  let orderExists = await orderIdAlreadyExists(req.user._id, orderId);

  if (orderExists) {
    res.status(400).json({
      error: "You have already made the payment or the orderId is invalid.",
    });
  } else {
    let { data: orderData } = await getOrderData(orderId);
    let orderAmount = orderData.purchase_units[0].amount.total;
    if (
      orderData.status === "COMPLETED" &&
      orderAmount == getNumberPricing(number)
    ) {
      let twilioNumberData = lookupPhoneNumberCountry(number);
      let purchaseData = buyPhoneNumber(number); // saveNewNumberDocument / appendToExistingNumberDocument still remain untested because twilio only allows for one number purchase for a trial account.
      Promise.all([twilioNumberData, purchaseData]).then(async (values) => {
        if (purchaseData.hasOwnProperty("origin")) {
          // very likely to be Twilio
          let firstPurchase =
            (await Numbers.findById(req.user._id).countDocuments()) === 0;
          if (firstPurchase) {
            await saveNewNumberDocument(
              req.user._id,
              purchaseData,
              values[0],
              values[1]
            );
          } else {
            appendToExistingNumberDocument(
              req.user._id,
              purchaseData,
              values[0],
              values[1]
            );
          }

          res.status(200).json({ success: "Number purchased" });
        }
      });
    }

    sem.take(() => {
      orderIds = orderIds.filter((id) => id !== orderId);
      sem.leave();
    });
  }
}

function getFullCountryNameByCountryCode(countryCode) {
  let country = coutriesData.find((country) => country.code === countryCode);

  return country.name;
}

function getNumberPricing(number) {
  return 4.99;
}

function validatePostedJsonForNumberPurchase(postedData) {
  return (
    postedData.hasOwnProperty("number") && postedData.hasOwnProperty("orderId")
  );
}

function generateUniqueKey() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 50;
  let key = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }

  return key;
}

module.exports = router;
