const express = require('express');
const router = express.Router();
const _ = require('lodash');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');


const multar = require('multer');
const upload = multar({ dest: 'public/content/' });

const validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

const dModule = require('../../modules/word_press/wordpresscontroller');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/',dModule.GetContent);
router.post('/', upload.array('file',1),validatewordpressInput, dModule.SaveContent);
router.get('/:id', dModule.GetContentDetail);
router.delete('/:id', dModule.Deletewordpress);



async function validate(req, res, next){
    req.checkBody('heading',"Enter Valid Heading").exists().notEmpty();
    req.checkBody('title',"Enter valid Title").exists().notEmpty();
    req.checkBody('content',"Enter Content").exists().notEmpty();
    req.checkBody('domain',"Enter valid Domain").exists().notEmpty();
    var errors = await req.getValidationResult();

if (!errors.isEmpty()){

    let errormsgarray = _.map(errors.array(), "msg" );
    let errormsg = _.uniq(errormsgarray);

    next(errormsg);
    return;
}
    else{
        next();
    }

}
    function validatewordpressInput ( req, res, next){
        const data = req.body;
        let errors = {};
        console.log("inside validateWordpress")
    
        
       /* data.email = !isEmpty(data.email) ? data.email : '';
        !Validator.isEmail(data.email) ? (errors.email = 'Email is invalid') : null;
        Validator.isEmpty(data.email)
          ? (errors.email = 'Email field is required')
          : null;
      
        return { errors, isValid: isEmpty(errors) };
      };*/
      
      data.heading = !isEmpty(data.heading) ? data.heading : '';
      data.title = !isEmpty(data.title) ? data.title :'';
      data.content = !isEmpty(data.content) ? data.content : '';
      data.domain = !isEmpty(data.domain) ? data.domain : '';


      validator.isEmpty(data.heading) ? (errors.heading = 'Heading is invalid') : null;
      

      validator.isEmpty(data.title) ? (errors.title = 'title is invalid') : null;
      

      validator.isEmpty(data.content) ? (errors.content = 'content is invalid') : null;
     

      validator.isEmpty(data.domain) ? (errors.domain = 'domain is invalid') : null;
     

if (!isEmpty(errors)){
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false ,null, errors, 'validation Error.', null);

}
    else{
        next();
      
}
}

module.exports = router;
