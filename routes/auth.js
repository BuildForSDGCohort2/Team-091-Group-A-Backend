const Joi = require("joi");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(req);
}

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error.error) {
    return res.status(400).json({
      status: "error",
      message: error.error.details[0].message
    });
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      status: "error",
      message:"Invalid email or password...."
    });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      status: "error",
      message:"Invalid email or password...."
    });
  }
  const token = user.generateAuthKey();
  res.header("x-auth-token", token).json({
    message: "success",
    user,
    token 
  });
});

module.exports = router;
