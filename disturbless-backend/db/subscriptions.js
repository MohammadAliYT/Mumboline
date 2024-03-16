function getSubscriptionQuota(interval) {
  const subscriptions = {
    month: {
      type: "Basic Monthly",
      active: true,
      expiry: getExpiryDate(interval),
      createdAt: new Date(),
      quota: {
        total_sentSMS: 10,
        total_smsForwarding: 10,
        total_voiceMailForwarding: 10,
        total_callForwarding: 10,
        sentSMS: 10,
        smsForwarding: 10,
        voiceMailForwarding: 10,
        callForwarding: 10,
      },
    },

    year: {
      type: "Basic Yearly",
      active: true,
      expiry: getExpiryDate(interval),
      createdAt: new Date(),
      quota: {
        total_sentSMS: 120,
        total_smsForwarding: 120,
        total_voiceMailForwarding: 120,
        total_callForwarding: 120,
        sentSMS: 120,
        smsForwarding: 120,
        voiceMailForwarding: 120,
        callForwarding: 120,
      },
    },
  };

  return subscriptions[interval];
}

function getExpiryDate(interval) {
  const expiry = {
    month: Date.now() + 1000 * 60 * 60 * 24 * 30,
    year: Date.now() + 1000 * 60 * 60 * 24 * 365,
  };
  return new Date(expiry[interval]);
}

module.exports = { getSubscriptionQuota, getExpiryDate };
