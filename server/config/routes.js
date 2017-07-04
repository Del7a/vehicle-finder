'use strict';

const account = require('../app/controllers/account');
const profile = require('../app/controllers/profile');
const maker = require('../app/controllers/maker');
const model = require('../app/controllers/model');
const auth = require('./middlewares/authorization');

const isAdmin = [auth.requiresLogin, auth.isInAdminRole];

module.exports = function (app, passport) {
    const pauth = passport.authenticate.bind(passport);

    // auth routes
    app.post('/register', account.register);
    app.post('/login', pauth('local'), account.login);
    app.get('/logout', auth.requiresLogin, account.logout);
    app.post('/passwd', auth.requiresLogin, account.changePassword);

    // profile routes
    app.get('/profile', auth.requiresLogin, profile.getProfile);
    app.post('/profile', auth.requiresLogin, profile.saveProfile);
    app.get('/profile/subs', auth.requiresLogin, profile.getSubscriptions);

    // makers routes
    app.param('id', maker.load);    
    app.get('/makers', isAdmin, maker.showAll);
    app.post('/makers', isAdmin, maker.create);
    app.get('/makers/:id', isAdmin, maker.show);
    app.put('/makers/:id', isAdmin, maker.update);
    app.delete('/makers/:id', isAdmin, maker.destroy);

    // models routes
    app.param('modelId', model.load);
    app.post('/makers/:id/models', isAdmin, model.create);
    app.get('/makers/:id/models/:modelId', isAdmin, model.get);
    app.delete('/makers/:id/models/:modelId', isAdmin, model.destroy);

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
