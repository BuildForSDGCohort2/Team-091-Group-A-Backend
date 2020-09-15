 const helmet = require('helmet');
 const express = require('express');
 const home = require('../routes/home');
 const users = require('../routes/users');
 const auth = require('../routes/auth');

 const error = require('../middleware/error');

 module.exports = function(app) {

     // Using inbuilt middleware 
     app.use(express.json());

     app.use(express.urlencoded({ extended: true }));

     app.use(express.static('public'));

     app.use(helmet());
     app.use('/', home);
     app.use('/api/v1/auth', users);
     app.use('/api/v1/auth/login', auth);

     app.use(error);
 }