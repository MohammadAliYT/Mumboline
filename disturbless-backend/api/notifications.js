var express = require("express"),
  router = express.Router(),
  {
    getUserSettings,
    updateUserNotificationSettings,
    getWhitelist,
    getBlacklist,
    addToWhitelist,
    addToBlacklist,
    removeFromWhitelist,
    removeFromBlacklist,
  } = require("../db/dbOperations");

router.get("/notifications/", async (req, res) => {
  let userSettings = await getUserSettings(req.user._id);

  res.json({
    userSettings,
  });
});

router.post("/notifications/update", (req, res) => {
  let updateObject = req.body;

  if (isCorrectUpdateObject(updateObject)) {
    updateUserNotificationSettings(req.user._id, updateObject);
    res.status(200).json({
      message: "Successfully updated user settings",
    });
  } else {
    res.status(400).json({
      error: "Incorrect update object",
    });
  }
});

router.get("/notifications/whitelist/", async (req, res) => {
  let response = await getWhitelist(req.user._id);
  res.json(response);
});

router.get("/notifications/blacklist/", async (req, res) => {
  let response = await getBlacklist(req.user._id);
  res.json(response);
});

router.get("/notifications/whitelist/add/:number", async (req, res) => {
  let { number } = req.params;

  if (number) {
    let response = await addToWhitelist(req.user._id, number);

    res.json(response);
  } else {
    res.status(500).json({
      error: "Number is not provided or another error has occured.",
    })
  }
});

router.get("/notifications/blacklist/add/:number", async (req, res) => {
  let { number } = req.params;

  if (number) {
    let response = await addToBlacklist(req.user._id, number);

    res.json(response);
  } else {
    res.status(500).json({
      error: "Number is not provided or another error has occured.",
    })
  }
});

router.get("/notifications/whitelist/remove/:number", async (req, res) => {
  let { number } = req.params;

  if (number) {
    let response = await removeFromWhitelist(req.user._id, number);

    res.json(response);
  } else {
    res.status(500).json({
      error: "Number is not provided or another error has occured.",
    })
  }
});

router.get("/notifications/blacklist/remove/:number", async (req, res) => {
  let { number } = req.params;

  if (number) {
    let response = await removeFromBlacklist(req.user._id, number);

    res.json(response);
  } else {
    res.status(500).json({
      error: "Number is not provided or another error has occured.",
    })
  }
});

function isCorrectUpdateObject(updateObject) {
  return (
    Object.keys(updateObject).length == 2 &&
    updateObject.hasOwnProperty("sendPushSms") &&
    updateObject.hasOwnProperty("sendPushVoice") &&
    typeof updateObject.sendPushSms == "boolean" &&
    typeof updateObject.sendPushVoice == "boolean"
  );
}

module.exports = router;
