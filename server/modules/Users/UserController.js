const User = require('./User');
const Roles = require('../Roles/role');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
// Load Input Validation
const validateUserScanInput = require('./validation/userScan');
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');
const emailTemplate = require('../../helper/email-render-template');
const auth = require('../../helper/auth.helper');
const thirdPartyApiRequesterHelper = require('../../helper/apicall.helper');
const otherHelper = require('../../helper/others.helper');
const AccessSch = require('../Roles/access');
const ModuleSch = require('../Roles/module');
const { secretOrKey, oauthConfig, tokenExpireTime } = require('../../config/keys');

const userController = {};

userController.checkMail = async (req, res) => {
  // Check validation
  const { errors, isValid } = validateUserScanInput(req.body);
  if (!isValid) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  }
  const {
    body: { email },
  } = req;
  const user = await User.findOne({ email });
  const data = { email };
  if (!user) {
    errors.email = 'Mail not found';
    return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, data, errors, errors.email, null);
  }
  return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Mail found', null);
};
userController.getAllUser = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
  let searchq;
  let sortq;
  let selectq;
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
    size = Math.abs(req.query.size);
  } else {
    size = size_default;
  }
  if (req.query.sort) {
    let sortfield = req.query.sort.slice(1);
    let sortby = req.query.sort.charAt(0);
    console.log(sortfield);
    if (sortby == 1 && !isNaN(sortby) && sortfield) {
      //one is ascending
      sortq = sortfield;
    } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
      //zero is descending
      sortq = '-' + sortfield;
    } else {
      sortq = '';
    }
  }
  searchq = { IsDeleted: false };

  if (req.query.find_name) {
    searchq = { name: { $regex: req.query.find_name, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_email) {
    searchq = { email: { $regex: req.query.find_email, $options: 'i x' }, ...searchq };
  }
  selectq = 'name name_nepali email permanentaddress tempaddress is_active avatar updated_at added_at added_by roles';

  populate = { path: 'roles', select: '_id RolesTitle' };

  let datas = await otherHelper.getquerySendResponse(User, page, size, sortq, searchq, selectq, next, populate);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, 'Registration data delivered successfully!!', page, size, datas.totaldata);

  // try {
  //   const users = await User.find({}, { email_verified: 1, roles: 1, name: 1, email: 1, avatar: 1, updated_at: 1 }).populate({ path: 'roles', select: '_id RolesTitle' });
  //   return otherHelper.sendResponse(res, HttpStatus.OK, true, users, null, 'User Get Success', null);
  // } catch (err) {
  //   next(err);
  // }
};
userController.getUserDetail = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id, IsDeleted: false }, 'name name_nepali email permanentaddress tempaddress is_active avatar updated_at added_at added_by roles').populate({ path: 'roles', select: '_id RolesTitle' });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, users, null, 'User Detail Get Success', null);
  } catch (err) {
    next(err);
  }
};

userController.register = async (req, res) => {
  if (user) {
    errors.email = 'Email already exists';
    const data = { email: req.body.email };
    return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, data, errors, errors.email, null);
  } else {
    const { name, email, password } = req.body;
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    const newUser = new User({ name, email, avatar, password });
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.email_verification_code = otherHelper.generateRandomHexString(6);
        newUser.email_verified = false;
        newUser.roles = ['5bf7ae90736db01f8fa21a24'];
        let mailOptions = {
          from: '"API Share Team" <test@mkmpvtltd.tk>', // sender address
          to: newUser.email, // list of receivers
          subject: 'User Register Successfully', // Subject line
          text: `Dear ${newUser.name} <br/> Welcome to our platform. use below code to verify email`,
        };
        const tempalte_path = `${__dirname}/../email/template/register.pug`;
        const data = {
          name: newUser.name,
          email: newUser.email,
          code: newUser.email_verification_code,
        };
        emailTemplate.render(tempalte_path, data, mailOptions);
        const user = await newUser.save();
        // Create JWT payload
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          email_verified: user.email_verified,
          roles: user.roles,
        };
        // Sign Token
        jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime }, (err, token) => {
          const msg = 'User Register Successfully, Use verification code sent to your email to verify email.';
          token = `Bearer ${token}`;
          return otherHelper.sendResponse(res, HttpStatus.OK, true, payload, null, msg, token);
        });
      });
    });
  }
};
userController.registerFromAdmin = async (req, res, next) => {
  try {
    // const { errors, isValid } = validateRegisterInput(req.body);
    // if (!isValid) {
    //   return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
    // }
    // const user = await User.findOne({ email: req.body.email });
    // if (user) {
    //   errors.email = 'Email already exists';
    //   const data = { email: req.body.email };
    //   return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, data, errors, errors.email, null);
    // } else {}
    /////const { name, password, roles,  } = req.body;
    //const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    req.body.avatar = req.files;
    const newUser = new User(req.body);
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.email_verified = false;
        newUser.added_by = req.user._id;
        newUser.is_added_by_admin = true;
        newUser.added_at = Date.now();
        const user = await newUser.save();
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          email_verified: user.email_verified,
          roles: user.roles,
        };
        const msg = 'User Register Successfully.';
        return otherHelper.sendResponse(res, HttpStatus.OK, true, payload, null, msg, null);
      });
    });
  } catch (err) {
    return next(err);
  }
};
userController.updateUserDetail = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.files;
    }
    const user = req.body;
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(id, { $set: user });
    const msg = 'User Update Success';
    return otherHelper.sendResponse(res, HttpStatus.OK, true, updateUser, null, msg, null);
  } catch (err) {
    return next(err);
  }
};

userController.verifymail = async (req, res) => {
  try {
    const { errors, isValid } = validateUserScanInput(req.body);
    if (!isValid) {
      return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, null, 'Validation Error.', null);
    }
    const {
      body: { email, code },
    } = req;
    const user = await User.findOne({ email, email_verification_code: code });
    const data = { email };
    console.log(user);
    if (!user) {
      errors.email = 'Invalid Verification Code';
      return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    const d = await User.findByIdAndUpdate(user._id, { $set: { email_verified: true }, $unset: { email_verification_code: 1 } }, { new: true });
    // Create JWT payload
    const payload = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      email_verified: true,
      roles: user.roles,
    };
    // Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime }, (err, token) => {
      const msg = `Emal Verified Succsfull`;
      token = `Bearer ${token}`;
      return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, msg, token);
    });
  } catch (err) {
    next(err);
  }
};

userController.forgotPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateUserScanInput(req.body);
    if (!isValid) {
      const msg = 'Validation Error.';
      return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, msg, null);
    }
    const {
      body: { email },
    } = req;
    const user = await User.findOne({ email });
    const data = { email };
    if (!user) {
      errors.email = 'Email not found';
      return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    user.password_reset_code = otherHelper.generateRandomHexString(6);
    user.password_reset_request_date = new Date();
    let mailOptions = {
      from: '"API Share Team" <test@mkmpvtltd.tk>', // sender address
      to: email, // list of receivers
      subject: 'Password reset request', // Subject line
      text: `Dear ${user.name} . use ${user.password_reset_code} code to reset password`,
    };
    const tempalte_path = `${__dirname}/../email/template/passwordreset.pug`;
    const dataTemplate = { name: user.name, email: user.email, code: user.password_reset_code };
    emailTemplate.render(tempalte_path, dataTemplate, mailOptions);
    const update = await User.findByIdAndUpdate(user._id, {
      $set: {
        password_reset_code: user.password_reset_code,
        password_reset_request_date: user.password_reset_request_date,
      },
    });
    const msg = `Password Reset Code For<b> ${email} </b> is sent to email`;
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, msg, null);
  } catch (err) {
    next(err);
  }
};

userController.resetPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateUserScanInput(req.body);
    if (!isValid) {
      return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, null, 'Validation Error.', null);
    }
    const {
      body: { email, code, password },
    } = req;
    const user = await User.findOne({ email, password_reset_code: code });
    const data = { email };
    if (!user) {
      errors.email = 'Invalid Password Reset Code';
      return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    const d = await User.findByIdAndUpdate(user._id, { $unset: { password_reset_code: 1, password_reset_request_date: 1 } }, { new: true });
    // Create JWT payload
    const payload = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      email_verified: user.email_verified,
      roles: user.roles,
    };
    // Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime }, (err, token) => {
      const msg = `Password Reset Success`;
      token = `Bearer ${token}`;
      return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, msg, token);
    });
  } catch (err) {
    return next(err);
  }
};

userController.login = async (req, res) => {
  // Check validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  }
  const {
    body: { email, password },
  } = req;
  User.findOne({
    email,
  }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, null, errors, errors.email, null);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(async isMatch => {
      if (isMatch) {
        // User Matched
        let accesses = await AccessSch.find({ RoleId: user.roles, IsActive: true }, { AccessType: 1, _id: 0 });
        const access = accesses.map(a => a.AccessType).reduce((acc, curr) => [...curr, ...acc]);
        console.log(access);
        const routers = await ModuleSch.find({ 'Path._id': access }, { 'Path.AdminRoutes': 1, 'Path.AccessType': 1 });
        let routes = [];
        for (let i = 0; i < routers.length; i++) {
          for (let j = 0; j < routers[i].Path.length; j++) {
            // for (let k = 0; k < routers[i].Path[j].AdminRoutes.length; k++) {
            routes.push(routers[i].Path[j]);
            // }
          }
        }
        // routes = routes.map(a => a.AdminRoutes);
        console.log(routes);
        // Create JWT payload
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          email_verified: user.email_verified,
          roles: user.roles,
          // access: access,
        };
        // Sign Token
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: tokenExpireTime,
          },
          (err, token) => {
            token = `Bearer ${token}`;
            console.log(token);
            payload.routes = routes;
            return otherHelper.sendResponse(res, HttpStatus.OK, true, payload, null, null, token);
          },
        );
      } else {
        errors.password = 'Password incorrect';
        return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, errors.password, null);
      }
    });
  });
};

userController.info = (req, res, next) => {
  return otherHelper.sendResponse(res, HttpStatus.OK, true, req.user, null, null, null);
};

userController.githubLogin = (req, res, next) => {};

userController.googleLogin = async (req, res, next) => {
  // console.log(req.params);
  if (req.params.access_token) {
    const dataObj = await userController.requestSocialOAuthApiDataHelper(req, next, oauthConfig.googleAuth.google_exchange_oauth_for_token_url, oauthConfig.googleAuth.google_scope_permissions, 'google');

    console.log(dataObj);
    if (dataObj && Object.keys(dataObj).length > 0) {
      otherHelper.sendResponse(res, HttpStatus.OK, true, dataObj, null, 'Success', 'token');
    } else {
      otherHelper.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, false, null, 'User information fetch failed', null, null);
    }
  } else {
    otherHelper.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, false, null, 'Access Token Not Valid', null, null);
  }
};

userController.oauthCodeToToken = async (req, res, next) => {
  let request_url = '';
  if (req.originalUrl.includes('linkedin')) {
  } else {
    request_url = `${oauthConfig.googleAuth.google_exchange_oauth_for_token_url}client_id=${oauthConfig.googleAuth.app_id}&client_secret=${oauthConfig.googleAuth.app_secret}&grant_type=authorization_code&code=${req.params.access_token}`;
  }
  const tokenInfo = await thirdPartyApiRequesterHelper.requestThirdPartyApi(req, request_url, null, next, 'POST');
  if (tokenInfo && tokenInfo.access_token) {
    req.params.access_token = tokenInfo.access_token;
    next();
  }
  next();
};
userController.requestSocialOAuthApiDataHelper = async (req, next, request_url, scope_permissions, type) => {
  try {
    if (req.params.access_token && req.params.access_token !== undefined) {
      const permissionsScope = scope_permissions && scope_permissions.length > 0 ? scope_permissions.join(',') : '';
      if (request_url.indexOf('%access_token%') > -1) {
        request_url = request_url.replace('%access_token%', req.params.access_token);
      }
      if (request_url.indexOf('%fields%') > -1) {
        request_url = request_url.replace('%fields%', moduleConfig.config.linkedin_fields.join(','));
      }
      let headers = null;
      // const randomToken = await hasher.generateRandomBytes(moduleConfig.config.twitterUniqueNonceLength);
      switch (type) {
        case 'facebook':
          if (permissionsScope !== '') {
            request_url += `&fields=${permissionsScope}&format=json&method=get&suppress_http_code=1`;
          }
          break;
        case 'google':
          if (permissionsScope !== '') {
            request_url += `&scope=${permissionsScope}`;
          }
          break;
        case 'linkedin':
          if (permissionsScope !== '') {
            request_url += `&scope=${permissionsScope}&format=json`;
          }
          // headers = {
          // 'x-li-format': 'json',
          // 'Authorization': `Bearer ${req.params.access_token}`
          // };
          break;
        case 'twitter':
          if (permissionsScope !== '') {
            request_url += `&scope=${permissionsScope}&format=json`;
          }
          const randomToken = await hasher.generateRandomBytes(moduleConfig.config.twitterUniqueNonceLength);
          const timestamp = Math.round(Date.now() / 1000);
          const oAuthSignature = _p.generateOAuthSignature(randomToken, timestamp, req.params.access_token);
          headers = {
            Authorization: `OAuth oauth_consumer_key="${moduleConfig.oauthConfig.twitter.app_id}", oauth_nonce="${moduleConfig.oauthConfig.twitter.app_id}_${randomToken}", oauth_signature="${oAuthSignature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${timestamp}", oauth_token="${
              req.params.access_token
            }", oauth_version="1.0"`,
          };
          break;
      }
      console.log(request_url);
      const dataObj = await thirdPartyApiRequesterHelper.requestThirdPartyApi(req, request_url, headers, next, null);
      console.log(dataObj);
      return dataObj && dataObj.error && Object.keys(dataObj.error).length > 0 ? null : dataObj && Object.keys(dataObj).length > 0 ? dataObj : null;
    }
    return null;
  } catch (err) {
    return next(err);
  }
};
module.exports = userController;
