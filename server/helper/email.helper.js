'use strict';
const nodemailer = require('nodemailer');
const emailConf = require('../config/email');
const apiCall = require('./apicall.helper');
let mailgun;
if (emailConf.channel === 'mailgun') {
  mailgun = require('mailgun-js')({ apiKey: emailConf.mailgun.api_key, domain: emailConf.mailgun.domain });
}
let sgMail;
if (emailConf.channel === 'sendgrid') {
  sgMail = require('@sendgrid/mail');
}

const sendMail = {};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: emailConf.smtp.server,
  port: emailConf.smtp.port,
  secure: emailConf.smtp.secure, // true for 465, false for other ports
  auth: {
    user: emailConf.smtp.email, // generated ethereal user
    pass: emailConf.smtp.password, // generated ethereal password
  },
});

// send mail with defined transport object
sendMail.send = (mailOptions, next) => {
  if (emailConf.channel === 'mailgun') {
    mailgun.messages().send(mailOptions, function (error, info) {
      if (error) {
        return error;
      }
      return info;
    });
  } else if (emailConf.channel === 'sendblue') {
    const body = { sender: { name: emailConf.sendblue.sender_name, email: emailConf.sendblue.sender_email }, to: [{ email: mailOptions.to }], htmlContent: mailOptions.html, textContent: mailOptions.text, subject: mailOptions.subject };
    apiCall.requestThirdPartyApi(null,
      'https://api.sendinblue.com/v3/smtp/email',
      {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': emailConf.sendblue.api_key,
      },
      body,
      'POST',
      next
    );
  } else if (emailConf.channel === 'sendgrid') {
    sgMail.setApiKey(emailConf.sendgrid.api_key);
    return sgMail.send(mailOptions);
  } else if (emailConf.channel === 'smtp') {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      return info;
    });
  } else if (emailConf.channel === 'waft') {
    apiCall.requestThirdPartyApi(null,
      'https://waftengine.org/api/mail',
      {
        'content-type': 'application/json',
      },
      mailOptions,
      'POST',
      next
    );
  }
};
module.exports = sendMail;
