module.exports = {
  mongoURI: 'mongodb://corona:corona1@ds119640.mlab.com:19640/corona-app',
  recaptcha: { secretKey: '', siteKey: '' },
  secretOrKey: 'secretKey',
  tokenExpireTime: 360000,
  isOauthConfig: { isGoogleAuth: false, isFacebookAuth: false, isGithubAuth: false },
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
