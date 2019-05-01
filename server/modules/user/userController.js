const users = require('./userShema');
const roles = require('../role/roleShema');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./userConfig');
const httpStatus = require('http-status');
const emailTemplate = require('../../helper/email-render-template');
const auth = require('../../helper/auth.helper');
const thirdPartyApiRequesterHelper = require('../../helper/apicall.helper');
const otherHelper = require('../../helper/others.helper');
const accessSch = require('../role/accessShema');
const moduleSch = require('../role/moduleShema');
const { secretOrKey, oauthConfig, tokenExpireTime } = require('../../config/keys');
const mailSender = require('./userMail');
const loginlogs = require('./loginlogs/loginlogController').internal;
const baseurl = require('./../../config//keys').baseURl;

const userController = {};

userController.CheckMail = async (req, res) => {
  let errors = {};
  const {
    body: { email },
  } = req;
  const user = await users.findOne({ email });
  const data = { email };
  if (!user) {
    errors.email = 'Mail not found';
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Mail found', null);
};

userController.GetAllUser = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
  let searchq;
  let sortq;
  let populate;
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
  searchq = { is_deleted: false };

  if (req.query.find_name) {
    searchq = { name: { $regex: req.query.find_name, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_email) {
    searchq = { email: { $regex: req.query.find_email, $options: 'i x' }, ...searchq };
  }
  selectq = 'name email avatar email_verified roles';

  populate = [{ path: 'roles', select: 'role_title' }];

  let datas = await otherHelper.getquerySendResponse(users, page, size, sortq, searchq, selectq, next, populate);

  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, config.gets, page, size, datas.totaldata);
};

userController.GetUserDetail = async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id, {
      email_verified: 1,
      roles: 1,
      name: 1,
      email: 1,
      avatar: 1,
      updated_at: 1,
    });
    const role = await roles.find({}, { role_title: 1, _id: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { users: user, roles: role }, null, config.get, null);
  } catch (err) {
    next(err);
  }
};

userController.Register = async (req, res) => {
  const user = await users.findOne({ email: req.body.email });
  if (user) {
    const errors = { email: 'Email already exists' };
    const data = { email: req.body.email };
    return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
  } else {
    const { name, email, password, gender } = req.body;
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    const newUser = new users({ name, email, avatar, password, gender });
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.email_verification_code = otherHelper.generateRandomHexString(12);
        newUser.email_verified = false;
        newUser.roles = ['5bf7ae90736db01f8fa21a24'];
        newUser.last_password_cahnage_date = new Date();
        const user = await newUser.save();
        mailSender.SendMailAtRegistration({
          email: newUser.email,
          name: newUser.name,
          gender: newUser.gender,
          _id: user._id,
          email_verification_code: newUser.email_verification_code,
        });
        // Create JWT payload
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          email_verified: user.email_verified,
          roles: user.roles,
          gender: user.gender,
        };
        // Sign Token
        jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime }, (err, token) => {
          const msg = config.registerUser;
          token = `Bearer ${token}`;
          return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, msg, token);
        });
      });
    });
  }
};
userController.RegisterFromAdmin = async (req, res, next) => {
  try {
    const user = await users.findOne({ email: req.body.email, is_deleted: false });
    if (user) {
      errors.email = 'Email already exists';
      const data = { email: req.body.email };
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
    } else {
      if (req.file && req.file[0]) {
        req.body.image = req.file;
      }
      const { name, email, password, date_of_birth, bio, location, phone, description, is_active, email_verified, roles, image, company_name, company_location, company_established, company_phone_no } = req.body;
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      const newUser = new User({ name, email, avatar, password, date_of_birth, bio, description, email_verified, is_active, roles, image, location, phone, company_name, company_location, company_established, company_phone_no });
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.email_verified = false;
          newUser.roles = roles;
          newUser.added_by = req.user.id;
          newUser.is_active = true;
          newUser.is_added_by_admin = true;
          const user = await newUser.save();
          const payload = {
            id: user._id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            email_verified: user.email_verified,
            roles: user.roles,
            gender: user.gender,
          };
          const msg = config.registerAdmin;
          return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, msg, null);
        });
      });
    }
  } catch (err) {
    return next(err);
  }
};
// multi-part
userController.UpdateUserDetail = async (req, res, next) => {
  try {
    const { name, date_of_birth, email_verified, roles, bio, description, phone, location, company_name, company_location, company_established, company_phone_no } = req.body;
    const id = req.params.id;

    let newdatas = { name, date_of_birth, email_verified, roles, bio, description, phone, location, company_name, company_location, company_established, company_phone_no, updated_at: new Date() };

    if (req.file) {
      newdatas.image = req.file;
    }

    const updateUser = await users.findByIdAndUpdate(id, { $set: newdatas });
    const msg = 'User Update Success';
    const msgfail = 'User not found';

    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, req.body, null, msg, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgfail, null);
    }
  } catch (err) {
    return next(err);
  }
};

userController.Verifymail = async (req, res) => {
  try {
    const {
      body: { email, code },
    } = req;
    const user = await users.findOne({ email, email_verification_code: code });
    const data = { email };
    console.log(user);
    if (!user) {
      errors.email = 'Invalid Verification Code';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    const d = await users.findByIdAndUpdate(user._id, { $set: { email_verified: true }, $unset: { email_verification_code: 1 } }, { new: true });
    // Create JWT payload
    const payload = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      email_verified: true,
      roles: user.roles,
      gender: user.gender,
    };
    // Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime }, (err, token) => {
      const msg = config.emailVerify;
      token = `Bearer ${token}`;
      return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, msg, token);
    });
  } catch (err) {
    next(err);
  }
};
userController.VerifyServerMail = async (req, res, next) => {
  try {
    const { id, code } = req.params;
    const user = await users.findOne({ _id: id, email_verification_code: code });
    if (!user) {
      return res.redirect(302, 'http://localhost:5050?verify=false');
    }
    const d = await users.findByIdAndUpdate(user._id, { $set: { email_verified: true }, $unset: { email_verification_code: 1 } }, { new: true });
    const payload = {
      id: user._id,
      iss: 'http://localhost:5050',
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      email_verified: true,
      roles: user.roles,
      gender: user.gender,
    };
    // Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime }, (err, token) => {
      const msg = config.emailVerify;
      token = `${token}`;

      res.cookie('token', token); // add cookie here
      res.cookie('email', user.email); // add cookie here
      return res.redirect(302, 'http://localhost:5050?verify=true');
    });
  } catch (err) {
    next(err);
  }
};

userController.ForgotPassword = async (req, res, next) => {
  try {
    const {
      body: { email },
    } = req;
    const errors = {};
    const user = await users.findOne({ email });
    const data = { email };
    if (!user) {
      errors.email = 'Email not found';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    user.password_reset_code = otherHelper.generateRandomHexString(6);
    user.password_reset_request_date = new Date();
    let mailOptions = {
      from: '"Waft Engine"  <test@mkmpvtltd.tk>', // sender address
      to: email, // list of receivers
      subject: 'Password reset request', // Subject line
      text: `Dear ${user.name} . use ${user.password_reset_code} code to reset password`,
    };
    const tempalte_path = `${__dirname}/../../email/template/passwordreset.pug`;
    const dataTemplate = { name: user.name, email: user.email, code: user.password_reset_code };
    emailTemplate.render(tempalte_path, dataTemplate, mailOptions);
    const update = await users.findByIdAndUpdate(
      user._id,
      {
        $set: {
          password_reset_code: user.password_reset_code,
          password_reset_request_date: user.password_reset_request_date,
        },
      },
      { new: true },
    );
    const msg = `Password Reset Code For<b> ${email} </b> is sent to email`;
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, msg, null);
  } catch (err) {
    next(err);
  }
};

userController.ResetPassword = async (req, res, next) => {
  try {
    const {
      body: { email, code, password },
    } = req;
    const user = await users.findOne({ email, password_reset_code: code });
    const data = { email };
    const errors = {};
    if (!user) {
      errors.email = 'Invalid Password Reset Code';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    let salt = await bcrypt.genSalt(10);
    let hashpw = await bcrypt.hash(password, salt);
    const d = await users.findByIdAndUpdate(user._id, { $set: { password: hashpw, last_password_change_date: Date.now() } }, { $unset: { password_reset_code: 1, password_reset_request_date: 1 } }, { new: true });
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
      return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, msg, token);
    });
  } catch (err) {
    return next(err);
  }
};

userController.Login = async (req, res, next) => {
  try {
    let errors = {};
    const {
      body: { email, password },
    } = req;
    users
      .findOne({
        email,
      })
      .then(user => {
        if (!user) {
          errors.email = 'User not found';
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, errors, errors.email, null);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(async isMatch => {
          if (isMatch) {
            // User Matched
            let accesses = await accessSch.find({ role_id: user.roles, is_active: true }, { access_type: 1, _id: 0 });

            let routes = [];
            if (accesses && accesses.length) {
              const access = accesses.map(a => a.access_type).reduce((acc, curr) => [...curr, ...acc]);
              const routers = await moduleSch.find({ 'path._id': access }, { 'path.admin_routes': 1, 'path.access_type': 1 });
              for (let i = 0; i < routers.length; i++) {
                for (let j = 0; j < routers[i].path.length; j++) {
                  // for (let k = 0; k < routers[i].Path[j].AdminRoutes.length; k++) {
                  routes.push(routers[i].path[j]);
                  // }
                }
              }
            }

            // routes = routes.map(a => a.AdminRoutes);
            // Create JWT payload
            const payload = {
              id: user._id,
              name: user.name,
              avatar: user.avatar,
              email: user.email,
              email_verified: user.email_verified,
              roles: user.roles,
              gender: user.gender,
            };
            // Sign Token
            jwt.sign(
              payload,
              secretOrKey,
              {
                expiresIn: tokenExpireTime,
              },
              (err, token) => {
                loginlogs.addloginlog(req, token, next);
                token = `Bearer ${token}`;
                console.log(token);
                payload.routes = routes;
                return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
              },
            );
          } else {
            errors.password = 'Password incorrect';
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.password, null);
          }
        });
      });
  } catch (err) {
    next(err);
  }
};

userController.Info = (req, res, next) => {
  return otherHelper.sendResponse(res, httpStatus.OK, true, req.user, null, null, null);
};
userController.GetProfile = async (req, res, next) => {
  try {
    const userProfile = await users.findById(req.user.id, 'name location date_of_birth phone bio description email added_at email_verified  company_name company_location company_established company_phone_no');
    return otherHelper.sendResponse(res, httpStatus.OK, true, userProfile, null, null, null);
  } catch (err) {
    next(err);
  }
};

userController.postProfile = async (req, res, next) => {
  try {
    const { name, date_of_birth, bio, description, phone, location, company_name, company_location, company_established, company_phone_no } = req.body;
    const updateUser = await users.findByIdAndUpdate(req.user.id, { $set: { name, date_of_birth, bio, description, phone, location, company_name, company_location, company_established, company_phone_no, updated_at: new Date() } }, { new: true });
    const msg = 'User Update Success';
    const msgfail = 'User not found.';
    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { name, date_of_birth, bio, description, phone, location, company_name, company_location, company_established, company_phone_no }, null, msg, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgfail, null);
    }
  } catch (err) {
    return next(err);
  }
};

userController.changePassword = async (req, res, next) => {
  try {
    let errors = {};
    const { oldPassword, newPassword } = req.body;
    const user = await users.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(newPassword, salt);
      const dbRes = await users.findByIdAndUpdate(req.user.id, { $set: { password: hash, last_password_cahnage_date: new Date() } }, { $new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Password Change Success', null);
    } else {
      errors.oldPassword = 'Old Password incorrect';
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, null, null);
    }
  } catch (err) {
    next(err);
  }
};

userController.GithubLogin = (req, res, next) => {};

userController.GoogleLogin = async (req, res, next) => {
  // console.log(req.params);
  if (req.params.access_token) {
    const dataObj = await userController.requestSocialOAuthApiDataHelper(req, next, oauthConfig.googleAuth.google_exchange_oauth_for_token_url, oauthConfig.googleAuth.google_scope_permissions, 'google');

    console.log(dataObj);
    if (dataObj && Object.keys(dataObj).length > 0) {
      otherHelper.sendResponse(res, httpStatus.OK, true, dataObj, null, 'Success', 'token');
    } else {
      otherHelper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, null, 'User information fetch failed', null, null);
    }
  } else {
    otherHelper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, null, 'Access Token Not Valid', null, null);
  }
};

userController.OauthCodeToToken = async (req, res, next) => {
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

userController.RequestSocialOAuthApiDataHelper = async (req, next, request_url, scope_permissions, type) => {
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

userController.loginGOath = async (req, res, next) => {
  const user = req.user;
  const payload = {
    id: user._id,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
    email_verified: user.email_verified,
    roles: user.roles,
    gender: user.gender,
  };

  let accesses = await accessSch.find({ role_id: user.roles, is_active: true }, { access_type: 1, _id: 0 });

  let routes = [];
  if (accesses && accesses.length) {
    const access = accesses.map(a => a.access_type).reduce((acc, curr) => [...curr, ...acc]);
    const routers = await moduleSch.find({ 'path._id': access }, { 'path.admin_routes': 1, 'path.access_type': 1 });
    for (let i = 0; i < routers.length; i++) {
      for (let j = 0; j < routers[i].path.length; j++) {
        // for (let k = 0; k < routers[i].Path[j].AdminRoutes.length; k++) {
        routes.push(routers[i].path[j]);
        // }
      }
    }
  }

  // Sign Token
  let token = jwt.sign(payload, secretOrKey, {
    expiresIn: tokenExpireTime,
  });
  await loginlogs.addloginlog(req, token, next);
  token = `Bearer ${token}`;
  payload.routes = routes;
  return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
};
module.exports = userController;
