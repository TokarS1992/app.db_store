"use strict";

function isAuthOrRedirect(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.json({
        success: false
    })
};

function isNotAuthOrRedirect(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.json({
        message: "",
        redirectTo: "/"
    })
};

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.json({
        authenticated: false
    });
}

function isNotAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.json({
        authenticated: true
    });
}

module.exports = {
    isAuthOrRedirect: isAuthOrRedirect,
    isNotAuthOrRedirect: isNotAuthOrRedirect,
    isAuth: isAuth,
    isNotAuth: isNotAuth
}