const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password....`);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(`Invalid email or password.....`);
    const token = user.generateAuthKey();
    res.header('x-auth-token', token).send(token);
});

function validate(req) {
    const schema = {
        email: Joi.String().min(5).max(255).required().email(),
        password: Joi.String().min(5).max(50).required()
    }
    return Joi.validate(req, seshema);
}

module.exports = router;