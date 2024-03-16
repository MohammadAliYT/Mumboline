const { isEmpty, writeLogs } = require("../util/util");
const { constructEventObject } = require("../stripeFunctions");
const {
  appendTransaction,
  getTransactionSession,
  getTransactionSessionForSubscription,
  appendNumber,
  deleteNumber,
  appendReleasedNumber,
  addNewQuota,
  getNumberWithoutUser,
} = require("../db/dbOperations");
const {
  buyPhoneNumber,
  deletePhoneNumber,
  deleteAddress,
} = require("../twilioFunctions");
const moment = require("moment");
const express = require("express");
const router = express.Router();

router.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const event = await constructEventObject(
      req.headers["stripe-signature"],
      req.body
    );
    try {
      if (isEmpty(event)) {
        return res.status(400).send({
          message: "⚠️  Webhook signature verification failed.",
        });
      }
      writeLogs("Stripe Event", event, "voip");
      // checkout session
      if (
        event.type === "checkout.session.completed" &&
        event.data.object.payment_status === "paid"
      ) {
        const transaction = await getTransactionSession(event.data.object.id);
        if (transaction.error) {
          return res.status(500).json(transaction);
        }
        const subscriptionId = event.data.object.subscription;
        const buyNumRes = await buyNumberAndSaveToDb(
          transaction,
          subscriptionId
        );
        if (buyNumRes.error) return res.status(500).json(buyNumRes);
      }

      if (
        event.type === "invoice.payment_succeeded" &&
        event.data.object.status === "paid"
      ) {
        const number = event.data.object.lines.data[0]?.metadata?.number;
        const [numberData] = await getNumberWithoutUser(number);
        if (numberData && moment().isAfter(numberData.firstPurchased)) {
          const result = await addNewQuota(
            numberData._id,
            numberData.numbers.number,
            numberData.numbers.subscriptions[0].type
          );
          console.log("new quota added ==>", result);
        }
      }

      // subscription delete
      if (
        event.type === "customer.subscription.deleted" &&
        event.data.object.status === "canceled"
      ) {
        const transaction = await getTransactionSessionForSubscription(
          event.data.object.id
        );
        if (transaction.error) return res.status(500).json(transaction);

        const cancelTransactionRes = await cancelSubscriptionAndSaveToDb(
          transaction
        );
        if (cancelTransactionRes.error)
          return res.status(500).json(cancelTransactionRes);
      }

      // if (event.type === "invoice.payment_failed") {
      //   console.log("invoice.payment_failed entereed");
      //   const transaction = await getTransactionSession(event.data.object.id);
      //   if (transaction.error) return res.status(500).json(transaction);
      //   console.log("transaction", transaction);
      //   const deleteAddressRes = await deleteAddress(transaction);
      //   if (deleteAddressRes.error)
      //     return res.status(500).json(deleteAddressRes);

      //   console.log("deleteaddress", deleteAddressRes);
      // }
      res.json({ received: true });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

async function buyNumberAndSaveToDb(transaction, subscriptionId) {
  let phonePurchaseResponse;
  const { number, addressSid, isoCountry, interval, orderId, amount } =
    transaction?.transactionEvents[0];

  if (isoCountry === "GB") {
    phonePurchaseResponse = await buyPhoneNumber(number, addressSid);
  } else {
    phonePurchaseResponse = await buyPhoneNumber(number);
  }
  console.log("phonePurchaseResponse ==>", phonePurchaseResponse);
  if (phonePurchaseResponse?.error) return phonePurchaseResponse;

  await appendTransaction(
    transaction._id,
    orderId,
    "STRIPE_PAYMENT_SUCCESS",
    amount,
    1,
    number,
    addressSid,
    subscriptionId,
    phonePurchaseResponse.sid
  );

  await appendNumber(
    transaction._id,
    phonePurchaseResponse.phoneNumber,
    phonePurchaseResponse.friendlyName,
    isoCountry,
    phonePurchaseResponse.sid,
    phonePurchaseResponse.addressRequirements,
    addressSid,
    subscriptionId,
    interval
  );

  return { success: true };
}

async function cancelSubscriptionAndSaveToDb(transaction) {
  const { phoneNumberSid } = transaction?.transactionEvents[0];

  // --> release from twilio
  const deletePhoneNumberRes = await deletePhoneNumber(phoneNumberSid);
  console.log("deleteTwilioNumberRes ==>", deletePhoneNumberRes);
  if (deletePhoneNumberRes?.error) return deletePhoneNumberRes;

  // --> delete from db
  const deleteNumberRes = await deleteNumber(transaction._id, phoneNumberSid);
  if (deleteNumberRes?.error) return deleteNumberRes;

  const numberData = deleteNumberRes?.numbers?.find(
    ({ sid }) => sid === phoneNumberSid
  );

  if (numberData) {
    const appendReleasedNumberRes = await appendReleasedNumber(
      transaction._id,
      numberData
    );
    if (appendReleasedNumberRes?.error) return appendReleasedNumberRes;
  }

  return { success: true };
}

module.exports = router;
