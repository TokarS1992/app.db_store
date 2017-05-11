"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var UserSchrema = new Schema({

    local: {
        name: String,
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

UserSchrema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchrema.methods.validPass = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model("User", UserSchrema);