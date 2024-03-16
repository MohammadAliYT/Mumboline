require("dotenv").config();
const webpush = require("web-push");
const {
  getNotificationSubscriptions,
  deleteNotificationSubscription,
} = require("./db/dbOperations");

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY, SENDGRID_VERIFIED_EMAIL } =
  process.env;

webpush.setVapidDetails(
  `mailto:${SENDGRID_VERIFIED_EMAIL}`,
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

async function sendPushNotification(userId, payload, subscription) {
  if (subscription) {
    webpush
      .sendNotification(subscription, JSON.stringify(payload))
      .then(() => {
        console.log("Push notification sent successfully.");
      })
      .catch((error) => {
        console.error("Error sending push notification:", error.body);
      });
  } else {
    const { subscriptions } = await getNotificationSubscriptions(userId);
    subscriptions.forEach((sub) => {
      webpush.sendNotification(sub, JSON.stringify(payload)).catch((error) => {
        console.error("Error in sending push notification:", error.body);
        if (error?.statusCode === 410) {
          deleteNotificationSubscription(userId, sub);
        }
      });
    });
  }
}

module.exports = {
  webpush,
  sendPushNotification,
};
