const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    full_name : { type:String,required:true },
    email: { type:String,required:true},
    mobile: { type:Number , required:true},
    is_identified : {type:Boolean , required:true},
    type_of_property : {type:String , required:true},
    looking_for_city : {type:String , required:true},
    resident_status : {type:String, required:true},
    employment_type: {type:String , required:true},
    monthly_income: {type:Number, required:true},
    is_co_borrower : {type:Boolean , required:true},
    is_active:{type:Boolean , default:true} , 
    added_at : {type: Date , default:new Date() },
    added_by : {type: Schema.Types.ObjectId , ref:'users'},
    updated_at: {type:Date },
    updated_by : {type:Schema.Types.ObjectId , ref: 'users'},
    deleted_by : {type:Schema.Types.ObjectId , ref:'users' },
    deleted_at : { type:Date},
    is_deleted : {type:Boolean, default: false}
});

module.exports = Form = mongoose.model('form',formSchema);