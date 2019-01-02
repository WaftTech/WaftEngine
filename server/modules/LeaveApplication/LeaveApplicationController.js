const HttpStatus = require("http-status");
const otherHelper = require("../../helper/others.helper");
const LeaveApplicationModel = require("./LeaveApplication");
const isEmpty = require("../../validation/isEmpty");
const LeaveApplicationController = {};

const CreateLeaveInternal = require("./../CreateLeave/CreateLeaveController")
  .Internal;
const FiscalYearInternal = require("./../fiscal/fiscalController").Internal;
const LeaveTypeInternal = require("./../LeaveType/LeaveTypeController")
  .Internal;

const moment = require("moment");
moment().format();

LeaveApplicationController.GetLeaveApplication = async (req, res, next) => {
  let page;
  const size_default = 10;
  let size;
  let searchquery;
  let sortquery;
  let selectquery;
  let populate;
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
      //1 is for asscending
      sortquery = sortfield;
    } else if (sortby == 0 && !isNaN(sortby)) {
      // 0 is for Descending
      sortquery = "-" + sortfield;
    } else {
      sortquery = "";
    }
  }
  searchquery = { IsDeleted: false };
  if (req.query.find_IsHalfDay) {
    if (req.query.find_IsHalfDay == 0) {
      //0 for true
      searchquery = { IsHalfDay: true, ...searchquery };
    } else {
      searchquery = { IsHalfDay: false, ...searchquery };
    }
  }
  if (req.query.find_NoOfDays) {
    searchquery = { NoOfDays: req.query.find_NoOfDays, ...searchquery };
  }
  if (req.query.find_SubmittedTo) {
    searchquery = {
      SubmittedTo: { $regex: req.query.find_SubmittedTo, $options: "i x" },
      ...searchquery
    };
  }
  if (req.query.find_SubmittedBy) {
    searchquery = {
      SubmittedBy: { $regex: req.query.find_SubmittedBy, $options: "i x" },
      ...searchquery
    };
  }
  if (req.query.find_Added_by) {
    searchquery = {
      Added_by: { $regex: req.query.find_Added_by, $options: "i x" },
      ...searchquery
    };
  }

  selectquery =
    "IsHalfDay FromIsHalfDay ToIsHalfDay NoOfDays To From EmployID LeaveTypeID Added_by Status Remarks";

  populate = [
    { path: "LeaveTypeID", select: "LeaveName LeaveNameNepali" },
    { path: "EmployID", select: "name nameNepali" }
  ];

  let datas = await otherHelper.getquerySendResponse(
    LeaveApplicationModel,
    page,
    size,
    sortquery,
    searchquery,
    selectquery,
    next,
    populate
  );

  return otherHelper.paginationSendResponse(
    res,
    HttpStatus.OK,
    true,
    datas.data,
    "Leave Application Data Delivered Successfully",
    page,
    size,
    datas.totaldata
  );
};

LeaveApplicationController.GetLeaveApplicationByID = async (req, res, next) => {
  try {
    let data = await LeaveApplicationModel.findOne({
      _id: req.params.id,
      IsDeleted: false
    }).select(
      "IsHalfDay FromIsHalfDay ToIsHalfDay Status NoOfDays SubmittedTo SubmittedBy Added_by To From Remarks"
    );
    return otherHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      data,
      null,
      "Leave Application data delivered successfully",
      null
    );
  } catch (err) {
    next(err);
  }
};

LeaveApplicationController.AddLeaveApplication = async (req, res, next) => {
  try {
    let LeaveApplication = req.body;
    // let subtractValue = 0.0;
    let fiscalyear;

    if (LeaveApplication._id) {
      let update = await LeaveApplicationModel.findByIdAndUpdate(
        LeaveApplication._id,
        { $set: LeaveApplication }
      );
      return otherHelper.sendResponse(
        res,
        HttpStatus.OK,
        true,
        update,
        null,
        "Leave Application Saved Success !!",
        null
      );
    } else {
      LeaveApplication.Remarks.UserID = req.user.id;
      if (!LeaveApplication.EmployID) {
        LeaveApplication.EmployID = req.user.id;
      }
      LeaveApplication.Added_by = req.user.id;

      // if (LeaveApplication.FromIsHalfDay) {
      //   subtractValue = subtractValue + 0.5;
      // }
      // if (LeaveApplication.ToIsHalfDay) {
      //   subtractValue = subtractValue + 0.5;
      // }

      // let leaveDays = subtractDates(LeaveApplication.From, LeaveApplication.To);
      // LeaveApplication.NoOfDays = leaveDays - subtractValue;

      LeaveApplication.Remarks.UserID = req.user.id;

      //fiscal year check
      fiscalyear = await FindFiscalYear(
        LeaveApplication.From,
        LeaveApplication.To
      );

      if (!fiscalyear.success) {
        return otherHelper.sendResponse(
          res,
          HttpStatus.CONFLICT,
          false,
          null,
          fiscalyear.error,
          "Leave ApplicationValidation Error!!",
          null
        );
      }
      fiscalyear = fiscalyear.id;

      //cheking duplicate apllication leave
      let duplicateStatus = await CheckDuplicateLeaveApplication(
        LeaveApplication.From,
        LeaveApplication.To,
        LeaveApplication.EmployID
      );

      if (!duplicateStatus) {
        return otherHelper.sendResponse(
          res,
          HttpStatus.CONFLICT,
          false,
          null,
          {
            errors: {
              To: "Leave Conflicts with exisiting Leave",
              From: "Leave Conflicts with exisiting Leave"
            }
          },
          "Leave Conflicts with exisiting leave",
          null
        );
      }

      let newLeaveApplication = new LeaveApplicationModel(LeaveApplication);
      let leaveOk = await CreateLeaveInternal.LeaveRequest(
        LeaveApplication.LeaveTypeID,
        fiscalyear,
        LeaveApplication.EmployID,
        LeaveApplication.NoOfDays
      );
      if (leaveOk.status) {
        try {
          await newLeaveApplication.save();
        } catch (err) {
          next(err);
        }
      } else {
        return otherHelper.sendResponse(
          res,
          HttpStatus.CONFLICT,
          false,
          null,
          leaveOk.error,
          "Leave Application Failed !!",
          null
        );
      }

      return otherHelper.sendResponse(
        res,
        HttpStatus.OK,
        true,
        newLeaveApplication,
        null,
        "Leave Application Saved Success !!",
        null
      );
    }
  } catch (err) {
    next(err);
  }
};
LeaveApplicationController.DeleteByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await LeaveApplicationModel.findByIdAndUpdate(id, {
      $set: { IsDeleted: true, Deleted_By: req.user.id, Deleted_At: new Date() }
    });
    return otherHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      data,
      null,
      "Leave Application Data delete Success",
      null
    );
  } catch (err) {
    next(err);
  }
};

let subtractDates = (date1, date2) => {
  date1 = moment(date1);
  date2 = moment(date2);
  return date2.diff(date1, "days") + 1;
};

//checks if both dates belong to same fiscal year
let FindFiscalYear = async (from, to) => {
  let id1 = await FiscalYearInternal.FindFiscalYear(from);
  let id2 = await FiscalYearInternal.FindFiscalYear(to);
  let obj = {};

  if (!moment(from).isSameOrBefore(to)) {
    obj.success = false;
    obj.error = {
      From: "To date is before From date!!!",
      To: "To date is before From date!!!"
    };
    return obj;
  }

  if (id1 && id2 && id1 + "" === id2 + "") {
    obj.success = true;
    obj.id = id1;
    return obj;
  } else {
    if (!id1) {
      obj.success = false;
      obj.error = { From: "From date is not available" };
      return obj;
    } else if (!id2) {
      obj.success = false;
      obj.error = { To: "To date is not available" };
      return obj;
    } else {
      obj.success = false;
      obj.error = {
        From: "To and From must belong to same fiscal year!!!",
        To: "To and From must belong to same fiscal year!!!"
      };
      return obj;
    }
  }
};

let CheckDuplicateLeaveApplication = async (from, to, EmployeeId) => {
  console.log("Employeeid, from, to", EmployeeId, new Date(from), new Date(to));
  let datas = await LeaveApplicationModel.find({
    EmployID: EmployeeId,
    IsDeleted: false,
    From: { $lte: new Date(to) },
    To: { $gte: new Date(from) }
  });
  console.log(datas);
  if (isEmpty(datas)) {
    return true;
  } else {
    return false;
  }
};

LeaveApplicationController.getNoOfDaysFromDates = async (req, res, next) => {
  let EmployID = req.body.EmployeeID;
  let LeaveType = req.body.LeaveType;
  let FromDate = req.body.FromDate;
  let ToDate = req.body.ToDate;
  let checkholidaystatus;
  let noOfDays;
  let subtractValue = 0.0;

  let obj = {};

  if (req.body.FromIsHalfDay) {
    subtractValue = subtractValue + 0.5;
  }
  if (req.body.ToIsHalfDay) {
    subtractValue = subtractValue + 0.5;
  }

  try {
    //checkisholday.....
    checkholidaystatus = await LeaveTypeInternal.getLeaveIsHolidayStatus(
      LeaveType
    );
  } catch (err) {
    next(err);
  }
  console.log(checkholidaystatus);

  if (!moment(FromDate).isSameOrBefore(ToDate)) {
    obj.error = {
      From: "To date is before From date!!!",
      To: "To date is before From date!!!"
    };
  } else {
    noOfDays = (await subtractDates(FromDate, ToDate)) - subtractValue;

    if (checkholidaystatus.IsHolidayCount) {
      //if checkholiday true count holidays
      //edits needed here
      obj.NoOfDays = noOfDays;
      obj.HolidaysInBetween = 0;
    } else {
      obj.NoOfDays = noOfDays;
      obj.HolidaysInBetween = 0;
    }
  }
  if (obj.error) {
    return otherHelper.sendResponse(
      res,
      HttpStatus.CONFLICT,
      false,
      null,
      obj.error,
      "No of days fetch Failed !!",
      null
    );
  } else {
    return otherHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      obj,
      null,
      "No of days fetch Success",
      null
    );
  }
};

module.exports = LeaveApplicationController;
