require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require("http");
const https = require("https");
const fs = require("fs");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const compression = require("compression");
const basicAuth = require("express-basic-auth");

const paypal = require("./paypal/paypal");
paypal.init();

const passportRoutes = require("./passport");
const twilioWebhookRouter = require("./webhooks/twilio");
const stripeWebhookRouter = require("./webhooks/stripe");
const paypalWebhookRouter = require("./webhooks/paypal");
const apiRoutes = require("./api/api");

const {
  NODE_ENV,
  SESSION_SECRET,
  PORT,
  DOMAIN_NAME,
  APP_NAME,
  MONGO_URL,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
} = process.env;

if (
  !(
    NODE_ENV &&
    SESSION_SECRET &&
    PORT &&
    MONGO_URL &&
    DOMAIN_NAME &&
    APP_NAME &&
    PAYPAL_CLIENT_ID &&
    PAYPAL_CLIENT_SECRET
  )
) {
  throw new Error("Environment variable missing.");
}

if (NODE_ENV == "production") {
  app.use(function useHttps(req, res, next) {
    if (req.secure) {
      next();
    } else {
      res.redirect("https://" + req.headers.host + req.url);
    }
  });
}

/* (!) ORDER MATTERS (!) */
app.use(compression());
app.use(stripeWebhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// webhooks
app.use(twilioWebhookRouter);
app.use(paypalWebhookRouter);

// Debug
// app.use((req, res, next) => {
//     console.log("Got request: " + JSON.stringify(req.body));
//     next();
// })

console.log("==========>", MONGO_URL);

app.use(
  session({
    secret: SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passportRoutes);
app.use("/api", apiRoutes);

app.use(
  basicAuth({
    users: { admin: "voip" },
    challenge: true,
  })
);

app.use(express.static("../disturbless-frontend/build/"));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "..", "disturbless-frontend/build/index.html")
  );
});

http.createServer(app).listen(PORT, () => {
  console.log("Up and running on port:", PORT);
});

if (NODE_ENV === "production") {
  const credentials = {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/mumboline.com/privkey.pem",
      "utf8"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/mumboline.com/cert.pem",
      "utf8"
    ),
    ca: fs.readFileSync(
      "/etc/letsencrypt/live/mumboline.com/chain.pem",
      "utf8"
    ),
  };
  https.createServer(credentials, app).listen(443);
}
