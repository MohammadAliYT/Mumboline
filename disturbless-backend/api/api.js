const homeRouter = require("./home");
const messagingRouter = require("./messaging");
const callsRouter = require("./calls");
const numbersRouter = require("./numbers");
const billingRouter = require("./billing");
const notificationsRouter = require("./notifications");
const verificationRouter = require("./verification");
const userRouter = require("./users");

const express = require("express");
const router = express.Router();

router.use(protectRoute);

router.get("/userdata/", (req, res) => {
  res.json(req.user.username);
});

router.use(homeRouter);
router.use(messagingRouter);
router.use(callsRouter);
router.use(numbersRouter);
router.use(billingRouter);
router.use(notificationsRouter);
router.use(verificationRouter);
router.use(userRouter);

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ error: "Not logged in" });
}

module.exports = router;
