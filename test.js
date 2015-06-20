var crypto = require('crypto'),
    hat = require('hat'),
    algorithm = 'aes-256-ctr',
    password = 'secret',
    user_id = 1242525,
    rack = hat.rack(),
    tok = rack();


exports.encrypt = function (text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function(text){
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
};

