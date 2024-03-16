const { appendCall } = require("../db/callsCollectionUtils");
const {
  getActiveNumbers,
  getCallsPerNumberById,
  getCalls,
} = require("../db/dbOperations");
var express = require("express"),
  router = express.Router();

router.get("/calls/", async (req, res) => {
  const activeNumbers = await getActiveNumbers(req.user._id);
  const contactsPerNumber = await getCallsPerNumberById(req.user._id);
  Promise.all([activeNumbers, contactsPerNumber]).then((values) =>
    res.json({
      numbers: values[0]?.numbers,
      contactsPerNumber: values[1],
    })
  );
});

router.get(
  "/calls/:disturblessNumber/:contactNumber/:lowerBound?/:upperBound?/",
  async (req, res) => {
    // const hasNumberBoolean = await hasNumber(req.user, req.params.disturblessNumber);
    const getCallsRes = await getCalls(
      req.user._id,
      req.params.disturblessNumber,
      req.params.contactNumber,
      req.params.lowerBound,
      req.params.upperBound
    );

    if (getCallsRes.error) return res.status(401).json(getCallsRes);

    res.json(getCallsRes[0]?.calls);
  }
);

router.post("/calls/append", async (req, res) => {
  console.log(req.body.calls[0]);
  await appendCall(
    req.body.userId,
    req.body.disturblessNumber,
    req.body.contactNumber,
    req.body.calls[0]
  );
});

module.exports = router;
