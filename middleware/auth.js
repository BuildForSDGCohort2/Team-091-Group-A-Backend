const winston = require('winston');
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send(`Access Denied: No token provided...`);
    try {
        const decoded = jwt.verify(token, config.get(`jwtPrivateKey`));
        req.user = decoded;
        next();
    } catch (ex) {
        // Logging Error and returning a response to user
        winston.error(ex.message, ex);
        res.status(400).send(`Invalid token....`);
    }
}