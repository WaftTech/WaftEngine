const mongoose = require('mongoose');

let schema = mongoose.Schema;

const registrationSchema = new schema({
    RegisterDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    RegistrationNo: {
        type: String,
        required: true,
        unique: true
    },
    Subject: {
        type: String,
        required:  true
    },
    SenderName: {
        type: String,
        required: true
    },
    ReceiverName: {
        type: String,
        required: true
    },
    Remarks: {
        type: String
    },
    Docuname: {
        type: schema.Types.Mixed
    },
    Added_by: {
        type: schema.Types.ObjectId,
        required: true, ref: 'users'
    },
    Added_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false,
        required:true
    },
    Deleted_by: {
        type: schema.Types.ObjectId,
    },
    Deleted_at :{
        type: Date
    }

});

let registrationModel = mongoose.model('registration', registrationSchema);

module.exports = registrationModel;