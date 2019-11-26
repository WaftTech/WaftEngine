const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: { type:String , required:true},
    date_of_birth: {type:Date,required:true},
    email: {type:String , required:true },
    position: {type:String,required:true },
    skills: { type: [String] , required:true },
    gender : {type:String,required:true,enum: ['male' , 'female' , 'other']},
    description : {type: String,required:true },
    added_at : {type: Date , default: Date.now },
    added_by : {type: Schema.Types.ObjectId , ref:'users'},
    updated_at: {type:Date , default:Date.now},
    updated_by : {type:Schema.Types.ObjectId , ref: 'users'},
    deleted_by : {type:Schema.Types.ObjectId , ref:'users' },
    is_deleted : {type:Boolean, default: false}
});

module.exports = Team = mongoose.model('Team' , teamSchema);