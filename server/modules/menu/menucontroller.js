const httpStatus = require('http-status');

const {menuSch , menu_item } = require('./menuschema');
const otherHelper = require('../../helper/others.helper');
const menuConfig = require('./menuConfig');
const menuController = {};
const menuItemController = {};



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
