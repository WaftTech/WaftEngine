'use strict';
const nodemailer = require('nodemailer');
const pug = require('pug');

const emailHemper = require('./email.helper');

const emailTemplate = {};

emailTemplate.render = async (template, data, mailOption) => {
    const compiledFunction = pug.compileFile(template);
    const emailHtml = compiledFunction(data);
    mailOption.html = emailHtml;
    return emailHemper.send(mailOption);
}
module.exports = emailTemplate;