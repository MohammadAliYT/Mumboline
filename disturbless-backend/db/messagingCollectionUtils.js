const { sendMessageNotificationEmail } = require("../emailing/email");
const { Messages, Numbers, User } = require("./models");

async function appendMessage(
  userId,
  disturblessNumber,
  contactNumber,
  message
) {
  const { TranscriptionSid, TranscriptionText, RecordingUrl } = message;

  if (TranscriptionSid || TranscriptionText || RecordingUrl) {
    message.Body = "Voicemail";
    message.SmsStatus = "received";
  }

  try {
    return await Messages.updateOne(
      {
        userId,
        disturblessNumber,
        contactNumber,
      },
      {
        $push: {
          messages: {
            ...message,
            when: new Date(),
          },
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

async function saveNewMessageAndAlertIfPossible(To, From, Body) {
  let numbersResponse = await Numbers.findOne(
    {
      "numbers.number": To,
    },
    {
      _id: 1,
    }
  );

  if (numbersResponse._id) {
    // find user, send email (user.username)
    let user = await User.findById(numbersResponse._id);
    if (user.settings.pushNotifications.text) {
      // send email
      sendMessageNotificationEmail(user.username, {
        SENDER_NUMBER: From,
        DISTURBLESS_NUMBER: To,
        MESSAGE: Body,
      });
    }
    appendMessage(numbersResponse._id, To, From, Body, new Date(), "in", "SMS");
  } else {
    console.log("No numbers found for this number:", To);
  }
}

module.exports = {
  appendMessage,
  saveNewMessageAndAlertIfPossible,
};
