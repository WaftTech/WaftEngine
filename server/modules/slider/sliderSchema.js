const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sliderSchema = new schema({
  slider_name: {
    type: String,
    required: true,
  },
  slider_key: {
    type: String,
    required: true,
    unique: true,
  },
  slug_url: {
    type: String,
  },
  images: [
    {
      image: {
        type: schema.Types.ObjectId,
        ref: 'media',
      },
      caption: {
        type: String,
      },
    },
  ],
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  added_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Slider = mongoose.model('slider', sliderSchema);
