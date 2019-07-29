module.exports = {
  smtp: {
    protocal: '',
    email: '',
    password: '',
    server: '',
    port: ' ',
    secure: true,
    security: '',
  },
  channel: 'waft', // ['waft','smtp','mailgun','sendgrid'] // waft : no need to confuger any thing and email is sent from contact@waftengine.org
  mailgun: {
    api_key: '',
    domain: '',
  },
  sendgrid: {
    api_key: '',
  },
};