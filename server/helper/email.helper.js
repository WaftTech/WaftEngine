'use strict';
const nodemailer = require('nodemailer');
const emailConf = require('../config/email');
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
sendMail.send = mailOptions => {
  if (emailConf.channel === 'mailgun') {
    mailgun.messages().send(mailOptions, function(error, info) {
      if (error) {
        return error;
      }
      return info;
    });
  } else if (emailConf.channel === 'sendgrid') {
    sgMail.setApiKey(emailConf.sendgrid.api_key);
    return sgMail.send(mailOptions);
  } else if (emailConf.channel === 'smtp') {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return error;
      }
      return info;
    });
  }
};
module.exports = sendMail;
