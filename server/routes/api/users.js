const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../../modules/Users/UserController.js');
const authenticationMiddleware = require('../../middleware/authentication.middleware');
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
 * @route POST api/user
 * @description Check user is returning user or new
 * @access Public
 */
router.post('/', user.checkMail);

/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/register', user.register);

/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/verifymail', user.verifymail);

/**
 * @route POST api/user/login
 * @description Login user / Returning JWT Token
 * @access Public
 */
router.post('/login', user.login);

/**
 * @route POST api/user/forgotpassword
 * @description Forgot Password
 * @access Public
 */
router.post('/forgotpassword', user.forgotPassword);

/**
 * @route POST api/user/resetpassword
 * @description Forgot Password
 * @access Public
 */
router.post('/resetpassword', user.resetPassword);

/**
 * @route POST api/user/login/github
 * @description Login user using Github
 * @access Public
 */
router.post('/login/github/:access_token', user.githubLogin);

/**
 * @route POST api/user/login/github
 * @description Login user using Github
 * @access Public
 */
router.post(
  '/login/google/:access_token',
  user.oauthCodeToToken,
  user.googleLogin,
);

/**
 *
 *
 *
 */
router.get('/info', authenticationMiddleware.authorization, user.info);

module.exports = router;
