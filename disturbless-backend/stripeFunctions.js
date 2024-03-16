let { STRIPE_SECRET, STRIPE_ENDPOINT_SECRET } = process.env;
var stripe = require("stripe")(STRIPE_SECRET);

async function constructEventObject(sig, reqBody) {
  try {
    return await stripe.webhooks.constructEvent(
      reqBody,
      sig,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (err) {
    console.log(
      `⚠️  Webhook signature verification failed.constructEventObject`
    );
    return {};
  }
}

async function cancelSubscription(id) {
  try {
    return await stripe.subscriptions.update(id, {
      cancel_at_period_end: true,
      // cancel_at: parseInt(Date.now() / 1000) + 30, // cancel after 30 seconds
    });
    // cancel immediately
    // return await stripe.subscriptions.cancel(id);
  } catch (error) {
    return { error: error.message };
  }
}

async function reactivateSubscription(id) {
  try {
    return await stripe.subscriptions.update(id, {
      cancel_at_period_end: false,
      // cancel_at: parseInt(Date.now() / 1000) + 30, // cancel after 30 seconds
    });
    // cancel immediately
    // return await stripe.subscriptions.cancel(id);
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = {
  stripe,
  constructEventObject,
  cancelSubscription,
  reactivateSubscription,
};
