const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateRegisterInput = require('../../modules/user/userValidations');

const loginlogs = require('../../modules/user/loginlogs/loginlogController').loginlogController;

const path = require('path');
const multer = require('multer');
const upload = multer({
  dest: 'public/user/',
  fileFilter: function(req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
  },
});

const userModule = require('../../modules/user/userController');
const { authorization, authentication, getClientInfo } = require('../../middleware/authentication.middleware');
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
 * @description Check user is returning user or new  || for admin
 * @access Public
 */
router.get('/', authorization, authentication, userModule.GetAllUser);

/**
 * @route GET api/user
 * @description Check user is returning user or new || for admin
 * @access Public
 */
router.get('/detail/:id', authorization, authentication, userModule.GetUserDetail);
/**
 * @route GET api/user
 * @description Check user is returning user or new || for admin
 * @access Public
 */
router.post('/detail/:id', authorization, authentication, upload.single('file'), validateRegisterInput.sanitizeUpdateProfile, validateRegisterInput.validateUpdateProfile, userModule.UpdateUserDetail);
/**
 * @route POST api/user
 * @description Check user is returning user or new
 * @access Public
 */
router.post('/', userModule.CheckMail);

/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/register', validateRegisterInput.sanitizeRegister, validateRegisterInput.validateRegisterInput, userModule.Register);

/**
 * @route POST api/user/register
 * @description Register user route || for admin
 * @access Public
 */
router.post('/register/admin', authorization, authentication, upload.single('file'), validateRegisterInput.sanitizeRegister, validateRegisterInput.validateRegisterInput, userModule.RegisterFromAdmin);

/**
 * @route POST api/user/register
 * @description Register user route
 * @access Public
 */
router.post('/verifymail', userModule.Verifymail);

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
router.post('/resetpassword', userModule.ResetPassword);

/**
 * @route POST api/user/changepassword
 * @description change Password
 * @access Public
 */
router.post('/changepassword', authorization, validateRegisterInput.validatechangePassword, userModule.changePassword);

/**
 * @route POST api/user/login/github
 * @description Login user using Github
 * @access Public
 */
router.post('/login/github/:access_token', userModule.GithubLogin);

/**
 * @route POST api/user/login/google
 * @description Login user using Google
 * @access Public
 */
router.post('/login/google/:access_token', userModule.OauthCodeToToken, userModule.GoogleLogin);

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
router.get('/loginlogs', authorization, loginlogs.getLogList);

/**
 * @route POST api/user/loginlogs/logout
 * @description remove token from loginlog
 * @access Private
 */
router.post('/loginlogs/logout', authorization, validateRegisterInput.validateLoginlogsLogut, loginlogs.removeToken);

/**
 * @route POST api/user/logout
 * @description remove token from loginlog
 * @access Public
 */
router.get('/logout', authorization, loginlogs.logout);

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
router.post('/profile', authorization, upload.single('file'), validateRegisterInput.sanitizeUpdateUserProfile, validateRegisterInput.validateUpdateUserProfile, userModule.postProfile);

module.exports = router;
