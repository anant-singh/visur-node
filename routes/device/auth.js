'use strict';

var Hashids = require('hashids');
var auth = require('../../lib/authLib');
var User = require('../../models/user');
var Device = require('../../models/device');
var hashid = new Hashids('hjsbgvugln873608j5vm-hqouowm8375cvnsafv', 8,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

module.exports = function (router) {
    router.get('/token', auth.ensureAuthentication, function (req, res) {
        var t = new Date();
        t = t.getTime() % 100000;
        var token = hashid.encode(t);
        var device = new Device();
        device.authToken = token;
        device.userId = req.user;
        device.authorized = false;
        device.save(function (err) {
            res.send(token);
        });
    });

    router.delete('/token', auth.ensureAuthentication, function (req, res) {
        var authToken = req.query.authToken;
        if (authToken) {
            Device.findOne({authToken: authToken}, function (err, device) {
                if (device === null) {
                    return;
                }

                if (!device.authorized) {
                    device.remove(function () {
                        res.send('Removed');
                    });
                    return;
                }
                res.send('Invalid auth token');
            });
            return;
        }
        res.send('Invalid auth token');
    });

    router.get('/accessToken', function (req, res) {
        var authToken = req.query.authToken;
        if (authToken) {
            Device.findOne({authToken: authToken}, function (err, device) {
                if (device) {
                    var accessToken = auth.createAccessToken(authToken, device.userId);
                    device.accessToken = accessToken;
                    device.authorized = true;
                    device.save(function (err) {
                        res.send({
                            status: 'success',
                            accessToken: accessToken
                        });
                    });
                }
                else {
                    res.send('Device could not be authenticated');
                }
            });
            return;
        }
        res.send('Authorization token required');
    })
};