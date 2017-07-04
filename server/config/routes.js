'use strict';

const users = require('../app/controllers/users');
const auth = require('./middlewares/authorization');

module.exports = function (app, passport) {
    const pauth = passport.authenticate.bind(passport);

    app.post('/register', users.register);
    app.post('/login', pauth('local'), users.login);
    app.get('/logout', auth.requiresLogin, users.logout);
    app.get('/profile', auth.requiresLogin, users.getProfile);
    app.post('/profile', auth.requiresLogin, users.saveProfile);
    app.post('/passwd', auth.requiresLogin, users.changePassword);

    /**
     * Error handling
     */
    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }

        console.error(err.stack);

        if (err.stack.includes('ValidationError')) {
            res.status(422).json({
                message: 'Validation error',
                error: err.stack 
            });
            return;
        }

        // error page
        res.status(500).json({
            message: 'Server error',
            stack: err.stack 
        });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res) {
        const payload = {
            url: req.originalUrl,
            error: 'Not found'
        };
        return res.status(404).json(payload);
    });
};
