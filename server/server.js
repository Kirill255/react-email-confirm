const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const emailController = require("./controllers/email");
const { PORT, CLIENT_ORIGIN, DB_URL } = require("./config");

// Only allow requests from our client
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.json());

// This endpoint is pinged every 5 mins by uptimerobot.com to prevent
// free services like Heroku and Now.sh from letting the app go to sleep.
// This endpoint is also pinged every time the client starts in the
// componentDidMount of App.js. Once the app is confirmed to be up, we allow
// the user to perform actions on the client.
app.get("/wake-up", (req, res) => res.json({ msg: "👌" }));

// This is the endpoint that is hit from the onSubmit handler in Landing.js
// The callback is shelled off to a controller file to keep this file light.
app.post("/email", emailController.collectEmail);

// Same as above, but this is the endpoint pinged in the componentDidMount of
// Confirm.js on the client.
app.get("/email/confirm/:id", emailController.confirmEmail);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

// Connecting the database and then starting the app.
mongoose
  .connect(DB_URL, options, () => {
    app.listen(PORT, () => console.log("👍 ", PORT));
  })
  .catch((err) => console.log(err));
