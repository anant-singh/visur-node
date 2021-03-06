'use strict';

var jwt = require('jwt-simple');
var config = require('../config');
var User = require('../models/user');
var moment = require('moment');
var crypto = require('crypto'),
    algorithm = 'aes-128-ctr',
    key = config.TOKEN_SECRET;

exports.ensureAuthentication = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({message: 'Token has expired'});
    }

    User.findById(payload.sub, function(err, user){
        if(err || !user){
            res.status(401).send({message: 'User doesn\'t exist.'});
            return;
        }
        req.user = payload.sub;
        next();
    });
};

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.validateToken = function (token) {
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    return payload.exp > moment().unix();
};

exports.getUserId = function (token) {
    return jwt.decode(token, config.TOKEN_SECRET).sub;
};

exports.createAccessToken = function (authToken, userId) {
    var cipher = crypto.createCipher(algorithm, key);
    var accessToken = cipher.update(authToken + '|' + userId, 'utf8', 'hex');
    accessToken += cipher.final('hex');
    return accessToken;
};

exports.accessTokenToUserId = function (accessToken) {
    var decipher = crypto.createDecipher(algorithm, key);
    var data = decipher.update(accessToken, 'hex', 'utf8');
    data += decipher.final('utf8');
    return data.split('|')[1];
};