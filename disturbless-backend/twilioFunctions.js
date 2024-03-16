require("dotenv").config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, DOMAIN_NAME } = process.env;
const BASE_URL = "https://api.twilio.com";
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function getAvailableLocalNumbersSlow() {
  let availableNumbersData = await client.availablePhoneNumbers("US").fetch();

  let numbersData = await client.request({
    method: "get",
    uri: BASE_URL + availableNumbersData.subresourceUris.local,
  });
}

// dangerous function, can fail for some countries
async function getTwilioNumbersByCountry(countryShortCode) {
  let availableNumbers = await client
    .availablePhoneNumbers(countryShortCode)
    .local.list({ smsEnabled: true, voiceEnabled: true });

  return availableNumbers;
}

async function getNumberPricingByCountry(countryShortCode) {
  let pricingData = await client.pricing.v1.phoneNumbers
    .countries(countryShortCode)
    .fetch();

  return pricingData;
}

async function getListOfCountries() {
  let data = await client.availablePhoneNumbers.list({ limit: 250 });

  return data;
}

async function getAvailableCountries() {
  // let data = await getListOfCountries();
  return [
    {
      country: "Canada",
      shortcode: "CA",
    },
    {
      country: "United Kingdom",
      shortcode: "GB",
    },
    {
      country: "United States",
      shortcode: "US",
    },
  ];
  // data.forEach(number => countries.push({ country: number.country, shortcode: number.countryCode }));
  // countries.sort((a, b) => {
  //   if (a.country < b.country) {
  //     return -1;
  //   }
  //   if (a.country > b.country) {
  //     return 1;
  //   }
  //   return 0;
  // });
}

async function getSmsPricingByCountry(countryShortCode) {
  let pricingData = await client.pricing.v1.messaging
    .countries(countryShortCode)
    .fetch();

  return pricingData;
}

async function getVoicePricingByNumber(number) {
  let pricingData = await client.pricing.voice.numbers(number).fetch();

  return pricingData;
}

async function buyPhoneNumber(number, addressSid) {
  let responseData;
  try {
    if (addressSid) {
      responseData = await client.incomingPhoneNumbers.create({
        addressSid: addressSid,
        phoneNumber: number,
        smsUrl: `${DOMAIN_NAME}/webhook/sms`,
        voiceUrl: `${DOMAIN_NAME}/webhook/voice`,
        statusCallback: `${DOMAIN_NAME}/webhook/voice`,
      });
    } else {
      responseData = await client.incomingPhoneNumbers.create({
        phoneNumber: number,
        smsUrl: `${DOMAIN_NAME}/webhook/sms`,
        voiceUrl: `${DOMAIN_NAME}/webhook/voice`,
        statusCallback: `${DOMAIN_NAME}/webhook/voice`,
      });
    }
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function makeAddress(
  customerName,
  street,
  city,
  region,
  postalCode,
  isoCountry
) {
  try {
    return await client.addresses.create({
      customerName,
      street,
      city,
      region,
      postalCode,
      isoCountry,
    });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function deleteAddress(addressSid) {
  try {
    return await client.addresses(addressSid).remove();
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function updateAddress(
  addressSid,
  customerName,
  street,
  city,
  region,
  postalCode
) {
  try {
    return await client.addresses(addressSid).update({
      customerName,
      street,
      city,
      region,
      postalCode,
      autoCorrectAddress: true,
    });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function deletePhoneNumber(sid) {
  try {
    return await client.incomingPhoneNumbers(sid).remove();
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function sendSms(disturblessNumber, foreignNumber, text) {
  try {
    const responseData = await client.messages.create({
      body: text,
      from: disturblessNumber,
      to: foreignNumber,
    });

    return responseData;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function lookupPhoneNumberCountry(number) {
  let phoneNumberData = await client.lookups.v1
    .phoneNumbers("+15108675310")
    .fetch({ type: ["carrier"] });

  return phoneNumberData;
}

// Created from Twilio Console => Verify
const VERIFY_SERVICE_SID = "VAc5bbeb0d94d58b7016b97adb912022fa";
async function generateVerifyCode(verifyId, type) {
  try {
    return await client.verify
      .services(VERIFY_SERVICE_SID)
      .verifications.create({
        to: verifyId, // User's phone number to verify
        channel: type, // Verification channel (sms or call)
      });
  } catch (error) {
    return { error: error.message };
  }
}

async function verifyCode(to, code) {
  try {
    return await client.verify
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to, // User's phone number to verify
        code, // Verification code entered by the user
      });
  } catch (error) {
    return { error: error.message };
  }
}

// sendSms("+15124563549", "+21629453210", "This is Disturbless' First ever automated SMS!")
// getAvailableLocalNumbersByCountry("US").then(data => console.log(JSON.stringify(data)));

// getNumberPricingByCountry("CA").then(data => console.log(JSON.stringify(data)));

// How do I determine an SMS Price if it varies by carrier?
// getSmsPricingByCountry("US").then(data => console.log(JSON.stringify(data)));
// getVoicePricingByNumber("+15124563549").then(data => console.log(JSON.stringify(data)));
// getAvailableLocalNumbersByCountry("US").then(data => console.log(JSON.stringify(data)));

module.exports = {
  sendSms,
  client,
  getAvailableCountries,
  getTwilioNumbersByCountry,
  buyPhoneNumber,
  deletePhoneNumber,
  lookupPhoneNumberCountry,
  makeAddress,
  deleteAddress,
  updateAddress,
  generateVerifyCode,
  verifyCode,
};
