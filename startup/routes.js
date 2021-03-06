const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const provider = require("../routes/provider");
const order = require("../routes/order");
const error = require("../middleware/error");
const contact = require("../routes/contact");

module.exports = function (app) {
  // Using inbuilt middleware
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static("public"));

  app.use(helmet());
  app.use("/", home);
  app.use("/api/v1/auth", users);
  app.use("/api/v1/auth/login", auth);
  app.use("/api/v1/providers", provider);
  app.use("/api/v1/orders", order);
  app.use("/api/v1/contact", contact);
  app.use(error);
};
