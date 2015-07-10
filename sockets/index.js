'use strict';

module.exports = function(io){
    //Defince routes
    require('./device')(io.of('/device'));
    require('./webClient')(io.of('/client/web'));
    require('./mobileClient')(io.of('client/mobile'));
};