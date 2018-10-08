const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kayvalueSchema = new Schema({ key: String,value:String });
const ApiSchema = new Schema({
  name: { type: String, required: true },
  version:{type:Number,require:true},
  method : { type: String, required: true, default:'GET',  enum : ['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD','CONNECT','TRACE']},
  url :[{type:String, required: true}],
  project :[{type:Schema.Types.ObjectId , ref: 'projects'}],
  body : { type: String },
  body_format :{type:String,require:true, default:'No Body', enum:['No Body','JSON','XML','Other','Binary File','Multipart']},
  header :[kayvalueSchema],
  query :[kayvalueSchema],
  auth :{type:String, default:'No Auth', enum:['No Auth','Basic','Bearer Token']},
  auth_value: {type:String},
  documentation: {type:String},
  history:[],
  response_body:{type:String},
  response_header:[kayvalueSchema],
  response_cookie:[kayvalueSchema],
  response_timeline:{type:String},
  added_by : { type: Schema.Types.ObjectId , ref: 'users' },
  added_on :{ type: Date },
  updated_at: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model('apis', ApiSchema);
