module.exports = {
  mongoURI: 'mongodb://waftAdmin:waftAdmin1@ds155164.mlab.com:55164/waft-engine',
  //mongoURI: 'mongodb://localhost:27017/waft-engine',

  //mongoURI: 'mongodb://waft-engine:waft-engine@localhost:27017/waft-engine',
  recaptcha: { secretKey: '1717', siteKey: '171717'},
  secretOrKey: 'jwtsecret',
  tokenExpireTime: 360000,

  oauthConfig: {
    googleAuth: {
      app_id: '97859517140-j5314l26rikte0e4q2150ph45ghdm0vl.apps.googleusercontent.com',
      app_secret: 'w7X0VC_VZX65JuPRlY3owt7h',
      callback_url: 'http://localhost:3333/auth/google/callback',
      google_exchange_oauth_for_token_url: 'https://www.googleapis.com/oauth2/v4/token?',
      google_scope_permissions: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me', 'email', 'profile'],
    },
    githubAuth: {
      ClientID: 'e578c1b3a9fa9de597f0',
      ClientSecret: 'e365a7901613b246b55dc9d041960191d5e7b6f0',
    },
  },
};
