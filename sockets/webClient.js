'use strict';

var auth = require('./auth');

module.exports = function(webIO){

    webIO.on('connection', function(socket){
        auth.webAuth(socket, function(socket){
            setTimeout(function(){
                socket.to(socket.userId).emit('ping', 'data');
            }, 1000);
        })
    });

};