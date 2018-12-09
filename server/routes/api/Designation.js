const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Designation/DesignationController');

const Validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

const HttpStatus = require('http-status');
const OtherHelper = require( '../../helper/others.helper' );


router.get('/', dModule.GetDesignation );

router.get('/:id', dModule.GetDesignationDetail );

router.post('/',validateDesignationInput, dModule.AddDesignation );

router.delete('/:id', dModule.DeleteDesignation );


function validateDesignationInput( req, res, next ){
    const data = req.body;
    let errors = {};


    data.Designation = !isEmpty(data.Designation) ? data.Designation : '';
    

      !validator.isEmpty(data.Designation) ? (errors.Designation = 'Designation is invalid') : null;
           

if (!isEmpty(errors)){
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false ,null, errors, 'validation Error.', null);

}
    else{
        next();
      
}
}



module.exports = router;

