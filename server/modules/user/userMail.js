const emailTemplate = require('../../helper/email-render-template');
const userMailer = {};

userMailer.SendMailAtRegistration = async user => {
  let mailOptions = {
    from: '"Ask 4 Trip" <test@mkmpvtltd.tk>', // sender address
    to: user.email, // list of receivers
    subject: 'User Register Successfully', // Subject line
    text: `Dear ${user.name} <br/>Please verify your email`,
  };
  const tempalte_path = `${__dirname}/../../email/template/register.pug`;
  const data = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    code: `http://localhost:5010/verify/email/${user._id}/${user.email_verification_code}`,
    supportmail: 'support@ask4trip.com',
  };
  emailTemplate.render(tempalte_path, data, mailOptions);
};

module.exports = userMailer;
