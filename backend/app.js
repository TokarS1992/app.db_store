"use strict";

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var compression = require('compression');
var config = require('./config');
var passport = require("passport");
var mongoStore = require("connect-mongodb-session")(session);
var passportConfig = require("./config/passport")(passport);

// Framework
var app = express();

var options = {
    index: "index.html"
};

if (app.get('env') !== 'production') {

    options.index = "index.dev.html";
    // expose node_modules to client app
    app.use(express.static(__dirname + "./../node_modules"));
}

// MiddleWare
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Save sessions to database
var store = new mongoStore({
    uri: config.get('db:connect') + config.get('db:name'),
    collection: "sessions"
});

// Use session
app.use(session({
    secret: config.get("cookie_secret"),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    store: store,
    saveUninitialized: true,
    proxy: true
}));

// Passport initialize
app.use(passport.initialize());

// Use passport session
app.use(passport.session());

app.use(cookieParser());

// Statics
app.use(express.static(path.join(__dirname, '../public'), options));
app.use(express.static(path.join(__dirname, '../app')));

var router = express.Router();
router.use(function(req, res, next) {
    res.setHeader('Access-headers', 'Content-Type,X-Requested-With');
    res.setHeader('Access-headers-methods', 'POST,GET,PUT,DELETE');
    next();
});

const apiPrefix = '/api';

app.use((req, res, next) => {
    console.log(req.method, "url: " + req.url);
    next();
})

// Routes
var apiCatalog = require("./routes/catalog");
var apiCategories = require("./routes/categories");
var auth = require("./routes/auth");

// Use routes
app.use(apiPrefix, apiCatalog);
app.use(apiPrefix, apiCategories);
app.use(apiPrefix, auth);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers
// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;