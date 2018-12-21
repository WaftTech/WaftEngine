const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationListSchema = new Schema({
  RegistrationDate: {
    type: Date,
  }
})