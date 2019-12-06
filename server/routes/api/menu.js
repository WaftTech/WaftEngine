const express = require('express');
const router = express.Router();
const { menuController, menuItemController } = require('../../modules/menu/menucontroller');
const { sanitize, validate, itemsanitize, itemvalidate } = require('../../modules/menu/menuValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', menuController.getMenu);

router.post('/', sanitize, validate, authorization, menuController.saveMenu);

router.post('/menuitem', itemsanitize, authorization, menuItemController.saveMenuItem);

router.get('/detail/:id', menuController.getEditMenu);

router.delete('/:id', authorization, menuController.deleteMenu);

// router.get('/', menuController.getMenu);

// router.post('/', sanitize, validate, authorization, menuController.saveMenu);

// router.delete('/:id', authorization, menuController.deleteMenu);
// router.get('/menuitem/:id', menuItemController.getMenuItem);
// //router.get('/menuitem/:id', menuItemController.getMenuItemDetail);

// router.get('/:id', menuController.getEditMenu);

// router.post('/menuitem', itemsanitize, authorization, menuItemController.saveMenuItem); //itemvalidate,

module.exports = router;
