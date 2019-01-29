const assert = require('assert');
const users = require('../modules/user/userShema');
const roles = require('../modules/role/roleShema');
const contents = require('../modules/content/contentShema');
const medias = require('../modules/media/mediaShema');
const modules = require('../modules/module/moduleShema');
const blogs = require('../modules/blog/blogShema');
const constants = require('./constants');
const constantController = {};
constantController.Respond = async (req, res, next) => {
  try {
    const user = await users.find();
    console.log('user', user);
    if (!(user || user !== '')) {
      console.log('inserting user data');
      users.collection.insertMany(constants.userData, (err, r) => {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);
        db.close();
      });
    }

    const role = await roles.find();
    if (!(role || role !== '')) {
      console.log('inserting role data');
      roles.collection.insertMany(constants.roleData, (err, r) => {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);
        db.close();
      });
    }
    const content = await contents.find();
    if (!(content || content !== '')) {
      console.log('inserting content data');
      contents.collection.insertMany(constants.contentData, (err, r) => {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);
        db.close();
      });
    }
    const blog = await blogs.find();
    if (!(blog || blog !== '')) {
      console.log('inserting blog data');
      blogs.collection.insertMany(constants.blogData, (err, r) => {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);
        db.close();
      });
    }
    const media = await medias.find();
    if (!(media || media !== '')) {
      console.log('inserting media data');
      medias.collection.insertMany(constants.mediaData, (err, r) => {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);
        db.close();
      });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = constantController;
