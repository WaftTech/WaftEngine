const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateRegisterInput = require('../../modules/user/userValidations');

const loginLogs = require('../../modules/user/loginlogs/loginlogController').loginLogController;
const fileUpload = require('../../helper/upload.helper')('public/user/');
const uploader = fileUpload.uploader;
const userModule = require('../../modules/user/userController');
const { authorization, authorizationForLogout, authentication, getClientInfo } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, userModule.GetAllUser);

router.post('/', userModule.CheckMail);
/**
 * @route GET api/user/grby
 * @description Check user is returning user group by or new  || for admin
 * @access Public
 */
router.get('/grby', authorization, authentication, userModule.GetAllUserGroupBy);

router.get('/detail/:id', authorization, authentication, userModule.GetUserDetail);

router.post('/detail/:id', authorization, authentication, uploader.single('file'), validateRegisterInput.sanitizeUpdateProfile, validateRegisterInput.validateUpdateProfile, userModule.UpdateUserDetail);

/**
 * @route POST api/user/change
 * @description update basic information of user
 * @access User
 */
router.post('/change', authorization, validateRegisterInput.sanitizeAdd, validateRegisterInput.validateEdit, userModule.PostUser);

/**
 * @route POST api/user/changepw
 * @description Update user is returning user or new
 * @access Public
 */
router.post('/changepw', authorization, validateRegisterInput.sanitizeAdd, validateRegisterInput.validateAdd, userModule.PostUserPwd);

/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/register', validateRegisterInput.sanitizeRegister, validateRegisterInput.validateRegisterInput, getClientInfo, userModule.Register);

/**
 * @route POST api/user/login/google/
 * @description Register user route
 * @access Public
 */
router.post('/login/google/', getClientInfo, passport.authenticate('google-token'), userModule.loginGOath);

/**
 * @route POST api/user/login/facebook/
 * @description Register user route
 * @access Public
 */
router.post('/login/facebook/', getClientInfo, passport.authenticate('facebook-token'), userModule.loginGOath);
/**
 * @route POST api/user/login/github
 * @description Login user using Github
 * @access Public
 */
router.post('/login/github/', getClientInfo, passport.authenticate('github-token'), userModule.loginGOath);
/**
 * @route POST api/user/register/admin
 * @description Register user route || for admin
 * @access Public
 */
router.post('/register/admin', authorization, authentication, uploader.single('file'), validateRegisterInput.sanitizeRegister, validateRegisterInput.validateRegisterInput, userModule.RegisterFromAdmin);

/**
 * @route POST api/user/verifymail
 * @description Verify mail by user
 * @access Public
 */
router.post('/verifymail', getClientInfo, userModule.Verifymail);

/**
 * @route POST api/user/verifymail/resend
 * @description Resent Verify mail by user
 * @access Public
 */
router.post('/verifymail/resend', userModule.ResendVerificationCode);

/**
 * @route POST api/user/login
 * @description Login user / Returning JWT Token
 * @access Public
 */
router.post('/login', validateRegisterInput.sanitizeLogin, validateRegisterInput.validateLoginInput, getClientInfo, userModule.Login);

/**
 * @route POST api/user/forgotpassword
 * @description Forgot Password
 * @access Public
 */
router.post('/forgotpassword', userModule.ForgotPassword);

/**
 * @route POST api/user/resetpassword
 * @description Forgot Password
 * @access Public
 */
router.post('/resetpassword', getClientInfo, userModule.ResetPassword);

/**
 * @route POST api/user/changepassword
 * @description change Password
 * @access Public
 */
router.post('/changepassword', authorization, validateRegisterInput.validateChangePassword, userModule.changePassword);

/**
 * @route POST api/user/info
 * @description returns the user info
 * @access Public
 */
router.get('/info', authorization, userModule.Info);

/**
 * @route POST api/user/loginlogs
 * @description returns the loginlogs
 * @access Private
 */
router.get('/loginlogs', authorization, authentication, loginLogs.getLogList);

/**
 * @route POST api/user/loginlogs/logout
 * @description remove token from loginlog
 * @access Private
 */
router.post('/loginlogs/logout', authorization, validateRegisterInput.validateLogsLogoutAction, loginLogs.removeToken);

/**
 * @route POST api/user/logout
 * @description remove token from loginlog
 * @access Public
 */
router.get('/logout', authorizationForLogout, loginLogs.logout);

/**
 * @route GET api/user/profile
 * @description get user profile info
 * @access Public
 */
router.get('/profile', authorization, userModule.GetProfile);

/**
 * @route POST api/user/profile
 * @description POST user profile info
 * @access Public
 */
router.post('/profile', authorization, uploader.single('file'), validateRegisterInput.sanitizeUpdateUserProfile, validateRegisterInput.validateUpdateUserProfile, userModule.postProfile);

module.exports = router;
