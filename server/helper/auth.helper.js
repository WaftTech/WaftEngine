const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {oauthConfig} = require('../config/keys');
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: oauthConfig.googleAuth.app_id,
            clientSecret: oauthConfig.googleAuth.app_secret,
            callbackURL: oauthConfig.googleAuth.callback_url
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};