'use strict';

const main = require('../app/controllers/index');
const users = require('../app/controllers/users');

module.exports = function (app, passport) {
    
    app.use('/', main);
    //app.use('/users', users);

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
