module.exports = {
  mongoURI: '',
  recaptcha: { secretKey: '', siteKey: '' },
  secretOrKey: 'jwtsecret',
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
