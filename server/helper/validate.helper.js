const isEmpty = require('../validation/isEmpty');
const Validator = require('validator');

const validationHelper = {};

// validationHelper.validate = (data, errmsg, condition, errmsg2) => {
//   // let data = req.body[field];
//   // console.log(data);

//   let errors = {};

//   data = !isEmpty(data) ? data : '';
//   if (condition) {
//     !Validator.isLength(data, condition) ? (errors[data] = errmsg2) : null;
//     Validator.isEmpty(data) ? (errors[data] = errmsg) : null;
//   } else {
//     Validator.isEmpty(data) ? (errors[data] = errmsg) : null;
//   }

//   if (!isEmpty(errors)) {
//     return errors;
//   } else {
//     return true;
//   }
// };

// validationHelper.validateArray = datas => {
//   const errors = [];
//   //console.log("length of array: ", datas.length);

//   for (i = 0; i < datas.length; i++) {
//     let keys = Object.keys(datas[i]).length;
//     //console.log("keys: ",keys);
//     if (keys == 2) {
//       let er = validationHelper.validate(datas[i].data, datas[i].message);
//       // console.log("error :",er);
//       if (er != true) {
//         errors.push(er);
//       }
//     } else {
//       let er = validationHelper.validate(datas[i].data, datas[i].message, datas[i].condition, datas[i].message2);
//       // console.log("error :",er);
//       if (er != true) {
//         errors.push(er);
//       }
//     }
//   }
//   return errors;
// };
validationHelper.Designation = (data, val) => {
  const errors = {};

  for (i = 0; i < val.length; i++) {
    // console.log('validation length: ', val.length);
    let field = val[i].field;
    let validate = val[i].validate;
    data[field] = !isEmpty(data[field]) ? data[field] : '';
    console.log('data is(from validate.helper):', data[field]);

    for (j = 0; j < validate.length; j++) {
      console.log('validate length: ', validate.length);
      console.log('validate condition: ', validate[j].condition);
      if (validate[j].condition == 'IsEmpty') {
        Validator.isEmpty(data[field]) ? (errors[field] = validate[j].msg) : null;
      } /*else if (validate[j].condition == 'IsDate') {
      !Validator.isISO8601(data[field]) ? (errors[field] = validate[j].msg) : null;
    } */ else if (validate[j].condition == 'MinMaxCheck') {
        let option = validate[j].options;
        console.log('option: ', option);
        !Validator.isLength(data[field], option) ? (errors[field] = validate[j].msg) : null;
      }
    }
  }
  return errors;
};

validationHelper.validate = (data, val) => {
  const errors = {};

  for (i = 0; i < val.length; i++) {
    // console.log('validation length: ', val.length);
    let field = val[i].field;
    let validate = val[i].validate;
    data[field] = !isEmpty(data[field]) ? data[field] : '';
    console.log('data is(from validate.helper):', data[field]);

    for (j = 0; j < validate.length; j++) {
      //console.log('validate length: ', validate.length);
      //console.log('validate condition: ', validate[j].condition);
      if (validate[j].condition == 'IsEmpty') {
        Validator.isEmpty(data[field]) ? (errors[field] = validate[j].msg) : null;
      } else if (validate[j].condition == 'IsDate') {
        !Validator.isISO8601(data[field]) ? (errors[field] = validate[j].msg) : null;
      } else if (validate[j].condition == 'MinCheck') {
        let option = validate[j].options;
        console.log('option: ', option);
        !Validator.isLength(data[field], option) ? (errors[field] = validate[j].msg) : null;
      }
    }
  }
  return errors;
};

module.exports = validationHelper;
