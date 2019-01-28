const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  Offer_In: { type: String, required: true },
  Offer_Link: { type: String, required: true },
  Eligibility: { type: String, required: false },
  Discount: { type: String, required: true, default: false },
  CouponCode: { type: String, required: false },
  Tags: { type: [String], required: false },
  Image: { type: Schema.Types.Mixed, required: false },
  From: { type: Date, required: false },
  To: { type: Date, required: false },
  Type: { type: String, required: false, enum: ['Coupon', 'Offer', 'Discount', 'Cashback', 'Scratchcard'] },
  Description: { type: String, required: false },
  SlugURL: { type: String, required: true, unique: true },
  Company: { type: Schema.Types.ObjectId, required: true, ref: 'company' },
  IsOnline: { type: Boolean, required: true, default: true },
  IsActive: { type: String, required: true, default: true },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_at: { type: Date, required: false },
  Deleted_by: { type: Schema.Types.ObjectId, required: false },
  Added_at: { type: Date, default: Date.now },
  Added_by: { type: Schema.Types.ObjectId, required: false },
});

module.exports = Offer = mongoose.model('offer', OfferSchema);
