const httpStatus = require('http-status');

const { menusch, menu_item } = require('./menuschema');
const otherHelper = require('../../helper/others.helper');
const menuConfig = require('./menuConfig');
const objectId = require('mongoose').Types.ObjectId;
const menuController = {};
const menuItemController = {};

menuController.getMenu = async (req, res, next) => {
  let { page, size, populate, selectq, searchq, sortq } = otherHelper.parseFilters(req, 10, false);
  searchq = { is_deleted: false };
  if (req.query.find_title) {
    searchq = { title: { $regex: req.query.find_title, $options: 'i' }, ...searchq };
  }
  if (req.query.find_key) {
    searchq = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchq };
  }

  selectq = 'title key order';
  let data = await otherHelper.getquerySendResponse(menusch, page, size, sortq, searchq, selectq, next, populate);
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Menu get success!!', page, size, data.totaldata);
};

const menuControl = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
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
    if (sortby == 1 && !isNaN(sortby) && sortfield) {
      //one is ascending
      sortq = sortfield;
    } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
      //zero is descending
      sortq = '-' + sortfield;
    } else {
      sortq = '';
    }
  }

  //const parent = await menusch.findById(req.params.id).select('title key order is_active');

  let child = await menu_item.aggregate([
    {
      $match: { parent_menu: null, menu_sch_id: objectId(req.body.menu_sch_id) },
    },
    {
      $lookup: {
        from: 'menu_items',
        localField: '_id',
        foreignField: 'parent_menu',
        as: 'child_menu',
      },
    },
    {
      $unwind: { path: '$child_menu', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        is_active: 1,
        order: 1,
        title: 1,
        target: 1,
        url: 1,
        is_internal: 1,
        parent_menu: 1,
        'child_menu._id': { $ifNull: ['$child_menu._id', ''] },
        'child_menu.is_active': 1,
        'child_menu.order': 1,
        'child_menu.title': 1,
        'child_menu.target': 1,
        'child_menu.url': 1,
        'child_menu.is_internal': 1,
        'child_menu.parent_menu': 1,
      },
    },

    {
      $lookup: {
        from: 'menu_items',
        localField: 'child_menu._id',
        foreignField: 'parent_menu',
        as: 'child_menu.child_menu',
      },
    },
    {
      $group: {
        _id: '$_id',
        is_active: { $first: '$is_active' },
        order: { $first: '$order' },
        title: { $first: '$title' },
        url: { $first: '$url' },
        child_menu: { $push: '$child_menu' },
        target: { $first: '$target' },
        is_internal: { $first: '$is_internal' },
        parent_menu: { $first: '$parent_menu' },
      },
    },

    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  return child;
};

menuItemController.saveMenuItem = async (req, res, next) => {
  try {
    let menuitem = req.body;
    if (menuitem && menuitem._id) {
      menuitem.updated_at = new Date();
      menuitem.updated_by = req.user.id;
      const update = await menu_item.findByIdAndUpdate(
        menuitem._id,
        {
          $set: menuitem,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, menuConfig.save, null);
    } else {
      menuitem.added_at = new Date();
      menuitem.added_by = req.user.id;
      const newMenuItem = new menu_item(menuitem);
      const menu_item_save = await newMenuItem.save();
    }
    const child = await menuControl(req, res, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, child, null, menuConfig.save, null);
  } catch (err) {
    next(err);
  }
};

menuController.saveMenu = async (req, res, next) => {
  try {
    let menu = req.body;
    if (menu && menu._id && menu.key) {
      const checkIf = await menusch.findOne({ key: menu.key, is_deleted: false, _id: { $ne: menu._id } });
      if (checkIf) {
        const error = { key: 'Key already exists!!' };
        return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
      }

      menu.updated_by = req.user.id;
      menu.updated_at = new Date();

      const update = await menusch.findByIdAndUpdate(
        menu._id,
        {
          $set: menu,
        },
        { new: true },
      );

      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, menuConfig.save, null);
    } else {
      const checkIf = await menusch.findOne({ key: menu.key, is_deleted: false });
      if (checkIf) {
        const error = { key: 'Key already exists!!' };
        return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
      }
      menu.added_by = req.user.id;
      menu.added_at = new Date();
      const newMenu = new menusch(menu);
      const MenuSave = await newMenu.save();

      // const data = await menuControl(req, res, next);
      return otherHelper.sendResponse(res, httpStatus.OK, true, MenuSave, null, menuConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

// menuController.getEditMenu = async (req, res, next) => {
//   const menuId = req.params.menuId;
//   const menu = await menusch.findById(menuId).populate([{ path: 'sub_menu.menu_item', select: 'title' }]);
//   return otherHelper.sendResponse(res, httpStatus.OK, true, menu, null, menuConfig.get, null);
// };

menuController.getEditMenu = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
  // let searchq = { menu_sch_id: req.params.id };
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
    if (sortby == 1 && !isNaN(sortby) && sortfield) {
      //one is ascending
      sortq = sortfield;
    } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
      //zero is descending
      sortq = '-' + sortfield;
    } else {
      sortq = '';
    }
  }

  const parent = await menusch.findById(req.params.id).select('title key order is_active');

  let child = await menu_item.aggregate([
    {
      $match: { parent_menu: null, menu_sch_id: objectId(req.params.id) },
    },
    {
      $lookup: {
        from: 'menu_items',
        localField: '_id',
        foreignField: 'parent_menu',
        as: 'child_menu',
      },
    },
    {
      $unwind: { path: '$child_menu', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        is_active: 1,
        order: 1,
        title: 1,
        target: 1,
        url: 1,
        is_internal: 1,
        parent_menu: 1,
        'child_menu._id': { $ifNull: ['$child_menu._id', ''] },
        'child_menu.is_active': 1,
        'child_menu.order': 1,
        'child_menu.title': 1,
        'child_menu.target': 1,
        'child_menu.url': 1,
        'child_menu.is_internal': 1,
        'child_menu.parent_menu': 1,
      },
    },

    {
      $lookup: {
        from: 'menu_items',
        localField: 'child_menu._id',
        foreignField: 'parent_menu',
        as: 'child_menu.child_menu',
      },
    },
    {
      $group: {
        _id: '$_id',
        is_active: { $first: '$is_active' },
        order: { $first: '$order' },
        title: { $first: '$title' },
        url: { $first: '$url' },
        child_menu: { $push: '$child_menu' },
        target: { $first: '$target' },
        is_internal: { $first: '$is_internal' },
        parent_menu: { $first: '$parent_menu' },
      },
    },

    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  return otherHelper.sendResponse(res, httpStatus.OK, true, { parent, child }, null, 'Child menu get success!!', null);
};

menuController.deleteMenu = async (req, res, next) => {
  const menuId = req.params.id;
  const menu = await menusch.findByIdAndUpdate(
    menuId,
    {
      $set: { is_deleted: true },
    },
    { new: true },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, menu, null, menuConfig.delete, null);
};

menuController.getMenuForUser = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
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
    if (sortby == 1 && !isNaN(sortby) && sortfield) {
      //one is ascending
      sortq = sortfield;
    } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
      //zero is descending
      sortq = '-' + sortfield;
    } else {
      sortq = '';
    }
  }

  const id = await menusch.findOne({ key: req.params.key }).select('_id');

  let child = await menu_item.aggregate([
    {
      $match: { parent_menu: null, menu_sch_id: objectId(id._id) },
    },
    {
      $lookup: {
        from: 'menu_items',
        localField: '_id',
        foreignField: 'parent_menu',
        as: 'child_menu',
      },
    },
    {
      $unwind: { path: '$child_menu', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        is_active: 1,
        order: 1,
        title: 1,
        target: 1,
        url: 1,
        is_internal: 1,
        parent_menu: 1,
        'child_menu._id': { $ifNull: ['$child_menu._id', ''] },
        'child_menu.is_active': 1,
        'child_menu.order': 1,
        'child_menu.title': 1,
        'child_menu.target': 1,
        'child_menu.url': 1,
        'child_menu.is_internal': 1,
        'child_menu.parent_menu': 1,
      },
    },

    {
      $lookup: {
        from: 'menu_items',
        localField: 'child_menu._id',
        foreignField: 'parent_menu',
        as: 'child_menu.child_menu',
      },
    },
    {
      $group: {
        _id: '$_id',
        is_active: { $first: '$is_active' },
        order: { $first: '$order' },
        title: { $first: '$title' },
        url: { $first: '$url' },
        child_menu: { $push: '$child_menu' },
        target: { $first: '$target' },
        is_internal: { $first: '$is_internal' },
        parent_menu: { $first: '$parent_menu' },
      },
    },

    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  return otherHelper.sendResponse(res, httpStatus.OK, true, child, null, 'Child menu get success!!', null);
};

module.exports = { menuController, menuItemController };
