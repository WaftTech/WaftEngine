
const userSch = require('./../user/userSchema')
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

module.exports = adminDashboardController