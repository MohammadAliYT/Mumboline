const { cancelPaypalSubscriptionAndSaveToDb } = require("../paypal/paypal");
const { getNumberWithSubscriptionId } = require("../db/dbOperations");

const express = require("express");
const router = express.Router();
router.post("/webhook/paypal", async (req, res) => {
  try {
    const { event_type, resource } = req.body;
    switch (event_type) {
      case "BILLING.SUBSCRIPTION.CANCELLED":
        const { id, status } = resource;
        console.log(event_type + ".STARTED." + id);
        const [numberData] = await getNumberWithSubscriptionId(id);
        if (status === "CANCELLED" && numberData) {
          const result = await cancelPaypalSubscriptionAndSaveToDb(
            numberData._id,
            id,
            numberData.numbers.sid
          );
          if (result?.error) return res.status(400).json(result);
        } else {
          console.log("No number found with this subscription id ", id);
        }
    }
    res.json({ received: true });
  } catch (error) {
    console.error(error.message);
    res.status(400).json(error);
  }
});

module.exports = router;
