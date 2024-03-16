require("dotenv").config();
const axios = require("axios");
var qs = require("qs");
const { deleteNumber, appendReleasedNumber } = require("../db/dbOperations");
const { deletePhoneNumber } = require("../twilioFunctions");

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com/";
let accessToken = "";

async function init() {
  let tokenReqResponse = await requestToken();

  setInterval(
    requestToken,
    tokenReqResponse != null ? tokenReqResponse.data.expires_in * 1000 : 360000
  );

  return tokenReqResponse;
}

const requestToken = async () => {
  var data = qs.stringify({
    grant_type: "client_credentials",
  });

  var config = {
    method: "post",
    url: `${PAYPAL_BASE_URL}v1/oauth2/token`,
    headers: {
      Authorization: `Basic ${Buffer.from(
        PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  let response = await axios(config);

  if (response.status == 200) {
    accessToken = response.data.access_token;
    console.info("Got PayPal Access token");

    return response;
  }

  console.error("Couldn't get PayPal access token!");
  return null;
};

async function getOrderData(orderId) {
  let response = await axios.get(
    `${PAYPAL_BASE_URL}v1/checkout/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
}

async function getPaypalSubscription(id) {
  try {
    const response = await axios.get(
      `${PAYPAL_BASE_URL}v1/billing/subscriptions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function suspendPaypalSubscription(id) {
  try {
    const response = await axios.post(
      `${PAYPAL_BASE_URL}v1/billing/subscriptions/${id}/suspend`,
      { reason: "Reactivating on customer request" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function reactivatePaypalSubscription(id) {
  try {
    const response = await axios.post(
      `${PAYPAL_BASE_URL}v1/billing/subscriptions/${id}/activate`,
      { reason: "Reactivating on customer request" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function cancelPaypalSubscriptionAndSaveToDb(
  userId,
  subscriptionId,
  phoneNumberSid
) {
  try {
    try {
      await axios.post(
        `${PAYPAL_BASE_URL}v1/billing/subscriptions/${subscriptionId}/cancel`,
        { reason: "Cancelling on customer request" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("(success) Subscription is cancelled from paypal");
    } catch (error) {
      if (error.status === 422) {
        console.error("(failed) Subscription already cancelled on paypal.");
      }
    }

    // --> release from twilio
    const deletePhoneNumberRes = await deletePhoneNumber(phoneNumberSid);
    console.log("deleteTwilioNumberRes ==>", deletePhoneNumberRes);
    if (deletePhoneNumberRes?.error) {
      console.log(
        "(failed) Number cannot be deleted from twilio",
        deletePhoneNumberRes.error
      );
      return deletePhoneNumberRes;
    }
    console.log("(success) Number is deleted from twilio");

    // --> delete from db
    const deleteNumberRes = await deleteNumber(userId, phoneNumberSid);
    if (deleteNumberRes?.error) {
      console.log(
        "(failed) Number cannot be deleted from db",
        deleteNumberRes.error
      );
      return deleteNumberRes;
    }
    console.log("(success) Number is deleted from db");

    const numberData = deleteNumberRes?.numbers?.find(
      ({ sid }) => sid === phoneNumberSid
    );

    if (numberData) {
      const appendReleasedNumberRes = await appendReleasedNumber(
        userId,
        numberData
      );
      if (appendReleasedNumberRes?.error) return appendReleasedNumberRes;
    }
    return { success: true };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = {
  init,
  getOrderData,
  getPaypalSubscription,
  suspendPaypalSubscription,
  reactivatePaypalSubscription,
  cancelPaypalSubscriptionAndSaveToDb,
};
