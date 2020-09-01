const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const fileSch = require('./fileSchema');
const folderSch = require('./folderSchema');
const fileController = {};

fileController.GetFileAndFolder = async (req, res, next) => {
  try {
    let id = '';
    if (req.params.id === 'root') {
      const root = await folderSch.findOne({ is_root: true });
      id = root._id;
    } else {
      id = req.params.id;
    }
    const self = await folderSch
      .findOne({ is_deleted: false, _id: id })
      .populate([{ path: 'path', select: { name: 1 } }])
      .select({ name: 1, path: 1 });
    const files = await fileSch.find({ is_deleted: false, folder_id: id });
    const folders = await folderSch.find({ is_deleted: false, parent_folder: id }).select({ name: 1 });
    const totalFile = files.length;
    const totalFolder = folders.length;
    otherHelper.sendResponse(res, httpStatus.OK, true, { folders: { data: folders, totaldata: totalFolder }, files: { data: files, totaldata: totalFile }, self: self }, null, 'files and folders get success!!', null);
  } catch (err) {
    next(err);
  }
};

fileController.AddFolders = async (req, res, next) => {
  try {
    const data = req.body;
    const parent_id = req.params.id;
    const folder = await folderSch.findById(parent_id).select({ path: 1 });
    if (data._id) {
      data.path = [...folder.path, folder._id];
      data.parent_folder = folder._id;
      const update = await folderSch.findByIdAndUpdate(data._id, { $set: data }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'folder edited', null);
    } else {
      added_by = req.user.id;
      data.path = [...folder.path, folder._id];
      data.parent_folder = folder._id;
      data.added_by = added_by;
      const newFolder = new folderSch(data);
      await newFolder.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newFolder, null, 'new folder created', null);
    }
  } catch (err) {
    next(err);
  }
};
fileController.RenameFolder = async (req, res, next) => {
  try {
    const { renamed_name, _id } = req.body;
    const file = await fileSch.findByIdAndUpdate(_id, { $set: { renamed_name } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, file, null, 'File Renamed', null);
  } catch (err) {
    next(err);
  }
};
fileController.UploadFiles = async (req, res, next) => {
  try {
    let files = [];
    for (let i = 0; i < req.files.length; i++) {
      let file = req.files[i];
      file.added_by = req.user.id;
      file.destination =
        file.destination
          .split('\\')
          .join('/')
          .split('server/')[1] + '/';
      file.path = file.path
        .split('\\')
        .join('/')
        .split('server/')[1];
      file.folder_id = req.params.folder_id;
      const newFile = new fileSch(file);
      const fileSave = await newFile.save();
      files.push(fileSave);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, files, null, 'File Saved Success !!', null);
  } catch (err) {
    next(err);
  }
};
fileController.UploadFilesToRoot = async (req, res, next) => {
  try {
    let id = '';
    const root = await folderSch.findOne({ is_root: true });
    if (root && root._id) id = root._id;
    else {
      const rootFolder = new folderSch({ name: 'Root', is_root: true, path: [], added_by: req.user.id });
      const root = await rootFolder.save();
      id = root._id;
    }
    let files = [];
    for (let i = 0; i < req.files.length; i++) {
      let file = req.files[i];
      file.added_by = req.user.id;
      file.destination =
        file.destination
          .split('\\')
          .join('/')
          .split('server/')[1] + '/';
      file.path = file.path
        .split('\\')
        .join('/')
        .split('server/')[1];
      if (id) file.folder_id = id;
      const newFile = new fileSch(file);
      const fileSave = await newFile.save();
      files.push(fileSave);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, files, null, 'File Saved Success !!', null);
  } catch (err) {
    next(err);
  }
};
fileController.DeleteFolder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await folderSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date(), deleted_by: req.user.id } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'folder delete success!!', null);
  } catch (err) {
    next(err);
  }
};

fileController.DeleteFile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await fileSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date(), deleted_by: req.user.id } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'file delete success!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = fileController;
