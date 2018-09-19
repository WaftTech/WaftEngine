module.exports = {
  mongoURI: 'mongodb://api:api1docs@ds139841.mlab.com:39841/apidocs',
  secretOrKey: 'jwtsecret',
  tokenExpireTime:3600,

  oauthConfig: {
    googleAuth: {
      app_id: '97859517140-j5314l26rikte0e4q2150ph45ghdm0vl.apps.googleusercontent.com',
      app_secret: 'w7X0VC_VZX65JuPRlY3owt7h',
      callback_url: 'http://localhost:3333/auth/google/callback',
      google_exchange_oauth_for_token_url: "https://www.googleapis.com/oauth2/v4/token?",  
      google_scope_permissions: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me', 'email', 'profile'],

    },
    githubAuth: {
      ClientID: 'e578c1b3a9fa9de597f0',
      ClientSecret: 'e365a7901613b246b55dc9d041960191d5e7b6f0'
    }
  }
};