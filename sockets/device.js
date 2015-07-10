'use strict';

var auth = require('./auth');

module.exports = function (deviceIO) {

    deviceIO.on('connection', auth.deviceAuth, function(socket){
        socket.to(socket.userId).emit('deviceAuth', {auth: true});
    })
};