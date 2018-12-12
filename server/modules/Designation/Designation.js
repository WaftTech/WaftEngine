const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationschema = new Schema({
// id : { type: number, required: true },
//Id: { type: Schema.Types.ObjectId, required: true, ref: 'post' },
    Designation: { type: String, required: true },
    IsActive: { type: Boolean, required: true, default: false },
    Added_by: { type: Schema.Types.ObjectId, 
        //required: true
     },
    update_date: { type: Date, required: true, default: Date.now },
    IsDeleted: { type: Boolean, required: true, default: false },
    Deleted_by: { type: Schema.Types.ObjectId },
    Deleted_at: { Date }
});

module.exports = Designation = mongoose.model('Designation', designationschema )
