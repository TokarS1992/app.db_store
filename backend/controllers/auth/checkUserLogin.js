"use strict";

const promise = require("bluebird");
const User = require("../../models/users.auth.model");
const returtObj = require("./auth.controller").returtObj;

module.exports = promise.method(function checkUserLogin(id_user) {
    return User.findOne({
            _id: id_user
        })
        .then(user => {
            console.log(user._id);
            return returtObj(user);
        })
        .catch(err => {
            console.log(err);
            return err;
        })
})