const isEmpty = require('../validation/isEmpty');
const Validator = require('validator');




const validationHelper ={};

validationHelper.validate = (req, field, errmsg, condition, errmsg2 )=>{
    let data = req.body[field];
    console.log(data);

    let errors = {};

    data = !isEmpty(data) ? data : '';
    if(condition){
        !Validator.isLength(data, condition) ? (errors[field] = errmsg2) : null;
        Validator.isEmpty(data) ? (errors[field] = errmsg) : null;

    }
    else {
        Validator.isEmpty(data) ? (errors[field] = errmsg) : null;
    }



    if (!isEmpty(errors)) {
       return errors;
      } else {
        return true;
      }

};


validationHelper.validateArray = (req, datas)=>{
    const errors = [];
    console.log("length of array: ", datas.length);


    for (i = 0; i<datas.length; i++){

        let keys = Object.keys(datas[i]).length;
        console.log("keys: ",keys);
        if(keys == 2){
            let er = validationHelper.validate(req, datas[i].field, datas[i].message);
            // console.log("error :",er);
             if(er !=true ){
                errors.push(er);
            }

        }
        else{
            let er = validationHelper.validate(req, datas[i].field, datas[i].message, datas[i].condition, datas[i].message2);
            // console.log("error :",er);
             if(er !=true ){
                errors.push(er);
            }

        }
    }
    return errors;




}




module.exports = validationHelper;
