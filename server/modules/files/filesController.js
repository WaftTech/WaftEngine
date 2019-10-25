const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const fs = require('fs');
const fsPromises = fs.promises;
const paths = require('path');
const multer = require('multer');
const fileSch = require('./fileSchema');
const folderSch = require('./folderSchema');
const fileController = {};

const basepath = paths.join(__dirname, '../../public');
// Reads text from the file asynchronously and returns a Promise.

fileController.GetFileAndFolder = async (req, res, next) => {
  try {
    // const subpath = req.query.path || '';
    // const datalist = await fsPromises.readdir(path.join(basepath, subpath), { withFileTypes: true });
    // const dir = [];
    // const file = [];
    // datalist.map(item => {
    //   item.isDirectory() ? dir.push(item.name) : file.push(item.name);
    // });
    const file = await fileSch.find({ is_deleted: false }).populate({ path: 'folder_id', select: 'name path' });
    const folder = await folderSch.find({ is_deleted: false });
    const totalFile = file.length;
    const totalFolder = folder.length;
    otherHelper.sendResponse(res, httpStatus.OK, true, { folders: { data: folder, totaldata: totalFolder }, file: { data: file, totaldata: totalFile } }, null, 'files and folders get success!!', null);
  } catch (err) {
    next(err);
  }
};
fileController.UploadFiles = async (req, res, next) => {
  try {
    let data = {};
    const folder = await folderSch.findOne({ _id: req.body.folder_id }).select('name path');
    if (req.file) {
      req.file.destination = paths.join(basepath, `/files${folder.path}`);
      const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;
      data = { fieldname, originalname, encoding, mimetype, destination, filename, path, size };
    }
    data.description = req.body.description;
    data.folder_id = req.body.folder_id;
    data.file_image = req.file;
    data.added_by = req.user.id;
    console.log(data, 'data');
    return null;
    // const newFile = new fileSch(newData);
    // await newFile.save();
  } catch (err) {
    next(err);
  }
};

fileController.AddFolders = async (req, res, next) => {
  try {
    const data = req.body;
    if (data._id) {
      const update = await folderSch.findByIdAndUpdate(data._id, { $set: { data } }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'folder edited', null);
    } else {
      added_by = req.user.id;
      const newFolder = new folderSch(data);
      await newFolder.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newFolder, null, 'new folder created', null);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = fileController;
