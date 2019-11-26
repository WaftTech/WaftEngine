const httpStatus = require('http-status');

const {menusch , menu_item } = require('./menuschema');
const otherHelper = require('../../helper/others.helper');
const menuConfig = require('./menuConfig');
const menuController = {};
const menuItemController = {};



menuController.getMenu = async(req, res, next) => {
    // res.status(200).json({message: 'menu successfully'});
    try{
        const menuList = await menusch.find({is_deleted:false});
        return otherHelper.sendResponse(res, httpStatus.OK, true,menuList ,null,menuConfig.get , null );
    }catch(err) {
        next(err);
    }
}

menuItemController.getMenuItem = async(req, res, next) => {
    // res.status(200).json({message: 'menu successfully'});
    try{
        const menuListItem = await menu_item.find();
        return otherHelper.sendResponse(res, httpStatus.OK, true,menuListItem ,null,menuConfig.get , null );
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
            return otherHelper.sendResponse(res,httpStatus.OK,true,update, null,menuConfig.save, null);

        }else{
            menuitem.added_at = new Date();
            menuitem.added_by = req.user.id;
            const newMenuItem = new menu_item(menuitem);
            const menu_item_save = await newMenuItem.save();
            return otherHelper.sendResponse(res,httpStatus.OK, true, menu_item_save, null, menuConfig.save, null);

        }
         
    }catch(err){
        next(err)
    }
}

menuController.saveMenu = async(req, res, next) => {
    try{
        let menu = req.body;
        if(menu && menu._id) {
            menu.updated_by = req.user.id;
            menu.updated_at = new Date();
            
            const update = await menusch.findByIdAndUpdate(menu._id , {
                $set:menu
            }, { new:true });

            return otherHelper.sendResponse(res,httpStatus.OK, true, update, null, menuConfig.save, null);
        }else{

            // console.log(req.user.id);
            menu.added_by=req.user.id;
            menu.added_at = new Date();
            const newMenu = new menusch(menu);
            const MenuSave = await newMenu.save();
            return otherHelper.sendResponse(res, httpStatus.OK, true, MenuSave,null,menuConfig.save, null );
        }

    }catch(err){
        next(err);
    }
}

menuController.getEditMenu = async(req, res, next) => {
    const menuId = req.params.menuId;
    const menu = await menusch.findById(menuId);
    return otherHelper.sendResponse(res,httpStatus.OK, true,menu, null, menuConfig.get, null);
}

menuController.deleteMenu = async(req, res, next) => {
    const menuId = req.body._id;
    const menu = await menusch.findByIdAndUpdate(menuId , {
        $set: { is_deleted : true  }
    } , { new:true});
    return otherHelper.sendResponse(res,httpStatus.OK, true, menu , null ,menuConfig.delete , null );
}

module.exports = { menuController,menuItemController  };
