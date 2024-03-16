require("dotenv").config();
const { Numbers, UserTransaction, Messages, User } = require("./db/models");
const { orderIdAlreadyExists } = require("./db/dbOperations");
// Import ObjectId from mongoose
const { ObjectId } = require("mongoose").Types;


function updateNumbers() {
  let newNumber = new Numbers({
    _id: "612f4e3b2a56460f1608c2eb",
    numbers: [
      {
        number: "+15124563549",
        provider: "TWILIO",
        costData: {
          inboundSmsPrice: 0.0075,
          outboundSmsPrice: 0.0075,
        },
        country: "United States",
        label: "Registrations",
        billingId: "savedCardIdHere",
        isActive: true,
        expires: "1632968640",
        firstPurchased: "1632191040",
        settings: {
          forwarding: {
            toEmail: false,
            toPrimaryPhone: false,
            voiceMailGreeting: "Hello, please leave a message!",
          },
        },
      },
      {
        number: "(555) 555-1235",
        provider: "Brini",
        costData: {
          inboundSmsPrice: 0.0075,
          outboundSmsPrice: 0.0075,
        },
        country: "Lipsum Country",
        label: "Registrations",
        billingId: "savedCardIdHere",
        isActive: true,
        expires: "1632968640",
        firstPurchased: "1632191040",
        settings: {
          forwarding: {
            toEmail: false,
            toPrimaryPhone: false,
            voiceMailGreeting: "Hello, please leave a message!",
          },
        },
      },
    ],
  });

  newNumber.save();
}

function insertTransaction() {
  let newTransaction = new UserTransaction({
    _id: "612f4e3b2a56460f1608c2eb",
    currentBalance: 0,
    transactions: [],
  });

  newTransaction.save();
}

async function addUserTransaction() {
  let response = await UserTransaction.findOneAndUpdate(
    { _id: "612f4e3b2a56460f1608c2eb" },
    {
      $push: {
        transactions: {
          orderId: "bla1",
          transactionType: "demoTransaction",
          amount: 0,
          date: new Date(),
        },
      },
    }
  );

  return response;
}

async function testIfTransactionExists() {
  let isIdExists = await orderIdAlreadyExists(
    "612f4e3b2a56460f1608c2eb",
    "2CL262088H4898844"
  );
  console.log(isIdExists);
}

function addNewMessages() {
  Messages.insertMany([
    {
      userId: ObjectId("612f4e3b2a56460f1608c2eb"),
      disturblessNumber: "(555) 555-1235",
      contactNumber: "+21629453210",
      messages: [
        {
          direction: "out",
          content: "Test",
          when: new Date(),
          nature: "SMS",
        },
        {
          direction: "in",
          content: "Test",
          when: new Date(),
          nature: "SMS",
        },
      ],
    },
    {
      userId: ObjectId("612f4e3b2a56460f1608c2eb"),
      disturblessNumber: "(555) 555-1235",
      contactNumber: "+21629453210",
      messages: [
        {
          direction: "out",
          content: "Test",
          when: new Date(),
          nature: "SMS",
        },
        {
          direction: "in",
          content: "Test",
          when: new Date(),
          nature: "SMS",
        },
      ],
    },
  ]);
}

async function updateUsersModel() {
  let response = await User.updateMany({}, { $set: { 
    facebookEmail: "",
    googleEmail: "",
    settings: {
      pushNotifications: {
        voice: true,
        text: true,
      },
      whitelist: [],
      blocklist: []
    }, } });

}

async function listUsers() {
  let response = await User.find({});
  console.log(response);
}

async function run() {
  listUsers();
}

run();
