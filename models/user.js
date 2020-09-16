const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    lastname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    isAdmin: Boolean
});

// Function to generate token
userSchema.methods.generateAuthKey = function() {
    const token = jwt.sign({ _id: this._id, firstname: this.firstname, lastname: this.lastname, isAdmin: this.isAdmin, email: this.email }, config.get('jwtPrivateKey'));
    return token;
}

// compiling user schema into a model
const User = mongoose.model('User', userSchema);

// validate user information
function validateUser(user) {
    const schema = Joi.object({
            firstname: Joi.string().min(3).max(50).required(),
            lastname: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(3).max(255).required().email(),
            password: Joi.string().min(3).max(255).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;