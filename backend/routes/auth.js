"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");

const helperAuth = require("./authHelper/authHelper");
const controllerAuth = require("../controllers/auth/auth.controller");
const checkUserLogin = require("../controllers/auth/checkUserLogin");

// Get status about session is true or false 
router.get("/session", helperAuth.isAuth, function(req, res, next) {
    if (req.session.passport) {
        checkUserLogin(req.session.passport.user)
            .then(user => {
                res.json({
                    authenticated: req.isAuthenticated(),
                    data: user
                })
            })
            .catch(err => {
                res.json({
                    data: err
                })
            })
    }
});

router.post("/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (!err) {
            if (!user) {
                console.log("Not user");
                res.json({
                    userPass: false,
                    message: "Invalid login or password"
                })
            } else {
                req.logIn(user, (error) => {
                    if (error) {
                        res.status(500);
                        return res.json({
                            message: "Server response with status 500",
                            data: error
                        })
                    }
                });

                // Return login/name/... status, checkPass after user is logining
                checkUserLogin(user.id)
                    .then(_user => {
                        return res.json({
                            userPass: true,
                            success: true,
                            data: _user
                        })
                    })
                    .catch(err => {
                        return res.json({
                            success: false,
                            data: err
                        })
                    })
            }
        } else {
            console.log(err);
            res.status(500);
            res.json({
                data: err
            })
        }
    })(req, res, next);
});

router.post("/registrate", helperAuth.isNotAuthOrRedirect, function(req, res, next) {
    controllerAuth.userRegistrate(req.body)
        .then(user => {
            if (!user) {
                // Return message about e-mail is basy in database
                res.json({
                    newUser: false,
                    success: true,
                    message: "This e-mail is basy"
                })
            } else {
                // Return message about registration succefully. Redirect on login after registration
                res.json({
                    newUser: true,
                    success: true,
                    message: "Registration completed successfully",
                    redirectTo: "login"
                })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                success: false,
                message: "Server error",
                data: error
            })
        })
});

router.get("/logout", helperAuth.isAuth, function(req, res, next) {
    req.logout();
    console.log('User go out');
    // Return status success about user go out
    res.json({
        success: !req.isAuthenticated()
    })
});

module.exports = router;