
const settingSch = require('../modules/setting/settingSchema')
module.exports = async (type, key) => {
  const setting = await settingSch.findOne({ key: key, type: type }, { value: 1, _id: 0 });
  return setting.value;
};