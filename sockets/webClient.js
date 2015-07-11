'use strict';

var auth = require('./auth');

module.exports = function(webIO){

    webIO.on('connection', function(socket){
        auth.webAuth(socket, function(socket){
            socket.to(socket.userId).emit('webSocket', {status: 'processing'});
        })
    });

};