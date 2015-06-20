'use strict';

var auth = require('../../lib/auth_lib');
var User = require('../../models/user');

module.exports = function (router) {
    router.get('/', auth.ensureAuthentication, function (req, res) {
        User.findById(req.user, function(err, user) {
            res.send(user);
        })
    })
};
