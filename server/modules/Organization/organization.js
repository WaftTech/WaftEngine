const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  Organization: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  Category: { type: String, required: true },
  PhoneNo: { type: String, required: true },
  OrganizationEmail: { type: String, required: true },
  OpenningDays: { type: [String] },
  OpenningTime: { type: String },
  State: { type: String, required: true },
  District: { type: String, required: true },
  VDCMunicipality: { type: String, required: true },
  StreetAddress: { type: String, required: true },
  Lattitude: { type: Schema.Types.Decimal128 },
  Longitude: { type: Schema.Types.Decimal128 },
  Services: { type: String, required: true },
  AboutOrganization: { type: String, required: true },
  FeatureofOrganization: { type: String, required: true },
  Website: { type: String },
  Links: { type: String },
  ProfileImage: { type: Schema.Types.Mixed, required: true },
  ProfileImage1: { type: Schema.Types.Mixed, required: true },
  IsVerified: { type: Boolean, required: true, default: false },
  IsActive: { type: Boolean, required: true, default: false },
  IsFeature: { type: Boolean, required: true, default: false },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);
