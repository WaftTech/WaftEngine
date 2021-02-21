
const settingSch = require('../modules/setting/settingSchema')
const NodeCache = require("node-cache");
const myCache = new NodeCache();

module.exports = async (type, sub_type, key) => {

  const temp = type + '_' + sub_type + '_' + key
  if (type == '##$##' && sub_type == '##$##') {
    const delKey = key.type + '_' + key.sub_type + '_' + key.key
    if (myCache.has(delKey)) {
      myCache.del(delKey)
    }
  }
  const value = myCache.get(temp);
  if (value == undefined) {
    const setting = await settingSch.findOne({ key: key, type: type, sub_type: sub_type }, { value: 1, key: 1, _id: 0 }).lean();
    if (setting) {
      myCache.set(temp, setting.value)
      return setting.value;
    } else {
      return null
    }
  } else {
    return value
  }
};
