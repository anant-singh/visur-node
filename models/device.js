'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var deviceSchema = mongoose.Schema({
    authToken: {type: String, unique: true, index: true},
    accessToken: {type: String, unique: true, index: true},
    userId: Schema.Types.ObjectId,
    authorized: Boolean,
    info: Schema.Types.Mixed
});

module.exports = mongoose.model('Device', deviceSchema);