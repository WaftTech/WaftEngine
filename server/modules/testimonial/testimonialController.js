const httpStatus = require('http-status');
const testimonialSch = require('./testimonialSchema');
const otherHelper = require('../../helper/others.helper');
const testimonialConfig = require('./testimonialConfig');
const testimonialController = {};

testimonialController.saveTestimonial = async (req, res, next) => {
  try {
    let testimonial = req.body;
    if (testimonial && testimonial._id) {
      testimonial.updated_at = new Date();
      testimonial.updated_by = req.user.id;
      const update = await testimonialSch.findByIdAndUpdate(
        testimonial._id,
        {
          $set: testimonial,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, testimonialConfig.save, null);
    } else {
      testimonial.added_by = req.user.id;
      const new_testimonial = new testimonialSch(testimonial);
      const new_testimonial_save = await new_testimonial.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, new_testimonial_save, null, testimonialConfig.get, null);
    }
  } catch (err) {
    next(err);
  }
};
testimonialController.getTestimonial = async (req, res, next) => {
  try {
    // const get_testimonial = await testimonialSch.find({ is_deleted: false }).populate({ path: 'image' });
    // return otherHelper.sendResponse(res, httpStatus.OK, true, get_testimonial, null, testimonialConfig.save, null);

    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);
    searchQuery = { ...searchQuery };
    if (req.query.name) {
      searchQuery = {
        name: { $regex: req.query.name, $options: 'i' },
        ...searchQuery,
      };
    }
    populate = [{ path: 'image' }]
    let data = await otherHelper.getQuerySendResponse(testimonialSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Brand Get Success', page, size, data.totalData, sortQuery);

  } catch (err) {
    next(err);
  }
};

testimonialController.deleteTestimonial = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delete_testimonial = await testimonialSch.findByIdAndUpdate(
      id,
      {
        $set: { is_deleted: true, deleted_at: Date.now(), deleted_by: req.user.id },
      },
      { new: true },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, delete_testimonial, null, testimonialConfig.delete, null);
  } catch (err) {
    next(err);
  }
};

testimonialController.getTestimonialDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const testimonial_detail = await testimonialSch.findById(id).populate({ path: 'image' });
    return otherHelper.sendResponse(res, httpStatus.OK, true, testimonial_detail, null, testimonialConfig.get, null);
  } catch (err) {
    next(err);
  }
};
module.exports = testimonialController;
