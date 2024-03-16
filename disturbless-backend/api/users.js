const {
    getUserInfo,
    updateUsername,
    isUserExist,
    appendNotificationSubscription,
  } = require("../db/dbOperations"),
  express = require("express"),
  router = express.Router();

router.get("/user/", async (req, res) => {
  let data = await getUserInfo(req.user._id);
  res.json(data);
});

router.post("/user/update", async (req, res) => {
  const { email, newEmail } = req.body;
  let result;
  if (newEmail) {
    const user = await isUserExist(newEmail);
    if (user.length !== 0) {
      return res.json({
        status: false,
        message: "An account with this email already exist",
      });
    }
    result = await updateUsername(req.user._id, newEmail);
  } else {
    result = await updateUsername(req.user._id, email);
  }
  if (result?.error) {
    return res
      .status(404)
      .json({ status: false, message: "Update username failed" });
  }
  res.json({ status: true, message: "Username is changed successfully" });
});

router.post("/subscribe", async (req, res) => {
  await appendNotificationSubscription(req.user._id, req.body);
  res.status(201).json({ success: true });
});

module.exports = router;
