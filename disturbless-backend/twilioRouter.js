const { saveNewMessageAndAlertIfPossible } = require("./db/messagingCollectionUtils");

var express = require("express"),
  router = express.Router(),
  client = require("twilio");

const { TWILIO_AUTH_TOKEN, NODE_ENV } = process.env;

// router.post("/twilio/devmessaging/", async function (req, res) {
//   let { Body, From, To } = req.body;
//   saveSms(From, To, Body);

//   res.status(200).end();
// });

router.post("/twilio/messaging/", function (req, res) {
  let { Body, From, To } = req.body;
  console.log("Got SMS From Twilio!");

  const protocol = NODE_ENV == 'development' ? "http://" : "https://";
  const url = protocol + req.headers.host + "/twilio/messaging";
  let validRequest = client.validateRequest(
    TWILIO_AUTH_TOKEN,
    req.headers["x-twilio-signature"],
    url,
    req.body
  );

  if (validRequest) {
    // Do any of our disturbless numbers match the destination number?
    saveNewMessageAndAlertIfPossible(To, From, Body);
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

// TODO: Handle saving voice messages, relaying them to frontend
router.post("/twilio/voice/", function (req, res) {
  const protocol = NODE_ENV == 'development' ? "http://" : "https://";
  const url = protocol + req.headers.host + "/twilio/voice";
  let validRequest = client.validateRequest(
    TWILIO_AUTH_TOKEN,
    req.headers["x-twilio-signature"],
    url,
    req.body
  );

  if (validRequest) {
    // Do something with request
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

module.exports = router;