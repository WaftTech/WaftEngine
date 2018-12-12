const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { slugify } = require('../../helper/others.helper');

const BlogSchema = new Schema({
    BlogTitle: { type: String, required: true},
    Description: { type: String, required: true},
    IsActive: { type: Boolean, required: true, default: false},
    BlogImage: { type: Schema.Types.Mixed, required: false},
    IsDeleted: { type: Boolean, required: true, default: false},
    Deleted_at: { type: Date, required: false},
    Deleted_by: { type: Schema.Types.ObjectId, required: false},
    Added_by: { type: Schema.Types.ObjectId, required: false},
    Added_at: { type: Date, default: Date.now },
    Updated_by: { type: Schema.Types.ObjectId, required: false},
    Updated_at: { type: Date, default: Date.now }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);
