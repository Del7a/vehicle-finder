'use strict';

/**
 * Dependencies
 */
const express = require('express');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const csrf = require('csurf');
const cors = require('cors');

const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const winston = require('winston');
const config = require('./');
const pkg = require('../../package.json');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */
module.exports = function (app, passport) {
    app.use(compression({ threshold: 512 }));

    app.use(cors({
        origin: ['http://localhost:3000'],
        optionSuccessStatus: 200,
        credentials: true
    }));

    let log = 'dev';
    if (env !== 'development') {
        log = {
            stream: {
                write: message => winston.info(message)
            }
        };
    }

    if (env !== 'test') app.use(morgan(log));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride(function (req) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    app.use(cookieParser());
    app.use(cookieSession({ secret: 'secret' }));
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: pkg.name,
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    // if (env !== 'test') {
    //     app.use(csrf());
        
    //     app.use(function (req, res, next) {
    //         res.locals.csrf_token = req.csrfToken();
    //         next();
    //     });
    // }

    if (env == 'development') {
        app.locals.pretty = true;
    }
};
