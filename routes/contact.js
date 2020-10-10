const Joi = require("joi");
const express = require("express");
const router = express.Router();
const transport = require("../utils/mailConfig");


function validate(req) {
	const schema = Joi.object({
	    email: Joi.string().min(5).max(255).required().email(),
	    name: Joi.string().min(5).max(50).required(),
	    message: Joi.string().required(),
  });
  return schema.validate(req);
}

router.post("/", async(req, res) => {
	const error  = validate(req.body);
	  if (error.error) {
	    return res.status(400).json({
	      status: "error",
	      message: error.error.details[0].message
	    });
	  }
	const {name, email, message} = req.body;
	  const sendMessage = {
      from: process.env.NODEMAILER_USER,
      to: "gabkay007@gmail.com",
      subject: `Message from ${name}`,
      text: `${message} from ${email}`
    }

    try {
    	let info = await transport.sendMail(sendMessage);
    	console.log(info);
    	res.status(200).json({
        	status: "success",
        	message: "successfully sent message"
        });
    } catch(error) {
    	res.status(400).json({
	      message: "error",
	      error
    });
    }
});

module.exports = router;
