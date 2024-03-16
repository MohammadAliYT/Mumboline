const {
  getNumbers,
  getContactsPerNumberById,
  getNewMessagesForAGivenContact,
  hasNumber,
  getMessages,
  getAllNewMessages,
  getNumber,
  getQuota,
  updateQuota,
} = require("../db/dbOperations");

const { sendSms } = require("../twilioFunctions");

const { appendMessage } = require("../db/messagingCollectionUtils");

var express = require("express"),
  router = express.Router();

router.get("/messaging/", (req, res) => {
  const activeNumbers = getNumbers(req.user._id);
  const contactsPerNumber = getContactsPerNumberById(req.user._id);
  Promise.all([activeNumbers, contactsPerNumber]).then((values) => {
    let numbers = [];
    if (values[0].length)
      numbers = values[0][0]?.numbers?.map((number) => {
        return {
          number: number.number,
          remainingSmsQuota: number.subscriptions[0].quota.sentSMS,
        };
      });
    res.json({
      numbers,
      contactsPerNumber: values[1],
    });
  });
});

// get all new messages for a userId after a certain time
router.get("/messaging/pull/new/:unixTime", (req, res) => {
  let newMessages = getAllNewMessages(req.user._id, req.params.unixTime);

  Promise.all([newMessages])
    .then((values) => {
      let contactUpdates = values[0].filter(
        (contactUpdate) => contactUpdate.newMessages.length > 0
      );
      res.json({
        newMessages: contactUpdates,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "An unknown error occurred",
      });
    });
});

// get messages for a userId, of a disturblessNumber and forgeinNumber pair after a certain time
router.get(
  "/messaging/pull/:ourNumber/:foreignNumber/:unixTime/",
  async (req, res) => {
    let contactsPerNumber = getContactsPerNumberById(req.user._id);
    let newMessages = getNewMessagesForAGivenContact(
      req.user._id,
      req.params.ourNumber,
      req.params.foreignNumber,
      req.params.unixTime
    );

    Promise.all([contactsPerNumber, newMessages])
      .then((values) =>
        res.json({
          currentConversationNewMessages: values[1],
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "An unknown error occurred",
        });
      });
  }
);

// get messages for a userId, of a disturblessNumber and forgeinNumber pair
// as per the lower and upper bounds: number of messages to skip
router.get(
  "/messaging/:ourNumber/:foreignNumber/:lowerBound?/:upperBound?/",
  async (req, res) => {
    // Really has the number?
    let hasNumberBoolean = await hasNumber(req.user, req.params.ourNumber);
    // if Yes return messages as per the lowerBound and upperBound parameters
    if (hasNumberBoolean) {
      let messages = await getMessages(
        req.user,
        req.params.ourNumber,
        req.params.foreignNumber,
        req.params.lowerBound,
        req.params.upperBound
      );

      res.status(200).json(messages);
    } else {
      res.status(401).json({
        error:
          "The user does not own this number or another issue has occured.",
      });
    }
  }
);

// Change this to use the new messaging model
router.post("/messaging/sendsms/", async (req, res) => {
  const { From, To, Body } = req.body;

  const [numbersData] = await getNumber(req.user._id, From);
  const type = numbersData.numbers.subscriptions.find(
    (subscription) => subscription.active
  ).type;

  const [quota] = await getQuota(req.user._id, From, "sentSMS", type);
  if (quota?.sms <= 0) {
    return res.status(400).json({
      error: "Message cannot be sent. The number has reached to maximum quota.",
    });
  }
  // Perfect scenario: Number exists, balance is sufficient, SMS is sent.
  if (numbersData) {
    let smsData = await sendSms(From, To, Body);
    if (smsData.error) {
      return res.status(400).json({
        message: "SMS cannot be sent" + smsData.error,
      });
    }

    await updateQuota(req.user._id, From, "sentSMS", type);
    await appendMessage(req.user._id, From, To, req.body);

    res.status(200).json({
      message: "SMS sent successfully",
    });
  } else {
    res.status(400).json({
      error: "The user does not own this number or another issue has occured.",
    });
  }
});

module.exports = router;
