const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  key:{
    type:String,
    unique: true,
    required: true
  },
  value:{
    type:Schema.Types.Mixed
  },
  addedBy: { 
    type: Schema.Types.ObjectId, 
    requires: true, 
    ref: 'users' 
  },

  addedDate: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users' 
  },
  updatedAt: {
    type: Date,
  },
});

const settings = mongoose.model('settings', settingsSchema);

module.exports = settings;