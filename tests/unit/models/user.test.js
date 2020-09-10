const { User } = require('../../../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('generateAuthKey', () => {
    it('should return a valid jwt', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true,
            firstname: 'Ja',
            lastname: 'Obi',
            email: 'a'
        }
        const user = new User(payload);
        const token = user.generateAuthKey();
        const verifyToken = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(verifyToken).toMatchObject(payload);
    });
})