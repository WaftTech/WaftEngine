const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const multer = require('multer');
const faqController = {};

const basepath = path.join(__dirname, '../../public');
// Reads text from the file asynchronously and returns a Promise.

faqController.GetFileAndFolder = async (req, res, next) => {
  try {
    const subpath = req.query.path || '';
    const datalist = await fsPromises.readdir(path.join(basepath, subpath), { withFileTypes: true });
    const dir = [];
    const file = [];
    datalist.map(item => {
      item.isDirectory() ? dir.push(item.name) : file.push(item.name);
    });
    otherHelper.sendResponse(res, httpStatus.OK, true, { dir, file });
  } catch (err) {
    next(err);
  }
};
faqController.uploadFiles = async (req, res, next) => {
  try {
    const subpath = req.query.path || '';
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(basepath, subpath));
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
      },
    });
    console.log('storage', storage);
    var upload = multer({ storage: storage });
    console.log('upload', upload);
    upload.single('file');
  } catch (err) {
    next(err);
  }
};
module.exports = faqController;
