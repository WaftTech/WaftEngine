'use strict';
var crypto = require('crypto');

const otherHelper = {};

otherHelper.generateRandomHexString = (len) => {
    return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, len).toUpperCase(); // return required number of characters
};
otherHelper.sendResponse = (res,status,success,data,errors,msg,token)=>{
    const response = {};
    if(success!==null) response.success = success;
    if(data !== null) response.data = data;
    if(errors!== null) response.errors = errors;
    if(msg!==null) response.msg = msg;
    if(token!==null) response.token = token;
    return res.status(status).json(response);
};
module.exports = otherHelper;