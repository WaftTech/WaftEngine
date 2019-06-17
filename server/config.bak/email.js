module.exports = {
  smtp: {
    protocal: 'SMTP',
    email: '',
    password: '',
    server: '',
    port: ' ',
    secure: '',
    security: '',
  },
  channel: 'smtp', // ['smtp','mailgun','sendgrid']
  mailgun: {
    api_key: '',
    domain: '',
  },
  sendgrid: {
    api_key: '',
  },
};
