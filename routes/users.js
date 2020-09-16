 const auth = require('../middleware/auth');
 const _ = require('lodash');
 const bcrypt = require('bcryptjs');
 const { User, validate } = require('../models/user');
 const mongoose = require('mongoose');
 const express = require('express');
 const router = express.Router();

 // Router to get user
 router.get('/user/me', auth, async(req, res) => {
     const user = await User.findOne({_id: req.user._id}).select('-password');
     res.send(user);
 });

 // Router to create new user

 router.post('/register', async(req, res) => {

     // validate input from user 
     const { error } = validate(req.body);
     if (error){ 
         return res.status(400).send(error.details[0].message);
        }
     try {
         // check if user already exists
         let user = await User.findOne({ email: req.body.email });
         if (user) return res.status(400).send(`User already exists.....`);

         user = new User(_.pick(req.body, ['firstname', 'lastname', 'email', 'password']));
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(user.password, salt); // hashing user's password
         await user.save();
         res.send(_.pick(user, ['_id', 'firstname', 'lastname', 'email']));
     } catch (ex) {
         for (fields in ex.errors) {
             winston.error(ex.errors[fields]);
         }
     }

 })


 module.exports = router;