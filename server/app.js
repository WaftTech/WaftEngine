'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const hpp = require('hpp');
const validator = require('express-validator');
const HttpStatus = require('http-status');
const { mongoURI } = require('./config/keys');
const routes = require('./routes/index');
const otherHelper = require('./helper/others.helper');
const { AddErrorToLogs } = require('./modules/bug/bugController');

const auth = require('./helper/auth.helper');

const app = express();

//express-validator
app.use(validator());

auth(passport);
// Logger middleware
app.use(logger('dev'));

// Body parser middleware

// create application/json parser
app.use(bodyParser.json({ limit: '50mb' }));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
// protect against HTTP Parameter Pollution attacks
app.use(hpp());
//validate the post requests
app.use(validator());
//manage the object, array etc
// app.use(lodash());

app.use(
  cookieSession({
    name: 'session',
    keys: ['SECRECTKEY'],
    maxAge: 24 * 60 * 60 * 1000,
  }),
);
app.use(cookieParser());
app.use(
  '/public',
  express.static(path.join(__dirname, 'public'), {
    setHeaders: function(res, path, stat) {
      res.set('Content-Type', 'image/png');
    },
  }),
);
// app.use('/', express.static(path.join(__dirname, '../client-user/build')));

// DB Config
mongoose.Promise = global.Promise;

// Database Connection
// mongoose.connect('mongodb://localhost/my_database');
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true ,
      useCreateIndex: true },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CORS setup for dev
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
  next();
});

// Use Routes
// app.use(app.router);
// routes.initialize(app);
app.use('/api', routes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, null, err, 'Route Not Found', null);
  } else {
    console.log('\x1b[41m', err);
    AddErrorToLogs(req, res, next, err);
    return otherHelper.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, false, null, err, null, null);
  }
  // res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: app.get('env') === 'development' ? err : {},
  // });
});

module.exports = app;
