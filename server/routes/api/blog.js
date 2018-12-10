const express =  require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/blog/images' });

const blogModule = require('./../../modules/blog/blogController');

const _ = require('lodash');

const Validator = require('validator');
const HttpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');






router.get('/post', blogModule.getDefault);

router.post('/post', upload.array('file', 2),validateRegisterInput,  blogModule.savePost);

router.get('/post/:link', blogModule.getPost);

router.delete('/post/:link', blogModule.deletePost);

router.get('/publisher/:user', blogModule.getByPublisher);

//router.put('/post/:link', blogModule.updatePost);


/*async function validate(req, res, next){
  console.log("blog title: ", req.body.title);
    req.checkBody('title', "Enter valid title").exists().notEmpty();
    req.checkBody('content', "Enter valid text").exists().not().isEmpty();
    req.checkBody('last_updated', "Enter the last updated date").exists().not().isEmpty();
    req.checkBody('publisher', "Enter the publisher name").exists().not().isEmpty();
    req.checkBody('link', "Enter a unique link for the post").exists().notEmpty();
    var errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
    // let errormsg = errors.array().map(i => `'${i.param}' : ${i.msg}`).join(' ' );
    //errorsarray = errors.array();
    //console.log(errorsarray);
   
    let errormsgarray = _.map(errors.array(), "msg");
    let errormsg = _.uniq(errormsgarray);


    //res.send(errormsg);
    next(errormsg);
  } else {
    // normal processing here
    next();

  }

};*/

function  validateRegisterInput(req, res, next) {
  const data = req.body;
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';
  data.last_updated = !isEmpty(data.last_updated) ? data.last_updated : '';
  data.publisher = !isEmpty(data.publisher) ? data.publisher : '';
  data.link = !isEmpty(data.link) ? data.link : '';

  //!Validator.isLength(data.title, { min: 2, max: 30 }) ? (errors.name = 'Name must be between 2 to 30 characters') : null;
  //!Validator.isLength(data.password, { min: 6, max: 30 }) ? (errors.password = 'password must be atleast 6 characters, max limit 30 characters') : null;
  //!Validator.equals(data.password, data.password2) ? (errors.password2 = 'Passwords must match') : null;
  Validator.isEmpty(data.title) ? (errors.title = 'Title field is required') : null;
  Validator.isEmpty(data.content) ? (errors.content = 'Content field is required') : null;
  Validator.isEmpty(data.last_updated) ? (errors.last_updated = 'Last Updated is required') : null;
  Validator.isEmpty(data.publisher) ? (errors.publisher = 'Publisher field is required') : null;
  Validator.isEmpty(data.link) ? (errors.link = 'Link is required') : null;
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
  // return { errors, isValid: isEmpty(errors) };
  //next(errors);
};




module.exports = router;