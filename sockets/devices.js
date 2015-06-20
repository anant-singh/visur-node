'use strict';

var auth = require('../lib/auth_lib');

module.exports = function(io){
    var deviceIO = io.of('/devices');

    deviceIO.on('connection', function(socket){
        var token = socket.handshake.query.token;
        var accessToken = socket.handshake.query.accessToken;
        if((!token || !auth.validateToken(token)) &&
            (!accessToken || !auth.validateAccessToken(accessToken))){
            socket.disconnect();
        }

    });

};
