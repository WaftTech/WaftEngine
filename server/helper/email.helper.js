'use strict';
const nodemailer = require('nodemailer');
const emailConf = require('../config/email');
const mailgun = require('mailgun-js')({ apiKey: emailConf.mailgun.api_key, domain: emailConf.mailgun.domain });

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
  console.log('MailView', mailOptions);
  if (emailConf.channel === 'mailgun') {
    mailgun.messages().send(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        return error;
      }
      return info;
    });
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
