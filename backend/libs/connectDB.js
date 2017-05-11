const mongoose = require('mongoose');
const config = require('../config');
const MONGODB_URI = config.get('db:connect') + config.get('db:name');

mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connecting to db: " + config.get('db:name'));
});

module.exports = db;