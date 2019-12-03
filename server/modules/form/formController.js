const httpStatus = require('http-status');
const formSch = require('./formSchema');
const otherHelper = require('../../helper/others.helper');
const formConfig = require('./formConfig');
const formController = {};

formController.getForm = async(req, res, next) => {
    try{
        const {page,size,sortq,searchq,selectq,populate} = otherHelper.parseFilters(req,10,false);
        const datas = await otherHelper.getquerySendResponse(formSch,page,size,sortq,searchq,selectq,next,populate);
        return otherHelper.paginationSendResponse(res,httpStatus.OK,true,datas.data,formConfig.get,page,size,datas.totaldata);   
    }catch(err){
        next(err);
    }
}

formController.postForm = async(req, res, next) => {
    try{
        let form = req.body;
        if(form && form._id) {
           form.updated_by= req.user.id;
           form.updated_at = new Date(); 
           const update = await formSch.findByIdAndUpdate(form._id , {
               $set: form 
           } , {new:true});
           return otherHelper.sendResponse(res,httpStatus.OK, true, update, null, formConfig.save, null);
        }else{
            const invalidemail = await formSch.findOne({email : req.body.email});
            if(invalidemail) {
               const errors = {email: 'email already exists'};
               const data = { email: req.body.email };
               return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
            }
            form.added_by = req.user.id;
            const newform = new formSch(form);
            const formSave = await newform.save();
            return otherHelper.sendResponse(res,httpStatus.OK, true, formSave, null, formConfig.save, null);
        }

    }catch(err) {
        next(err);
    }
}

formController.deleteForm = async (req, res, next) => {
    try{
        const id = req.params.id;
        const form = await formSch.findByIdAndUpdate(id, {
            $set : {is_deleted:true , deleted_by:req.user.id , deleted_at: new Date()}
            }, {new:true});
        return otherHelper.sendResponse(res,httpStatus.OK,true,form,null,formConfig.delete,null);
    }catch(err) {
        next(err);
    }
    
}

formController.getFormDetail = async(req, res, next) => {
    try{
        const id = req.params.id;
        const form_detail = await formSch.findById(id);
        return otherHelper.sendResponse(res,httpStatus.OK,true,form_detail,null,formConfig.get,null);
    }catch(err) {
        next(err);
    }

}
module.exports = formController;