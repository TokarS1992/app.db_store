"use strict";

const promise = require("bluebird");
const User = require("../../models/users.auth.model");

module.exports = promise.method(function checkUser(userInfo) {
    return User.findOne({
            "local.email": userInfo.local.email
        })
        .then(user => {
            return user;
            // if (user) return user;
            // return true;
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
})