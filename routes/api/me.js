'use strict';

var auth = require('../../lib/authLib');
var User = require('../../models/user');

module.exports = function (router) {
    router.get('/', auth.ensureAuthentication, function (req, res) {
        User.findById(req.user, function(err, user) {
            res.send(user);
        })
    })
};
