const {
  oauthConfig: { googleAuth, facebookAuth },
  isOauthConfig: { isGoogleAuth, isFacebookAuth },
} = require('../config/keys');

const randomHexGenerator = require('./../helper/others.helper').generateRandomHexString;
const bcrypt = require('bcryptjs');
const userSch = require('./../modules/user/userShema');

const emailHelper = require('./email.helper');
const renderMail = require('./../modules/template/templateController').internal;

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
        async (accessToken, refreshToken, profile, cb) => {
          try {
            // Extract the minimal profile information we need from the profile object
            const existingUser = await userSch.findOne({ email: profile.emails[0].value });
            if (existingUser) {
              return cb(null, existingUser);
            }

            const randompassword = await randomHexGenerator(12);

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(randompassword, salt);

            const newUser = new userSch({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: hash,
              email_verified: true,
              roles: ['5bf7ae90736db01f8fa21a24'],
            });

            const retuser = await newUser.save();

            const renderedMail = await renderMail.renderTemplate(
              'third_party_signup',
              {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: randompassword,
                account: 'Google',
              },
              profile.emails[0].value,
            );
            if (renderMail.error) {
              console.log('render mail error: ', renderMail.error);
            } else {
              emailHelper.send(renderedMail);
            }
            cb(null, retuser);
          } catch (err) {
            console.log('err:', err);
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
              const existingUser = await userSch.findOne({ email: profile.emails[0].value });
              if (existingUser) {
                return done(null, existingUser);
              }

              const randompassword = await randomHexGenerator(12);

              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(randompassword, salt);

              const displayName = profile.name.givenName + ' ' + profile.name.familyName;

              const newUser = new userSch({
                name: displayName,
                email: profile.emails[0].value,
                password: hash,
                email_verified: true,
                roles: ['5bf7ae90736db01f8fa21a24'],
              });

              const retuser = await newUser.save();

              const renderedMail = await renderMail.renderTemplate(
                'third_party_signup',
                {
                  name: displayName,
                  email: profile.emails[0].value,
                  password: randompassword,
                  account: 'Facebook',
                },
                profile.emails[0].value,
              );
              if (renderMail.error) {
                console.log('render mail error: ', renderMail.error);
              } else {
                emailHelper.send(renderedMail);
              }
              done(null, retuser);
            } else {
              done(null, false);
            }
          } catch (err) {
            console.log('err:', err);
          }
        },
      ),
    );
  }
};
