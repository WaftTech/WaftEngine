'use strict';
const nodemailer = require('nodemailer');
const emailConf = require('../config/email')

const sendMail = {};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: emailConf.server,
    port: emailConf.port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: emailConf.email, // generated ethereal user
        pass: emailConf.password // generated ethereal password
    }
});

// send mail with defined transport object
sendMail.send = (mailOptions) => {
    console.log("MailView",mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return error
        }
        return info;
    });
}
module.exports = sendMail;