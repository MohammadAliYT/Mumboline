const {
  getUserBalanceById,
  getRecentReceivedMessagesById,
} = require("../db/dbOperations");

var express = require("express"),
  router = express.Router();

router.get("/home/", (req, res) => {
  // User balance in $
  let balanceData = getUserBalanceById(req.user._id);
  // Activity: sent messages, received messages, email notifications...
  // let activityData = await getUserActivityById(req.user._id);
  // // Brief history of the recently sent and received messages
  let userReceivedMessages = getRecentReceivedMessagesById(
    req.user._id,
    "received"
  );
  let userSentMessages = getRecentReceivedMessagesById(req.user._id, "sent");

  Promise.all([balanceData, userReceivedMessages, userSentMessages]).then(
    (values) => {
      return res.json({
        balanceData: values[0],
        userRecentMessages: {
          userReceivedMessages: values[1],
          userSentMessages: values[2],
        },
      });
    }
  );
});

module.exports = router;
