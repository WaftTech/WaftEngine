
const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const userSch = require('./../user/userSchema')
const bugSch = require('./../bug/bugSchema');
const roleSch = require('./../role/roleSchema');


const adminDashboardController = {}

adminDashboardController.getNoOfCustomerByRegistration = async (req, res, next) => {
      try {
            const data = await userSch.aggregate([
                  {
                        $match: {
                              is_deleted: false,
                        },
                  },
                  {
                        $group: {
                              _id: `$register_method`,
                              amt: { $sum: 1 },
                        },
                  },
            ]);
            return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
      } catch (err) {
            next(err);
      }
};

adminDashboardController.GetAllUserGroupBy = async (req, res, next) => {
      try {
            const role = await roleSch.find({ is_deleted: false }).select('role_title');
            let user = await userSch.find({ is_deleted: false });
            let totalData = await userSch.countDocuments({ is_deleted: false });
            return otherHelper.paginationSendResponse(res, httpStatus.OK, true, { role, user }, 'users by group by get success!!', 1, 1, totalData);
      } catch (err) {
            next(err);
      }
};

adminDashboardController.GetErrorsGroupBy = async (req, res, next) => {
      try {
            const bugs = await bugSch.aggregate([{ $group: { _id: '$error_type', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
            let totalData = 0;
            bugs.forEach(each => {
                  totalData = totalData + each.count;
            });
            return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bugs, 'errors by group by get success!!', 1, 1, totalData);
      } catch (err) {
            next(err);
      }
};

adminDashboardController.getLastXDayUserRegistration = async (req, res, next) => {
      try {
            const days = req.params.day;
            var d = new Date();
            d.setDate(d.getDate() - days);
            const property = await userSch.aggregate([
                  {
                        $match: {
                              added_at: { $gte: d },
                              is_deleted: false,
                        },
                  },
                  {
                        $group: {
                              _id: {
                                    month: { $month: '$added_at' },
                                    day: { $dayOfMonth: '$added_at' },
                                    year: { $year: '$added_at' },
                                    rm: '$register_method',
                              },
                              amt: { $sum: 1 },
                        },
                  },
                  {
                        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.rm': 1 },
                  },
                  { $project: { _id: '$_id.year', month: '$_id.month', day: '$_id.day', rm: '$_id.rm', amt: '$amt' } },
            ]);
            var data = [];
            for (let i = 0; i < days; i++) {
                  d.setDate(d.getDate() + 1);
                  let x = { _id: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate(), amt: [] };
                  let y = property.filter((y) => y.day === x.day && y.month === x.month && y._id === x._id);
                  if (y && y.length) {
                        for (let j = 0; j < y.length; y++) {
                              x.amt.push({ amt: y[j].amt, rm: y[j].rm });
                        }
                  }
                  data.push(x);
            }
            return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
      } catch (err) {
            next(err);
      }
};

adminDashboardController.getNoOfCustomerByRegistration = async (req, res, next) => {
      try {
            const data = await userSch.aggregate([
                  {
                        $match: {
                              is_deleted: false,
                        },
                  },
                  {
                        $group: {
                              _id: `$register_method`,
                              amt: { $sum: 1 },
                        },
                  },
            ]);
            return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
      } catch (err) {
            next(err);
      }
};

adminDashboardController.getLatestFiveUsers = async (req, res, next) => {
      try {
            let top = req.params.top || 5;
            top = Number.parseInt(top);
            const fiveUsers = await userSch.find({ is_deleted: false }).select('name email').sort({ sales_amount: -1 }).limit(top)
            return otherHelper.sendResponse(res, httpStatus.OK, true, fiveUsers, null, 'Get User by Day', null);
      } catch (err) {
            next(err);
      }
};
module.exports = adminDashboardController