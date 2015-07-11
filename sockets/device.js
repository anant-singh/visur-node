'use strict';

var auth = require('./auth');

module.exports = function (deviceIO) {

    deviceIO.on('connection', function(socket){

        auth.deviceAuth(socket, function(socket) {
            socket.to(socket.userId).emit('deviceAuth', 'success');
        });
    });
};