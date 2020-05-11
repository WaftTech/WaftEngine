const {
  oauthConfig: { googleAuth, facebookAuth },
  isOauthConfig: { isGoogleAuth, isFacebookAuth },
} = require('../config/keys');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  if (isGoogleAuth) {
    const GoogleTokenStrategy = require('passport-google-token').Strategy;

    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: googleAuth.client_id,
          clientSecret: googleAuth.client_secret,
        },
        async (accessToken, refreshToken, profile, cb, req) => {
          try {
            // Extract the minimal profile information we need from the profile object
            const user = { name: profile.displayName, first_name: profile.name.givenName, last_name: profile.name.familyName, email: profile.emails[0].value, picture: profile._json.picture, provider: 'google', id: profile.id };
            return cb(null, user);
          } catch (err) {
            console.log('err:', err);
            return cb(err, null);
          }
        },
      ),
    );
  }
  if (isFacebookAuth) {
    const FacebookTokenStrategy = require('passport-facebook-token');
    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: facebookAuth.FACEBOOK_APP_ID,
          clientSecret: facebookAuth.FACEBOOK_APP_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            if (profile.emails && profile.emails[0].value) {
              // Extract the minimal profile information we need from the profile object
              const user = { name: profile.displayName, first_name: profile.name.givenName, last_name: profile.name.familyName, email: profile.emails[0].value, picture: profile.photos[0].value, provider: 'facebook', id: profile.id };
              return done(null, user);
            } else {
              done(null, false);
            }
          } catch (err) {
            console.log('err:', err);
            return cb(err, null);
          }
        },
      ),
    );
  }
};
