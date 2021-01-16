const {
  oauthConfig: { googleAuth, facebookAuth },
  isOauthConfig: { isGoogleAuth, isFacebookAuth },
} = require('../config/keys');
const settingHelper = require('./settings.helper')

module.exports = async passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  const isFacebookAuth = await settingHelper('allow_facebook_login');// settingSch.findOne({ key: 'allow_facebook_login' }, { value: 1, _id: 0 });
  const isGoogleAuth = await settingHelper('allow_google_login');//settingSch.findOne({ key: 'allow_google_login' }, { value: 1, _id: 0 });

  if (isGoogleAuth.value == true) {
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
  if (isFacebookAuth == true) {
    const FacebookTokenStrategy = require('passport-facebook-token');
    const FACEBOOK_APP_ID = await settingHelper('app_id');// settingSch.findOne({ key: 'app_id' }, { value: 1, _id: 0 });
    const FACEBOOK_APP_SECRET = await settingHelper('app_secret');// settingSch.findOne({ key: 'app_secret' }, { value: 1, _id: 0 });

    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: FACEBOOK_APP_ID.value,
          clientSecret: FACEBOOK_APP_SECRET.value,
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
