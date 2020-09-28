const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
  service: "Yahoo",
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

module.exports = transport;