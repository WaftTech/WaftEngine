module.exports = {
  mongoURI: '',

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
    githubAuth: {
      ClientID: '',
      ClientSecret: '',
    },
  },
};
