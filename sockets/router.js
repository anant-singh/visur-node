'use strict';

var router = function(io){

    router.route = function(event, middleware, cb){
        if(cb){
            io.on(event, middleware)
        }
    }
};