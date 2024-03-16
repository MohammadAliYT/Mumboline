const { VerifiedIds } = require("./models");

async function getVerifiedIDs(id) {
  try {
    return await VerifiedIds.find({ _id: id });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function appendVerifiedId(userId, newVerifyId, friendlyName, channel) {
  let appendObj;
  if (channel === "email") {
    appendObj = {
      $push: {
        emails: [
          {
            email: newVerifyId,
            friendlyName,
            verified: true,
            when: new Date(),
          },
        ],
      },
    };
  } else {
    appendObj = {
      $push: {
        numbers: [
          {
            number: newVerifyId,
            friendlyName,
            verified: true,
            when: new Date(),
          },
        ],
      },
    };
  }
  try {
    return await VerifiedIds.updateOne(
      {
        _id: userId,
      },
      appendObj,
      {
        upsert: true,
        timestamps: true,
      }
    );
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}
async function removeVerifiedId(userId, newVerifyId, channel) {
  let appendObj;
  if (channel === "email") {
    appendObj = {
      $pull: {
        emails: { email: newVerifyId },
      },
    };
  } else {
    appendObj = {
      $pull: {
        numbers: { number: newVerifyId },
      },
    };
  }
  try {
    return await VerifiedIds.updateOne(
      {
        _id: userId,
      },
      appendObj,
      {
        upsert: true,
        timestamps: true,
      }
    );
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function editFriendlyName(userId, channel, identifier, friendlyName) {
  let appendObj;

  if (channel === "email") {
    appendObj = {
      $set: {
        "emails.$[elem].friendlyName": friendlyName,
      },
    };
  } else {
    appendObj = {
      $set: {
        "numbers.$[elem].friendlyName": friendlyName,
      },
    };
  }

  try {
    return await VerifiedIds.findOneAndUpdate(
      {
        _id: userId,
      },
      appendObj,
      {
        new: true,
        arrayFilters: [{ [`elem.${channel}`]: identifier }],
      }
    );
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

module.exports = {
  getVerifiedIDs,
  appendVerifiedId,
  removeVerifiedId,
  editFriendlyName,
};
