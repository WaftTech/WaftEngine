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

  selectq = 'title key order is_active';
  let data = await otherHelper.getquerySendResponse(menusch, page, size, sortq, searchq, selectq, next, populate);
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Menu get success!!', page, size, data.totaldata);
};

const menuControl = async (req, res, next) => {
  const child_menu = await menu_item.find({ parent_menu: null, menu_sch_id: objectId(req.body.menu_sch_id) }).lean();
  let lvl2,
    lvl3,
    lvl4 = [];
  let child = [];
  for (let i = 0; i < child_menu.length; i++) {
    child.push(child_menu[i]);
    child[i].child_menu = [];
    lvl2 = await menu_item.find({ parent_menu: child_menu[i]._id }).lean();
    for (let j = 0; j < lvl2.length; j++) {
      lvl3 = await menu_item.find({ parent_menu: lvl2[j]._id }).lean();
      child[i].child_menu.push(lvl2[j]);
      child[i].child_menu[j].child_menu = [];
      for (k = 0; k < lvl3.length; k++) {
        lvl4 = await menu_item.find({ parent_menu: lvl3[k]._id }).lean();
        child[i].child_menu[j].child_menu.push(lvl3[k]);
        child[i].child_menu[j].child_menu[k].child_menu = lvl4;
      }
    }
  }
  return child;
};
menuItemController.getMenuItem = async (req, res, next) => {
  try {
    const menu = await menu_item.findById(req.params.id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, menu, null, menuConfig.get, null);
  } catch (err) {
    next(err);
  }
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
      const child = await menuControl(req, res, next);
      return otherHelper.sendResponse(res, httpStatus.OK, true, child, null, menuConfig.save, null);
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

menuController.getEditMenu = async (req, res, next) => {
  const parent = await menusch.findById(req.params.id).select('title key order is_active');

  const child_menu = await menu_item.find({ parent_menu: null, menu_sch_id: objectId(req.params.id) }).lean();
  let lvl2,
    lvl3,
    lvl4 = [];
  let child = [];
  for (let i = 0; i < child_menu.length; i++) {
    child.push(child_menu[i]);
    child[i].child_menu = [];
    lvl2 = await menu_item.find({ parent_menu: child_menu[i]._id }).lean();
    for (let j = 0; j < lvl2.length; j++) {
      lvl3 = await menu_item.find({ parent_menu: lvl2[j]._id }).lean();
      child[i].child_menu.push(lvl2[j]);
      child[i].child_menu[j].child_menu = [];
      for (k = 0; k < lvl3.length; k++) {
        lvl4 = await menu_item.find({ parent_menu: lvl3[k]._id }).lean();
        child[i].child_menu[j].child_menu.push(lvl3[k]);
        child[i].child_menu[j].child_menu[k].child_menu = lvl4;
      }
    }
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, { parent, child }, null, 'Child menu get success!!', null);
};

menuController.deleteMenu = async (req, res, next) => {
  const menuId = req.params.id;
  const menu = await menusch.findByIdAndUpdate(
    menuId,
    {
      $set: { is_deleted: true, key: '' },
    },
    { new: true },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, menu, null, menuConfig.delete, null);
};

menuController.getMenuForUser = async (req, res, next) => {
  const id = await menusch.findOne({ key: req.params.key }).select('key');

  const child_menu = await menu_item.find({ parent_menu: null, menu_sch_id: objectId(id._id) }).lean();
  let lvl2,
    lvl3,
    lvl4 = [];
  let child = [];
  for (let i = 0; i < child_menu.length; i++) {
    child.push(child_menu[i]);
    child[i].child_menu = [];
    lvl2 = await menu_item.find({ parent_menu: child_menu[i]._id }).lean();
    for (let j = 0; j < lvl2.length; j++) {
      lvl3 = await menu_item.find({ parent_menu: lvl2[j]._id }).lean();
      child[i].child_menu.push(lvl2[j]);
      child[i].child_menu[j].child_menu = [];
      for (k = 0; k < lvl3.length; k++) {
        lvl4 = await menu_item.find({ parent_menu: lvl3[k]._id }).lean();
        child[i].child_menu[j].child_menu.push(lvl3[k]);
        child[i].child_menu[j].child_menu[k].child_menu = lvl4;
      }
    }
  }

  return otherHelper.sendResponse(res, httpStatus.OK, true, { child, key: id.key }, null, 'Child menu get success!!', null);
};

module.exports = { menuController, menuItemController };
