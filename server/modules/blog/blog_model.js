const mongoose = require("mongoose");

let schema = mongoose.Schema;

const blog_schema = new schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    required: true
    //default : Date.now
  },
  publisher: {
    type: String,
    required: true
  },
  publish_status: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String]
  },
  link: {
    type: String,
    required: true
  },
  images: {
    type: [schema.Types.Mixed]
  }
});

const blog_model = mongoose.model("blog", blog_schema);

module.exports = blog_model;
