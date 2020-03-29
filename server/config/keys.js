module.exports = {
  mongoURI: 'mongodb://wafttech:abcd#1234@ds155164.mlab.com:55164/waft-engine',
  // mongoURI: 'mongodb://localhost:27017/waftengine',
  // mongoURI: 'mongodb://waftEngineUser:waftEngineUserPassword@waft-engine-mongo:27017/waft_engine',
  recaptcha: { secretKey: '6LftqoQUAAAAAMVlFvpMkX-UUErRzIxru2y2-zWG', siteKey: '6LftqoQUAAAAAOnGULHOWhdUACVQYeHFggJdRojU' },
  secretOrKey: 'jwtsecret',
  tokenExpireTime: 360000,
  isOauthConfig: { isGoogleAuth: false, isFacebookAuth: false, isGithubAuth: false },
  oauthConfig: {
    googleAuth: {
      client_id: '207794996947-iektn9irtbmkrbpfvlom9rf8nro13v70.apps.googleusercontent.com',
      client_secret: 'orIG3V40y4lCDC14869UEzwS',
    },
    facebookAuth: {
      FACEBOOK_APP_ID: '308391736756480',
      FACEBOOK_APP_SECRET: '293741164a98e9378bf6552a169c3c86',
    },
    githubAuth: {
      ClientID: 'e578c1b3a9fa9de597f0',
      ClientSecret: 'e365a7901613b246b55dc9d041960191d5e7b6f0',
    },
  },
};
