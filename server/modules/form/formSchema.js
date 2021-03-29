const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    full_name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    is_identified: { type: Boolean },
    type_of_property: { type: String },
    looking_for_city: { type: String },
    resident_status: { type: String },
    employment_type: { type: String },
    monthly_income: { type: Number },
    is_co_borrower: { type: Boolean },
    is_active: { type: Boolean, default: true },
    added_at: { type: Date, default: new Date() },
    added_by: { type: Schema.Types.ObjectId, ref: 'users' },
    updated_at: { type: Date },
    updated_by: { type: Schema.Types.ObjectId, ref: 'users' },
    deleted_by: { type: Schema.Types.ObjectId, ref: 'users' },
    deleted_at: { type: Date },
    is_deleted: { type: Boolean, default: false }
});

module.exports = Form = mongoose.model('form', formSchema);