"use strict";

const User = require("../../models/users.auth.model");
const userExistController = require("./checkUser");

function userRegistrate(userInfo) {

    var newUser = new User();

    newUser.local.name = userInfo.name
    newUser.local.email = userInfo.email
    newUser.local.password = newUser.generateHash(userInfo.password);

    return userExistController(newUser)
        .then(user => {
            // if (user) throw new Error("User exists");

            if (!user) {
                return newUser.save()
                    .then(readyUser => {
                        return returtObj(readyUser);
                    })
                    .catch(error => {
                        console.log(error);
                        throw error;
                    })
            } else {
                console.log("This user is already registered");
                return false;
            }
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

function returtObj(obj) {
    return {
        name: obj.local.name,
        login: obj.local.email
    }
}

module.exports = {
    userRegistrate: userRegistrate,
    returtObj: returtObj
}