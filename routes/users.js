const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");
const express = require("express");
const winston = require("winston");
const transport = require("../utils/mailConfig");
const welcomeMessage = require("../utils/welcomeMesage");

/*eslint new-cap: "error"*/
const router = express.Router();

// Router to get user
router.get("/user/me", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).select("-password");
  res.send(user);
});

// Router to create new user

router.post("/register", async (req, res) => {
  // validate input from user
  const error = validate(req.body);
  if (error.error) {
    return res.status(400).send(error.error.details[0].message);
  }
  try {
    // check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exists.....");
    }

    user = new User(
      _.pick(req.body, ["firstname", "lastname", "email", "password"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); // hashing user's password
    await user.save();
    const message = {
      from: process.env.NODEMAILER_USER,
      to: user.email,
      subject: 'Welcome to Transall',
      html: welcomeMessage(user)
    }
    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    })
    res.send(
      _.pick(user, ["_id", "firstname", "lastname", "email", "isAdmin"])
    );
  } catch (ex) {
    for (const fields in ex.errors) {
      if (ex.errors.hasOwnProperty(fields)) {
        winston.error(ex.errors[fields]);
      }
    }
  }
});
router.post("/register/admin", async (req, res) => {
  // validate input from user
  const error = validate(req.body);
  if (error.error) {
    return res.status(400).send(error.error.details[0].message);
  }
  try {
    // check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exists.....");
    }

    user = new User(
      _.pick(req.body, ["firstname", "lastname", "email", "password"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); // hashing user's password
    user.isAdmin =  true;
    user.save();
    const message = {
      from: process.env.NODEMAILER_USER,
      to: user.email,
      subject: 'Welcome to Transall',
      html: welcomeMessage(user)
    }
    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    })
    res.send(
      _.pick(user, ["_id", "firstname", "lastname", "email", "isAdmin"])
    );
  } catch (ex) {
    for (const fields in ex.errors) {
      if (ex.errors.hasOwnProperty(fields)) {
        winston.error(ex.errors[fields]);
      }
    }
  }
});

module.exports = router;
