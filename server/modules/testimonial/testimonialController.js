const httpStatus = require('http-status');
const testimonialSch = require('./testimonialSchema');
const settingsSch = require('../setting/settingSchema');
const otherHelper = require('../../helper/others.helper');
const testimonialConfig = require('./testimonialConfig');
const testimonialController = {};
const { getSetting } = require('./../../helper/settings.helper');

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


testimonialController.selectMultipleData = async (req, res, next) => {
  const { testimonial_id, type } = req.body;
  const Data = await testimonialSch.updateMany(
    { _id: { $in: testimonial_id } },
    {
      $set: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);

};
testimonialController.getTestimonial = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);
    searchQuery = { ...searchQuery };
    if (req.query.name) {
      searchQuery = {
        name: { $regex: req.query.name, $options: 'i' },
        ...searchQuery,
      };
    }
    populate = [{ path: 'image' }];
    let testimonial_data = await otherHelper.getQuerySendResponse(testimonialSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    const testimonial_settings = await settingsSch.findOne({ type: 'testimonial', sub_type: 'settings', key: 'testimonial_settings' }).lean();
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, { testimonial_data: testimonial_data.data, settings: testimonial_settings }, 'Testimonial Get Success', page, size, testimonial_data.totalData, sortQuery);

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

testimonialController.saveTestimonialSetting = async (req, res, next) => {
  try {
    let data = req.body;
    const testimonial_settings = await settingsSch.findOne({ type: 'testimonial', sub_type: 'settings', key: 'testimonial_settings' });
    if (testimonial_settings) {
      testimonial_settings.value = data;
      testimonial_settings.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, testimonial_settings, null, "Testimonial Settings Updated", null);
    }
    let settings_data = {};
    settings_data.type = 'testimonial';
    settings_data.sub_type = 'settings';
    settings_data.key = 'testimonial_settings';
    settings_data.added_by = req.user.id;
    settings_data.value = data;
    let newSetting = new settingsSch(settings_data);
    let saved = await newSetting.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, "Testimonial Settings Created", null);
  } catch (err) {
    next(err);
  }
};

testimonialController.getTestimonialSetting = async (req, res, next) => {
  try {
    const testimonial_settings = await settingsSch.findOne({ type: 'testimonial', sub_type: 'settings', key: 'testimonial_settings' }).lean();
    return otherHelper.sendResponse(res, httpStatus.OK, true, testimonial_settings.value, null, "Testimonial Settings get", null);
  } catch (err) {
    next(err);
  }
};

testimonialController.selectMultipleData = async (req, res, next) => {
  try {
    const { testimonial_id } = req.body;
    const Data = await testimonialSch.updateMany(
      { _id: { $in: testimonial_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  } catch (err) {
    next(err);
  }
}

module.exports = testimonialController;
