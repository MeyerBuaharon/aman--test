const express = require("express");
const router = express.Router();
require("dotenv").config();
const Call = require("../models/calls");

const VoiceResponse = require("twilio/lib/twiml/VoiceResponse");

const accountSId = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const twilioClient = require("twilio")(accountSId, authToken);

router.get("/", async (req, res) => {
  try {
    const calls = await Call.find().limit(10);
    res.json(calls);
  } catch (err) {}
});

router.post("/", async (req, res) => {
  const call = new Call({
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const savedCall = await call.save();
    res.status(200).json(savedCall);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/inbound", (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say("hello from twilio");
  res.type("text/xml");
  res.send(twim.toString());

  // TODO: save the phone number in database when the webhook is called.
  // I cant get the webhook working for some reason, I used ngrok with the webhook option in the active number, but still no response
});

router.post("/outbound", (req, res) => {
  twilioClient.calls.create(
    {
      url: "https://demo.twilio.com/docs/voice.xml",
      to: process.env.PHONE,
      from: "+1 510 907 4320",
    },
    async (err, call) => {
      if (call) {
        const newCall = new Call({
          phoneNumber: call.toFormatted,
        });
        try {
          const savedCall = await newCall.save();
          res.status(200).json(savedCall);
        } catch (err) {
          res.status(404).json({ message: err });
        }
      }
    }
  );
});

module.exports = router;
