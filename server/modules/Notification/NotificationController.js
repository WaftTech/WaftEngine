const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const NotificationModel = require('./Notification');
const NotificationController = {};

NotificationController.GetNotification = async (req, res, next) => {
  let page;
  const size_default = 10;
  let size;
  let searchquery;
  let sortquery;
  let selectquery;
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
    size = Math.abs(req.query.size);
  } else {
    size = size_default;
  }
  if (req.query.sort) {
    let sortfield = req.query.sort.slice(1);
    let sortby = req.query.sort.charAt(0);

    if (sortby == 1 && !isNaN(sortby)) {
      // 1 is for ascending
      sortquery = sortfield;
    } else if (sortby == 0 && !isNaN(sortby)) {
      // 0 is for descending
      sortquery = '-' + sortfield;
    } else {
      sortquery = '';
    }
  }
  searchquery = {};
  if (req.query.find_Module) {
    searchquery = { Module: { $regex: req.query.find_Module, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_IsSeen) {
    if (req.query.find_IsSeen == 0) {
      // 0 for true
      searchquery = { IsSeen: true, ...searchquery };
    } else {
      searchquery = { IsSeen: false, ...searchquery };
    }
  }
  if (req.query.find_IsRead) {
    if (req.query.find_IsRead == 0) {
      // 0 for true
      searchquery = { IsRead: true, ...searchquery };
    } else {
      searchquery = { IsRead: false, ...searchquery };
    }
  }

  selectquery = 'Module Description IsSeen AddedAt IsRead UserID';
  let datas = await otherHelper.getquerySendResponse(NotificationModel, page, size, sortquery, searchquery, selectquery, next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, 'Notification Data delivered successfully', page, size, datas.totaldata);
};
NotificationController.GetNotificationByID = async (req, res, next) => {
  try {
    let data = await NotificationModel.findOne({ _id: req.params.id }).select('Module Description IsSeen AddedAt IsRead UserID');
    //console.log('data:', data);
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Notification data delivered successfully', null);
  } catch (err) {
    next(err);
  }
};
NotificationController.AddNotification = async (req, res, next) => {
  try {
    let Notifications = req.body;
    Notifications.Add_by = req.user.id;
    if (Notifications._id) {
      let update = await NotificationModel.findByIdAndUpdate(Notifications._id, { $set: Notifications });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Notification Saved Success !!', null);
    } else {
      let newNotification = new NotificationModel(Notifications);
      await newNotification.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newNotification, null, 'Notification Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
// NotificationController.DeleteByID = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const data = await NotificationModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_By: req.user.id, Deleted_At: new Date() } });
//     return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Notification Data delete Success', null);
//   } catch (err) {
//     next(err);
//   }
// };
module.exports = NotificationController;
