
const settingsHelper = require('./settings.helper')

module.exports = async passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  const isFacebookAuth = await settingsHelper('auth', 'allow_facebook_login');
  const isGoogleAuth = await settingsHelper('auth', 'allow_google_login');

  if (isGoogleAuth == true) {
    const clientID = await settingsHelper('auth', 'googleAuth_client_id')
    const clientSecret = await settingsHelper('auth', 'googleAuth_client_secret')

    const GoogleTokenStrategy = require('passport-google-token').Strategy;
    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: clientID,
          clientSecret: clientSecret,
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
  if (isFacebookAuth == true) {
    const FacebookTokenStrategy = require('passport-facebook-token');
    const FACEBOOK_APP_ID = await settingsHelper('auth', 'facebookAuth_FACEBOOK_APP_ID');
    const FACEBOOK_APP_SECRET = await settingsHelper('auth', 'facebookAuth_FACEBOOK_APP_SECRET');

    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: FACEBOOK_APP_ID,
          clientSecret: FACEBOOK_APP_SECRET,
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
