module.exports = {
  mongoURI: 'mongodb://waftAdmin:waftAdmin1@ds155164.mlab.com:55164/waft-engine',
  //mongoURI: 'mongodb://localhost:27017/waft-engine',

  //mongoURI: 'mongodb://waft-engine:waft-engine@localhost:27017/waft-engine',
  recaptcha: { secretKey: '6LftqoQUAAAAAMVlFvpMkX-UUErRzIxru2y2-zWG', siteKey: '6LftqoQUAAAAAOnGULHOWhdUACVQYeHFggJdRojU' },
  secretOrKey: 'jwtsecret',
  tokenExpireTime: 360000,

  oauthConfig: {
    googleAuth: {
      client_id: '207794996947-iektn9irtbmkrbpfvlom9rf8nro13v70.apps.googleusercontent.com',
      project_id: 'fir-project-1366e',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_secret: 'orIG3V40y4lCDC14869UEzwS',
      redirect_uris: ['http://localhost:5050/api/user/callback/goauth/'],
    },
    githubAuth: {
      ClientID: 'e578c1b3a9fa9de597f0',
      ClientSecret: 'e365a7901613b246b55dc9d041960191d5e7b6f0',
    },
  },
};
