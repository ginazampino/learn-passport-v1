const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require("dotenv");

module.exports =  (app) => {
    dotenv.config();
    
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // One day.
        keys: ['random']
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Configure strategy:
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:8117/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    ));

    // Create cookie:
    passport.serializeUser((user, done) => {
        done(null, user);
    })

    // Decode cookie and persist session:
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // Check if the user is authenticated:
    function isUserAuthenticated(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.send('You must login!');
        };
    };

    // Routes:
    app.get('/google', passport.authenticate('google', {
        scope: ['profile'] // Required data.
    }));

    app.get('/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/secret');
    });

    app.get('/secret', isUserAuthenticated, (req, res) => {
        res.send('Secret route.');
    });

    app.get('/logout', (req, res) => {
        req.logout(); 
        res.redirect('/');
    });
};