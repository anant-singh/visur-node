'use strict';

var Device = require('../models/device'),
    authLib = require('../lib/authLib');

exports.deviceAuth = function(socket, next){
    var accessToken = socket.handshake.query.accessToken;

    if(!accessToken){
        return socket.disconnect();
    }

    Device.findOne({accessToken: accessToken}, function(err,device){
        if(err || !device){
            socket.disconnect();
        }
        else{
            socket.userId = device.userId;
            socket.join(device.userId, function(){
                next(socket);
            });
        }
    });
};

exports.webAuth = function(socket, next){
    var token = socket.handshake.query.token;

    if(!token || !authLib.validateToken(token)){
        return socket.disconnect();
    }
    else{
        var userId = authLib.getUserId(token);
        socket.userId = userId;
        socket.join(userId, function(){
            next(socket);
        });
    }
};