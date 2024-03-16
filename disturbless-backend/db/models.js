const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const findOrCreate = require("mongoose-findorcreate");

const { BCRYPT_SALT_ROUNDS, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  verified: Boolean,
  subscriptions: [Object],
  settings: {
    pushNotifications: {
      voice: { type: Boolean, default: true },
      text: { type: Boolean, default: true },
    },
    whitelist: [String],
    blacklist: [String],
  },
});

const userMessagesSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    disturblessNumber: String,
    contactNumber: String,
    messages: [
      {
        ToCountry: String,
        ToState: String,
        SmsMessageSid: String,
        NumMedia: String,
        ToCity: String,
        FromZip: String,
        SmsSid: String,
        FromState: String,
        SmsStatus: String,
        FromCity: String,
        Body: String,
        FromCountry: String,
        To: String,
        ToZip: String,
        NumSegments: String,
        MessageSid: String,
        AccountSid: String,
        From: String,
        ApiVersion: String,
        TranscriptionUrl: String,
        TranscriptionSid: String,
        TranscriptionText: String,
        RecordingUrl: String,
        RecordingSid: String,
        when: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userTransactionsSchema = mongoose.Schema({
  currentBalance: Number,
  transactionEvents: [
    {
      orderId: String, // stripe session id, or paypal whatever id
      transactionType: String, // STRIPE_PAYMENT_ATTEMPT | STRIPE_PAYMENT_SUCCESS | STRIPE_PAYMENT_FAILURE | STRIPE_PAYMENT_CANCEL
      amount: Number, // amount in dollars
      number: String, // the Disturbless Number in question
      isoCountry: String,
      date: Date, // when the transaction event happened
      addressSid: String,
      interval: String,
      subscriptionId: String,
      phoneNumberSid: String,
    },
  ],
});

const numberSchema = mongoose.Schema({
  numbers: [
    {
      number: String, // E.164 standard
      friendlyName: String,
      sid: String,
      addressRequirements: String,
      addressSid: String,
      provider: String,
      costData: {
        inboundSmsPrice: Number, // These prices are set by Twilio
        outboundSmsPrice: Number,
      },
      country: String,
      label: String,
      verified: Boolean,
      lastPaidForUsing: String, // PAYPAL_PAIEMENT | PAYPAL_SUBSCRIPTION | STRIPE_PAIEMENT | STRIPE_SUBSCRIPTION | CRYPTO | BALANCE?
      orderId: String, // one time paiement id
      subscriptionId: String, // subscription id
      isActive: Boolean,
      autoRenew: Boolean,
      expires: Date,
      firstPurchased: Date,
      settings: {
        forwarding: {
          toEmail: Boolean,
          emailAddress: String,
          toPrimaryPhone: Boolean,
          primaryPhoneNumber: String,
          voiceMailGreeting: String,
        },
      },
      subscriptions: [],
    },
  ],
});

const reservedNumberSchema = mongoose.Schema({
  number: String,
  expireAt: {
    type: Date,
    index: { expires: 600 },
  },
});

const releasedNumberSchema = mongoose.Schema({
  numbers: [
    {
      number: String, // E.164 standard
      friendlyName: String,
      sid: String,
      addressRequirements: String,
      addressSid: String,
      provider: String,
      costData: {
        inboundSmsPrice: Number, // These prices are set by Twilio
        outboundSmsPrice: Number,
      },
      country: String,
      label: String,
      lastPaidForUsing: String, // PAYPAL_PAIEMENT | PAYPAL_SUBSCRIPTION | STRIPE_PAIEMENT | STRIPE_SUBSCRIPTION | CRYPTO | BALANCE?
      orderId: String, // one time paiement id
      subscriptionId: String, // subscription id
      isActive: Boolean,
      autoRenew: Boolean,
      expires: Date,
      firstPurchased: Date,
      settings: {
        forwarding: {
          toEmail: Boolean,
          emailAddress: String,
          toPrimaryPhone: Boolean,
          primaryPhoneNumber: String,
          voiceMailGreeting: String,
        },
      },
      subscriptions: [],
    },
  ],
});

const callsSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  disturblessNumber: String,
  contactNumber: String,
  calls: [
    {
      AccountSid: String,
      ApiVersion: String,
      CallSid: String,
      CallStatus: String,
      CallToken: String,
      Called: String,
      CalledCity: String,
      CalledCountry: String,
      CalledState: String,
      CalledZip: String,
      Caller: String,
      CallerCity: String,
      CallerCountry: String,
      CallerState: String,
      CallerZip: String,
      Direction: String,
      From: String,
      FromCity: String,
      FromCountry: String,
      FromState: String,
      FromZip: String,
      CallbackSource: String,
      StirVerstat: String,
      To: String,
      ToCity: String,
      ToCountry: String,
      ToState: String,
      ToZip: String,
      Timestamp: String,
      CallbackSource: String,
      SequenceNumber: String,
      Duration: String,
      CallDuration: String,
      ForwardedFrom: String,
      TranscriptionUrl: String,
      TranscriptionSid: String,
      RecordingSid: String,
      RecordingUrl: String,
      url: String,
      TranscriptionText: String,
      TranscriptionStatus: String,
      when: Date,
    },
  ],
});

const verifiedIdSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  numbers: [
    {
      number: String,
      friendlyName: String,
      verified: Boolean,
      when: Date,
    },
  ],
  emails: [
    {
      email: String,
      friendlyName: String,
      verified: Boolean,
      when: Date,
    },
  ],
});

userSchema.plugin(findOrCreate);

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = async function (plainTextPassword) {
  return await bcrypt.hash(plainTextPassword, Number(BCRYPT_SALT_ROUNDS));
};

const User = mongoose.model("User", userSchema);
const Numbers = mongoose.model("Number", numberSchema);
const ReservedNumbers = mongoose.model("ReservedNumber", reservedNumberSchema);
const UserTransaction = mongoose.model(
  "UsersTransaction",
  userTransactionsSchema
);

const Messages = mongoose.model("Messages", userMessagesSchema);
const ReleasedNumber = mongoose.model("ReleasedNumbers", releasedNumberSchema);
const Calls = mongoose.model("Calls", callsSchema);
const VerifiedIds = mongoose.model("verifiedIds", verifiedIdSchema);

module.exports = {
  User,
  Numbers,
  ReservedNumbers,
  ReleasedNumber,
  Calls,
  Messages,
  UserTransaction,
  VerifiedIds,
};
