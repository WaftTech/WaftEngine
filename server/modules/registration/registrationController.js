const HttpStatus = require('http-status');
//var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const registrationModel = require('./registration');
const registrationController = {};


registrationController.saveData = async(req, res, next)=>{
    try{
        let data = req.body;
        data.Added_by = req.user.id;
        if(data._id){
            if(req.files && req.files[0]){
                data.Docuname = req.files
            }
            let updated = await registrationModel.findByIdAndUpdate(data._id, data);
            return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null , 'Registration updated!!!', null);

        }
        else{
            //checking if registration no exists
            let status = await registrationModel.findOne({RegistrationNo: data.RegistrationNo});
            if( status != null){
                return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, null,"duplicate registration number", null);
            }
            else{
                data.Docuname = req.files;
                let newdata = new registrationModel(data);
                let saved = await newdata.save();
                return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, 'Registration successful!!', null);
            }
        }   
    }catch(err){
        next(err);
    }
};

registrationController.getData = async(req, res, next)=>{
    try{
         let data = await registrationModel.find({IsDeleted: false},{IsDeleted:0,Deleted_by:0,Deleted_at:0});
        return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Registration data delivered successfully!!', null);

    }catch(err){
        next(err);
    }

};

registrationController.getDataByID =  async(req, res, next)=>{
    try{
        let data = await registrationModel.findById(req.params.id);
        return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Registration data in detail delivered successfully!!', null);
    }catch(err){
        next(err);
    }
};

registrationController.deleteById = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const data = await registrationModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
        //const data = await registrationModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_by: "5c0a208c5389c90f64d537fa", Deleted_at: new Date() } });
        return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Registration delete Success !!', null);

    }catch(err){
        next(err);
    }
};


module.exports = registrationController;

