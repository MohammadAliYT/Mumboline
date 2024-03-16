var express = require("express"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  FacebookStrategy = require("passport-facebook").Strategy,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
  User = require("./db/models").User,
  { generateVerifyCode, verifyCode } = require("./twilioFunctions");

router = express.Router();

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  DOMAIN_NAME,
} = process.env;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      if (!(await user.validPassword(password))) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

function handleSocialLogin(accessToken, refreshToken, profile, done) {
  User.findOrCreate(
    { username: profile.emails[0].value },
    function (err, user) {
      return done(err, user);
    }
  );
}

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: `${DOMAIN_NAME}/auth/facebook/callback`,
      profileFields: ["email"],
    },
    handleSocialLogin
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${DOMAIN_NAME}/auth/google/callback`,
    },
    handleSocialLogin
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, doc) => {
    if (err) done(err, null);
    done(null, doc);
  });
});

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.json(req.user);
});

router.post("/signup", async (req, res) => {
  let { username, password } = req.body;

  User.findOne({ username: username }, async (err, user) => {
    if (err) {
      return res.json({ error: "An error has occured while signing up." });
    }
    if (user) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const newUser = new User({
        username: username,
        verified: false,
        subscriptions: [],
      });

      newUser.password = await newUser.hashPassword(password);

      res.json(await newUser.save());
    }
  });
});

router.post("/forgotPassword", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(404)
        .json({ error: "User not found with this email address" });
    const verifyRes = await generateVerifyCode(user.username, "email");

    res.json({
      message: `A verification code has been sent to ${verifyRes.to}`,
      to: verifyRes.to,
      channel: verifyRes.channel,
    });
  } catch (error) {
    console.error("Error occurred while resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting password" });
  }
});

router.post("/verifycheck/", async (req, res) => {
  const { code, to } = req.body;
  const verifyRes = await verifyCode(to, code);
  console.log("verifyCodeRes ==>", verifyRes);
  if (verifyRes?.error) return res.status(400).json(verifyRes);

  res.json({
    status: verifyRes.status,
  });
});

router.post("/resetPassword", async (req, res) => {
  let { username, newPassword, status } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user.username) {
      return res.json({ error: "Enter the signed up email address." });
    }
    if (status === "approved") {
      user.password = await user.hashPassword(newPassword);
      await user.save();
    }

    return res.status(200).json("Password reset successful");
  } catch (error) {
    console.error("Error occurred while resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting password" });
  }
});

router.get("/api/logout", function (req, res) {
  req.logout();
  res.status(200).end();
});

module.exports = router;
