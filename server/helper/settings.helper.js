
const settingSch = require('../modules/setting/settingSchema')
module.exports = async key => {
  const setting = await settingSch.findOne({ key: key }, { value: 1, _id: 0 });
  return setting;
};