const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/transall')
        .then(() => winston.info('MongoDB connection established successfully.....'));
}