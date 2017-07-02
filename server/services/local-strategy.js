const LocalStrategy = require('passport-local');

module.exports = new LocalStrategy({
        passReqToCallback: true,
    }, (req, username, password, done) => {
        
        req.app.locals.User.findAll({
            username
        }).then(([user]) => {
            if (!user) {
                return done(null, false);
            } else if (user.password !== password) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
);