const httpStatus = require('http-status');
<<<<<<< HEAD
const { menusch, menu_item } = require('./menuschema');
=======

const {menuSch , menu_item } = require('./menuschema');
>>>>>>> 01e732e032e223958e93321b5837aa002fdf9bec
const otherHelper = require('../../helper/others.helper');
const menuConfig = require('./menuConfig');
const objectId = require('mongoose').Types.ObjectId;
const utils = require('./utils');
const menuController = {};
const menuItemController = {};

menuController.getMenu = async (req, res, next) => {
  let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
  searchQuery = { is_deleted: false };
  if (req.query.find_title) {
    searchQuery = { title: { $regex: req.query.find_title, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_key) {
    searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
  }

  selectQuery = 'title key order is_active';
  let data = await otherHelper.getquerySendResponse(menusch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Menu get success!!', page, size, data.totaldata);
};

<<<<<<< HEAD
const menuControl = async (req, res, next) => {
  const all_menu = await menu_item
    .find({ menu_sch_id: objectId(req.body.menu_sch_id) })
    .sort({ order: 1 })
    .lean();
  const baseParents = [];
  const childrens = [];
  all_menu.forEach(each => {
    if (each.parent_menu == null) {
      baseParents.push(each);
    } else {
      childrens.push(each);
    }
  });

  const child = utils.recursiveChildFinder(baseParents, childrens);
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

    if (menuitem.parent_menu) {
      const hierarchy = await menu_item
        .findById(menuitem.parent_menu)
        .select('parent_hierarchy')
        .lean();

      menuitem.parent_hierarchy = [...hierarchy.parent_hierarchy, hierarchy._id];
    }

    if (menuitem && menuitem._id) {
      menuitem.updated_at = new Date();
      menuitem.updated_by = req.user.id;

      const isLoop = otherHelper.mongoIdExistInArray(menuitem.parent_hierarchy, menuitem._id);
      if (isLoop) {
        const errors = { parent_menu: 'Circular Dependencies detected' };
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Invalid Call', null);
      }

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
  const all_menu = await menu_item
    .find({ menu_sch_id: objectId(req.params.id) })
    .sort({ order: 1 })
    .lean();

  const baseParents = [];
  const childrens = [];
  all_menu.forEach(each => {
    if (each.parent_menu == null) {
      baseParents.push(each);
    } else {
      childrens.push(each);
    }
  });
  const child = utils.recursiveChildFinder(baseParents, childrens);

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
  const all_menu = await menu_item
    .find({ menu_sch_id: objectId(id._id) })
    .sort({ order: 1 })
    .lean();
  const baseParents = [];
  const childrens = [];
  all_menu.forEach(each => {
    if (each.parent_menu == null) {
      baseParents.push(each);
    } else {
      childrens.push(each);
    }
  });

  const child = utils.recursiveChildFinder(baseParents, childrens);
  return otherHelper.sendResponse(res, httpStatus.OK, true, { child, key: id.key }, null, 'Child menu get success!!', null);
};

module.exports = { menuController, menuItemController };
=======
menuController.getMenu = async(req, res, next) => {
    try{
        let { page, size, populate, selectq, searchq, sortq } = otherHelper.parseFilters(req, 10, false);
        let datas = await otherHelper.getquerySendResponse(menuSch, page, size, sortq, searchq, selectq, next, populate);
        return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, menuConfig.get, page, size, datas.totaldata);
    }catch(err) {
        next(err);
    }
}

menuController.saveMenu = async(req, res, next) => {
    try{
        let menu = req.body;
        if(menu && menu._id) {
            menu.updated_by = req.user.id;
            menu.updated_at = new Date();
            
            const update = await menuSch.findByIdAndUpdate(menu._id , {
                $set:menu
            }, { new:true });

            return otherHelper.sendResponse(res,httpStatus.OK, true, update, null, menuConfig.save, null);
        }else{
            menu.added_by=req.user.id;
            const newMenu = new menuSch(menu);
            const MenuSave = await newMenu.save();
            return otherHelper.sendResponse(res, httpStatus.OK, true, MenuSave,null,menuConfig.save, null );
        }

    }catch(err){
        next(err);
    }
}

menuController.getMenuDetail = async(req, res, next) => {
    const menuId = req.params.id;
    const menu = await menuSch.findById(menuId);
    return otherHelper.sendResponse(res,httpStatus.OK, true,menu, null, menuConfig.get, null);
}


menuController.deleteMenu = async(req, res, next) => {
    const menuId = req.params.id;
    const menu = await menuSch.findByIdAndUpdate(menuId , {
        $set: { is_deleted : true,deleted_at:Date.now() , deleted_by: req.user.id }
    } , { new:true});
   
    return otherHelper.sendResponse(res,httpStatus.OK, true, menu , null ,menuConfig.delete , null );
}

menuItemController.getMenuItem = async(req, res, next) => {
    try{
        let { page, size, populate, selectq, searchq, sortq } = otherHelper.parseFilters(req, 10, false);
     
        let datas = await otherHelper.getquerySendResponse(menu_item, page, size, sortq, searchq, selectq, next, populate);

        return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, menuConfig.iget, page, size, datas.totaldata);

    }catch(err) {
        next(err);
    }
}

menuItemController.saveMenuItem = async(req, res, next) => {
    try{
        let menuitem = req.body; 
        if(menuitem && menuitem._id) {
            menuitem.updated_at = new Date();
            menuitem.updated_by = req.user.id;
            const update = await menu_item.findByIdAndUpdate(menuitem._id, {
                $set:menuitem
                
            }, { new:true });
            return otherHelper.sendResponse(res,httpStatus.OK,true,update, null,menuConfig.isave, null);

        }else{
            menuitem.added_at = new Date();
            menuitem.added_by = req.user.id;
            const newMenuItem = new menu_item(menuitem);
            const menu_item_save = await newMenuItem.save();
            return otherHelper.sendResponse(res,httpStatus.OK, true, menu_item_save, null, menuConfig.isave, null);

        }
         
    }catch(err){
        next(err)
    }
}

menuItemController.getMenuItemDetail = async(req, res, next) => {
    const menuItemId = req.params.id;
    const menuItem = await menu_item.findById(menuItemId);
    return otherHelper.sendResponse(res,httpStatus.OK, true,menuItem, null, menuConfig.iget, null);
}

menuItemController.deleteMenuItem = async(req, res, next) => {
    const menuItemId = req.params.id;
    const menuItem = await menu_item.findByIdAndUpdate(menuItemId , {
        $set: { is_deleted : true , deleted_at:Date.now(), deleted_by:req.user.id }
    } , { new:true});
    return otherHelper.sendResponse(res,httpStatus.OK, true, menuItem , null ,menuConfig.delete , null );
}


module.exports = { menuController,menuItemController  };
>>>>>>> 01e732e032e223958e93321b5837aa002fdf9bec
