const {
  getNumberWithoutUser,
  updateQuota,
  getUserSettings,
} = require("../db/dbOperations");
const { sendMessageNotificationEmail } = require("../emailing/email");
const { sendSms } = require("../twilioFunctions");
const { appendMessage } = require("../db/messagingCollectionUtils");
const { appendCall } = require("../db/callsCollectionUtils");

const twilio = require("twilio");
const express = require("express");
const { sendPushNotification } = require("../webworker");
const router = express.Router();

router.post("/webhook/sms", async (req, res) => {
  const { From, To, Body, TranscriptionText } = req.body;
  const [numbers] = await getNumberWithoutUser(To);
  if (!numbers) return res.status(400).send("User does not own this number");

  await appendMessage(numbers._id, To, From, req.body);

  const {
    settings: {
      pushNotifications: { text },
    },
  } = await getUserSettings(numbers._id);
  if (text) {
    sendPushNotification(numbers._id, {
      title: `A message from ${From}`,
      body: Body || TranscriptionText || "",
    });
  }

  const type = numbers.numbers.subscriptions.find(
    (subscription) => subscription.active
  ).type;
  const { toEmail, emailAddress, toPrimaryPhone, primaryPhoneNumber } =
    numbers?.numbers?.settings?.forwarding;
  const userNumber = numbers?.numbers?.number;

  let response = "";
  if (toPrimaryPhone) {
    if (TranscriptionText) {
      const forwardBody = `You have recieved a message from ${From} \n ${
        TranscriptionText || ""
      }`;
      await sendSms(userNumber, primaryPhoneNumber, forwardBody);
      await updateQuota(numbers._id, To, "smsForwarding", type);
      console.log(
        "Voicemail is successfully forwarded to primary number " +
          primaryPhoneNumber
      );

      await appendCall(numbers._id, To, From, req.body);
      await updateQuota(numbers._id, To, "voiceMailForwarding", type);
    } else {
      const forwardBody = `You recieved a message from ${From} \n ${
        Body || ""
      }`;
      await sendSms(userNumber, primaryPhoneNumber, forwardBody);
      await updateQuota(numbers._id, To, "smsForwarding", type);
      console.log(
        "SMS is successfully forwarded to primary number" + primaryPhoneNumber
      );
    }
  } else {
    response += "SMS forwarding is off. ";
  }

  if (toEmail) {
    try {
      if (TranscriptionText) {
        await sendMessageNotificationEmail(
          emailAddress,
          userNumber,
          TranscriptionText || ""
        );
        await updateQuota(numbers._id, To, "voiceMailForwarding", type);
        console.log(
          "Voicemail is successfully forwarded to primary email " + emailAddress
        );
      } else {
        await sendMessageNotificationEmail(
          emailAddress,
          userNumber,
          Body || ""
        );
        console.log(
          "SMS is successfully forwarded to primary email " + emailAddress
        );
      }
    } catch (error) {
      console.log("Cannot send email notification " + error.message);
    }
  } else {
    response += "Email forwarding is off. ";
  }

  console.log("response from sms hook ==>", response);
  res.send(response ? response : "SMS sent successfully");
});

router.post("/webhook/voice", async (req, res) => {
  const { To, From, CallStatus } = req.body;
  const [numbers] = await getNumberWithoutUser(To);
  if (!numbers) return res.status(400).send("User does not own this number");

  const {
    settings: {
      pushNotifications: { voice },
    },
  } = await getUserSettings(numbers._id);
  if (voice) {
    sendPushNotification(numbers._id, {
      title: `Incoming Call from ${From}`,
      body: CallStatus,
    });
  }

  const type = numbers.numbers.subscriptions.find(
    (subscription) => subscription.active
  ).type;
  const { toPrimaryPhone, primaryPhoneNumber, verifyPrimaryPhone } =
    numbers?.numbers?.settings?.forwarding;

  let response = "";
  if (toPrimaryPhone) {
    switch (CallStatus) {
      case "ringing":
        const twiml = new twilio.twiml.VoiceResponse();
        twiml.say("Your call will be redirected now");
        twiml.dial(
          { action: "/webhook/voicemail", timeout: 20 },
          primaryPhoneNumber
        );
        res.type("text/xml");
        return res.send(twiml.toString());

      case "completed":
        await appendCall(numbers._id, To, From, req.body);
        await updateQuota(numbers._id, To, "callForwarding", type);
        return res.send("success");
    }
  } else {
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say("The user's number forwarding is turned off");
    response += "call forwarding is off. ";
    res.type("text/xml");
    return res.send(twiml.toString());
  }
  console.log("response from voice hook ==>", response);
  res.send(response ? response : "Call forwarded successfully");
});

router.post("/webhook/voicemail", async (req, res) => {
  const { To, DialCallStatus } = req.body;
  const [numbers] = await getNumberWithoutUser(To);
  if (!numbers) return res.status(400).send("User does not own this number");
  const { voiceMailGreeting } = numbers?.numbers?.settings?.forwarding;

  const twiml = new twilio.twiml.VoiceResponse();

  switch (DialCallStatus) {
    case "no-answer":
      twiml.say(`${voiceMailGreeting}`);
      twiml.record({
        playBeep: true,
        maxLength: 60,
        transcribe: true,
        transcribeCallback: "/webhook/sms",
        trim: "trim-silence",
      });
      twiml.hangup();
      break;

    case "busy":
      twiml.say(
        `Your Dialed number is busy at the moment, please record your message after the beep. `
      );
      twiml.record({
        playBeep: true,
        maxLength: 60,
        transcribe: true,
        transcribeCallback: "/webhook/sms",
        trim: "trim-silence",
      });
      twiml.hangup();
      break;

    case "failed":
      twiml.say(`Your Dialed number is unreachable. Please try again later`);
      twiml.hangup();
      break;
  }

  res.type("text/xml");
  return res.status(200).send(twiml.toString());
});

module.exports = router;
