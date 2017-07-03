const express = require('express');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('../services/local_strategy');

const endpoint = '/api/auth/login';

const Helpers = require('../services/helpers');
const projections = require('../services/projections');

passport.use(LocalStrategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(req, id, done) {
    req.app.locals.User.find(id)
        .then((user) => {
            done(null, user);
        });
});

router.post(endpoint,
    passport.authenticate('local'),
    (req, res) => {
        res.send({
            user: Helpers.applyProjectionOnEntity(req.user,
                projections.user.basic)
        });
    });

module.exports = router;