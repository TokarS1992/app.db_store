"use strict";

const localStrategy = require('passport-local').Strategy;
const User = require("../models/users.auth.model");

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // passport.use('local-signup', new localStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true
    //     },
    //     function(req, email, password, done) {
    //         return User.findOne({ "login.user": email })
    //             .then(user => {
    //                 if ( user ) {

    //                 }
    //             })
    //             .catch(error => {

    //             })
    //     }));

    // passport.use("local-signup", new localStrategy({
    //     usernameField: 'email',
    //     passwordField: 'password',
    //     passReqToCallback: true
    // }, function(req, email, password, done) {
    //     return done(null, true);
    // }));

    passport.use(new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            return User.findOne({ "local.email": email })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    if (!user.validPass(password)) {
                        return done(null, false);
                    }
                    console.log("User authenticated");
                    return done(null, user);
                })
                .catch(error => {
                    return done(error);
                })
        }));
}