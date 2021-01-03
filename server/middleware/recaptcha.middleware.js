const httpStatus = require('http-status');
const otherHelper = require('../helper/others.helper');
const apiCallHelper = require('../helper/apicall.helper');
const settingSch = require('../modules/setting/settingSchema');
// const {
//   recaptcha: { secretKey },
// //   recaptcha_mobile: { secretKey_mobile },
// //   recaptcha_ios: { secretKey_ios },
// } = require('../config/keys');
const reCaptchaValidator = {};

reCaptchaValidator.validate = async (req, res, next) => {
  try {
    let code = req.body.reCaptcha;
    let code_android = req.body.reCaptcha_android;
    let code_ios = req.body.reCaptcha_iOS;
    let secretKey = await settingSch.findOne({key:'captcha_secret_key'},{value:1 , _id:0});
    // let captcha_site_key = await settingSch.findOne({key:'captcha_site_key'},{value:1 , _id:0});
    let checkrecaptcha = await settingSch.findOne({key:'recaptcha_check'},{value:1 , _id:0});
    
    if(checkrecaptcha.value == false) {
        next();
    }else {
        if (code) {
            const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey.value}&response=${code}&remoteip=${req.connection.remoteAddress}`;
            let verified = await apiCallHelper.requestThirdPartyApi(verifyUrl, null, next, 'POST');
            if (!(verified && verified.success)) {
              return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human1', null);
            } else {
              next();
            }
          } else if (code_android) {
            const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey_mobile}&response=${code_android}&remoteip=${req.connection.remoteAddress}`;
            let verified = await apiCallHelper.requestThirdPartyApi(verifyUrl, null, next, 'POST');
            if (!(verified && verified.success)) {
              return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human2', null);
            } else {
              next();
            }
          } else if (code_ios) {
            const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey_ios}&response=${code_ios}&remoteip=${req.connection.remoteAddress}`;
            let verified = await apiCallHelper.requestThirdPartyApi(verifyUrl, null, next, 'POST');
            if (!(verified && verified.success)) {
              return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human3', null);
            } else {
              next();
            }
          } else {
            return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human4', null);
          }  
        }
     
  } catch (err) {
    return next(err);
  }
};

module.exports = reCaptchaValidator;
