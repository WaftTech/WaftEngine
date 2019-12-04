const express = require('express');
const router = express.Router();
const { menuItemController} = require('../../modules/menu/menucontroller');
const {itemsanitize , itemvalidate} = require('../../modules/menu/menuValidation');
const { authorization } = require('../../middleware/authentication.middleware');


router.get('/' , menuItemController.getMenuItem);

router.post('/' ,itemsanitize, itemvalidate,authorization, menuItemController.saveMenuItem);

router.get('/:id' , menuItemController.getMenuItemDetail);

router.delete('/:id',authorization, menuItemController.deleteMenuItem);

module.exports = router;