"use strict";
const { SENDGRID_API_KEY, SENDGRID_VERIFIED_EMAIL } = process.env;

const nodemailer = require("nodemailer");
const { buildEmail } = require("./email_builder");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: SENDGRID_API_KEY,
  })
);

async function sendMessageNotificationEmail(email, number, messageBody) {
  return await transporter.sendMail({
    from: SENDGRID_VERIFIED_EMAIL, // sender address
    to: email, // list of receivers
    subject: `[${number}] new message received`, // Subject line
    html: `<p>You have received the following message:</p>
     <p> ${messageBody}</p>`,
  });
}

// sendMessageNotificationEmail("maherbrini00@gmail.com", {
//   SENDER_NUMBER: "+12012345678",
//   DISTURBLESS_NUMBER: "+12012345678",
//   MESSAGE: "Hello World",
// })

module.exports = {
  sendMessageNotificationEmail,
};
