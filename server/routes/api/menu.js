const express = require('express');
const router = express.Router();
const { menuController, menuItemController } = require('../../modules/menu/menucontroller');
const { sanitize, validate, itemsanitize, itemvalidate } = require('../../modules/menu/menuValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', menuController.getMenu);

router.post('/', sanitize, validate, authorization, menuController.saveMenu);

router.delete('/:id', authorization, menuController.deleteMenu);

router.get('/:id', menuController.getEditMenu);

router.get('/menuitem', menuItemController.getMenuItem);

router.post('/menuitem', itemsanitize, authorization, menuItemController.saveMenuItem); //itemvalidate,

module.exports = router;
