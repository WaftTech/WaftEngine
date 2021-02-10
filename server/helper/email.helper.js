'use strict';
const nodemailer = require('nodemailer');
const apiCall = require('./apicall.helper');
const settingsHelper = require('./settings.helper')



const sendMail = {};


sendMail.send = async (mailOptions, next) => {
  const emailChannel = await settingsHelper('email', 'email_channel')

  let mailgun;
  if (emailChannel === 'mailgun') {
    const mailgun_api_key = await settingsHelper('email', 'mailgun_api_key')
    const mailgun_domain = await settingsHelper('email', 'mailgun_domain')
    mailgun = require('mailgun-js')({ apiKey: mailgun_api_key, domain: mailgun_domain });
  }

  let sgMail;
  if (emailChannel === 'sendgrid') {
    sgMail = require('@sendgrid/mail');
  }

  if (emailChannel === 'mailgun') {
    mailgun.messages().send(mailOptions, function (error, info) {
      if (error) {
        return error;
      }
      return info;
    });
  }

  else if (emailChannel === 'sendblue') {
    const sendblue_sender_name = await settingsHelper('email', 'sendblue_sender_name')
    const sendblue_sender_email = await settingsHelper('email', 'sendblue_sender_email')
    const sendblue_api_key = await settingsHelper('email', 'sendblue_api_key')
    const body = { sender: { name: sendblue_sender_name, email: sendblue_sender_email }, to: [{ email: mailOptions.to }], htmlContent: mailOptions.html, textContent: mailOptions.text, subject: mailOptions.subject };
    apiCall.requestThirdPartyApi(null,
      'https://api.sendinblue.com/v3/smtp/email',
      {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': sendblue_api_key,
      },
      body,
      'POST',
      next
    );
  }

  else if (emailChannel === 'sendgrid') {
    const sendgrid_api_key = await settingsHelper('email', 'sendgrid_api_key')

    sgMail.setApiKey(sendgrid_api_key);
    return sgMail.send(mailOptions);
  }

  else if (emailChannel === 'smtp') {
    const host = await settingsHelper('email', 'smtp_server')
    const port1 = await settingsHelper('email', 'smtp_port')
    const secure = await settingsHelper('email', 'smtp_secure')
    const user = await settingsHelper('email', 'smtp_email')
    const pass = await settingsHelper('email', 'smtp_password')
    const transporter = nodemailer.createTransport({
      host: host,
      port: port1,
      secure: secure,// true for 465, false for other ports
      auth: {
        user: user, // generated ethereal user
        pass: pass, // generated ethereal password
      },
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      return info;
    });
  }

  else if (emailChannel === 'waft') {
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
