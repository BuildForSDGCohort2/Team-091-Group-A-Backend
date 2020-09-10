const winston = require('winston');
const express = require('express');

const app = express();

// Startup
require('./startup/logging')();
require('./startup/db')();
require('./startup/config');
require('./startup/validation')();
require('./startup/routes')(app);

// setting and listening for port....
const port = process.env.PORT || 3000;

app.listen(port, () => {
    winston.info(`Listening for port ....${port}`);
});