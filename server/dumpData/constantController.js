const mongoose = require('mongoose');
const assert = require('assert');
const fs = require('fs');
const users = require('../modules/user/userShema');
const roles = require('../modules/role/roleShema');
const contents = require('../modules/content/contentShema');
const media = require('../modules/media/mediaShema');
const modules = require('../modules/module/moduleShema');
const blogs = require('../modules/blog/blogShema');
const constantController = {};
const models = { blogs, contents, media, roles, users };
constantController.Respond = async (req, res, next) => {
  try {
    const files = fs.readdirSync(__dirname + '/dumps/');
    files.map(async file => {
      const fileString = fs.readFileSync(__dirname + '/dumps/' + file, 'utf-8');
      let fileRead = JSON.parse(fileString);
      let fileName = file.split('.', 1);
      console.log(`inserting ${fileName} data!!`);
      const data = await models[fileName].find();
      if (!data || data == '') {
        for (let i = 0; i < fileRead.length; i++) {
          const d = new models[fileName](fileRead[i]);
          await d.save();
        }
        console.log(`${fileName} data inserted!!`);
      }
    });
  } catch (err) {
    next(err);
  }
};
module.exports = constantController;
