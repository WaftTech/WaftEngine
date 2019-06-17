module.exports = {
  mongoURI: '', //mongoURI: 'mongodb://localhost:27017/waft-engine',

  recaptcha: { secretKey: '', siteKey: '' },
  secretOrKey: '',
  tokenExpireTime: 360000,

  oauthConfig: {
    googleAuth: {
      client_id: '',
      client_secret: '',
    },
    facebookAuth: {
      FACEBOOK_APP_ID: '',
      FACEBOOK_APP_SECRET: '',
    },
  },
};
