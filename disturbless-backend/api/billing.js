var express = require("express"),
  router = express.Router(),
  { stripe } = require("../stripeFunctions");

const {
  getActiveNumberSubscriptions,
  getNumber,
  cancelNumberSubscription,
} = require("../db/dbOperations");

router.get("/billing/", async (req, res) => {
  let returnData = await getActiveNumberSubscriptions(req.user._id);

  res.json({
    activeNumberSubscriptions: returnData,
  });
});

// TODO: Cancel subscription
router.get("/billing/cancel/:number", async (req, res) => {
  let { number } = req.params;
  let numberData = getNumber(req.user._id, number);

  if (numberData.autoRenew == false) {
    res.json({
      message: "Subscription already canceled or it was a one-time payment.",
    });
  } else {
    await cancelNumberSubscription(req.user._id, number);

    res.send("Subscription cancelled successfully");
  }
});

async function cancelSubscription(userId, number) {
  let paymentProcessor = number.lastPaidForUsing;

  if (paymentProcessor === "PAYPAL_SUBSCRIPTION") {
  } else if (paymentProcessor === "STRIPE_SUBSCRIPTION") {
    let response = await stripe.subscriptions.del(number.subscriptionId);
  }

  cancelNumberSubscription(userId, number);
}

module.exports = router;
