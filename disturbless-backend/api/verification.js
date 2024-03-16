const {
  appendVerifiedNumbers,
  appendVerifiedEmail,
  getVerifiedIDs,
} = require("../db/verifiedIdsCollectionUtils");
const express = require("express"),
  router = express.Router();

router.get("/verifyids", async (req, res) => {
  const verifiedIDs = await getVerifiedIDs(req.user._id);
  if (verifiedIDs?.error) return res.status(400).json(verifiedIDs);
  if (!verifiedIDs.length) return res.json({ numbers: [], emails: [] });
  res.json(verifiedIDs[0]);
});

router.post("/verifyId/number", async (req, res) => {
  await appendVerifiedNumbers(req.user._id, req.body.number, req.body.verified);
});

router.post("/verifyId/email", async (req, res) => {
  await appendVerifiedEmail(req.user._id, req.body.email, req.body.verified);
});

module.exports = router;
