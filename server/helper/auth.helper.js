const {
  oauthConfig: { googleAuth, facebookAuth },
  isOauthConfig: { isGoogleAuth, isFacebookAuth },
} = require('../config/keys');

const randomHexGenerator = require('./../helper/others.helper').generateRandomHexString;
const bcrypt = require('bcryptjs');
const userSch = require('./../modules/user/userSchema');

const emailHelper = require('./email.helper');
const renderMail = require('./../modules/template/templateController').internal;
const settingSch = require('../modules/setting/settingSchema');


module.exports = async(passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  const isFacebookAuth = await settingSch.findOne({key:'allow_facebook_login'},{value:1,_id:0});
  const isGoogleAuth = await settingSch.findOne({key:'allow_google_login'},{value:1,_id:0});
  
  if (isGoogleAuth.value == true) {
    const GoogleTokenStrategy = require('passport-google-token').Strategy;
    const client_id = await settingSch.findOne({key:'client_id'},{value:1,_id:0});
    const client_secret = await settingSch.findOne({key:'client_secret'},{value:1,_id:0});
    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: client_id.value,
          clientSecret: client_secret.value,
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
  if (isFacebookAuth== true) {
    const FacebookTokenStrategy = require('passport-facebook-token');
    const FACEBOOK_APP_ID = await settingSch.findOne({key:'app_id'},{value:1,_id:0});
    const FACEBOOK_APP_SECRET = await settingSch.findOne({key:'app_secret'},{value:1,_id:0});

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
