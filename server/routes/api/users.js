const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../../modules/Users/UserController.js');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const validations = require('../../modules/Users/UserValidations');
/**
 * @route GET api/user/test
 * @description Tests users route
 * @access Public
 */
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users Works',
  }),
);

/**
 * @route GET api/user
 * @description Check user is returning user or new
 * @access Public
 */
router.get('/', authorization, authentication, user.getAllUser);

/**
 * @route GET api/user
 * @description Check user is returning user or new
 * @access Public
 */
router.get('/detail/:id', authorization, authentication, user.getUserDetail);
/**
 * @route GET api/user
 * @description Check user is returning user or new
 * @access Public
 */
router.post('/detail/:id', authorization, authentication, validations.sanitizeRegister, validations.validateRegisterInput, user.updateUserDetail);
/**
 * @route POST api/user
 * @description Check user is returning user or new
 * @access Public
 */
router.post('/', validations.sanitizeUserScan, validations.validateUserScanInput, user.checkMail);

/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/register', validations.sanitizeRegister, validations.validateRegisterInput, user.register);
/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/register/admin', authorization, validations.sanitizeLogin, validations.validateLoginInput, user.registerFromAdmin);

/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/verifymail', validations.sanitizeUserScan, validations.validateUserScanInput, user.verifymail);

/**
 * @route POST api/user/login
 * @description Login user / Returning JWT Token
 * @access Public
 */
router.post('/login', validations.sanitizeLogin, validations.validateLoginInput, user.login);

/**
 * @route POST api/user/forgotpassword
 * @description Forgot Password
 * @access Public
 */
router.post('/forgotpassword', validations.sanitizeUserScan, validations.validateUserScanInput, user.forgotPassword);

/**
 * @route POST api/user/resetpassword
 * @description Forgot Password
 * @access Public
 */
router.post('/resetpassword', validations.sanitizeLogin, validations.validateLoginInput, user.resetPassword);

/**
 * @route POST api/user/login/github
 * @description Login user using Github
 * @access Public
 */
router.post('/login/github/:access_token', validations.sanitizeLogin, validations.validateLoginInput, user.githubLogin);

/**
 * @route POST api/user/login/github
 * @description Login user using Github
 * @access Public
 */
router.post('/login/google/:access_token', user.oauthCodeToToken, user.googleLogin);

/**
 *
 *
 *
 */
router.get('/info', authorization, user.info);
router.get('/profile', authorization, user.getProfile);

module.exports = router;
