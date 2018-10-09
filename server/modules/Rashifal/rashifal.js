const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RashifalSchema = new Schema({
  RashifalType: { type: String, required: true, enum: ['Day', 'Week', 'Month', 'Year'] },
  Description: { type: String, required: false },
  PublishFrom: { type: Date, required: true },
  PublishTo: { type: Date, required: true },
  Aries: { type: String, required: true },
  Taurus: { type: String, required: true },
  Gemini: { type: String, required: true },
  Cancer: { type: String, required: true },
  Leo: { type: String, required: true },
  Virgo: { type: String, required: true },
  Libra: { type: String, required: true },
  Scorpio: { type: String, required: true },
  Sagittarius: { type: String, required: true },
  Capricorn: { type: String, required: true },
  Aquarius: { type: String, required: true },
  Pisces: { type: String, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Rashifal = mongoose.model('rashifal', RashifalSchema);
