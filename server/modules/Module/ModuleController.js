const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const moduleConfig = require('./config');
const moduleController = {};
const internal ={};
internal.checkField = (res, k, v)=>{
    const fieldTypes = Object.keys(moduleConfig.fieldType);
    if(!v.label){
        return otherHelper.sendResponse(res,HttpStatus.FAILED_DEPENDENCY,false,null,`${k} field must have label`);
    }if(!v.type){
        return otherHelper.sendResponse(res,HttpStatus.FAILED_DEPENDENCY,false,null,`${k} field must have type`);
    }else if (!fieldTypes.includes(v.type)){
        return otherHelper.sendResponse(res,HttpStatus.FAILED_DEPENDENCY,false,null,`${k} field must have valid type`);
    }
};
internal.checkSection = (res, k, v)=>{
    if(!v.name){
       return otherHelper.sendResponse(res,HttpStatus.FAILED_DEPENDENCY,false,null,"Section must have label name");
    }
    if(!v.layout){
       return otherHelper.sendResponse(res,HttpStatus.FAILED_DEPENDENCY,false,null,"Section must have layout selected");
    }else if (!moduleConfig.section.layout.includes(v.layout)){
        return otherHelper.sendResponse(res,HttpStatus.FAILED_DEPENDENCY,false,null,"Section must have valid layout selected");
    }
    if(v.fields && v.fields.length){
        v.fields.forEach((elem,index) =>{
            for (let [k1, v1] of Object.entries(elem)) {
                if(v1.type ==="Section"){
                    internal.checkSection(res,k1,v1);
                }else{
                    internal.checkField(res,k1,v1);
                }
            }
        });
    }else{
        return otherHelper.sendResponse(res,HttpStatus.FAILED_DEPENDENCY,false,null,"Section must have at least one field");
    }
};
moduleController.getFieldConfig = async(req,res,next)=>{
    return otherHelper.sendResponse(res,HttpStatus.OK,true,moduleConfig,null,'Module Config',null);
};
moduleController.validateModuleConfig = async(req,res,next)=>{
    try{
        const section = req.body.section;
        section.forEach((elem,index) => {
            for (let [k, v] of Object.entries(elem)) {
                if(v.type ==="Section"){
                    internal.checkSection(res,k,v);
                }else{
                    internal.checkField(res,k,v);
                }
            }
        });
        next();
    }catch(err){
        return err;
    }
};

moduleController.saveModuleConfig = async(req,res,next)=>{
    try{
        return otherHelper.sendResponse(res,HttpStatus.OK,true,req.body,null,`${req.params.name} Module Setting Saved`,null);
    }catch(err){
        return err;
    }
};
module.exports = moduleController;