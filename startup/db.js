const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() =>
      winston.info("MongoDB connection established successfully.....")
    );
};
