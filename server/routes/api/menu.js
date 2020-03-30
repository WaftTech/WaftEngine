const express = require('express');
const router = express.Router();
<<<<<<< HEAD

const { menuController, menuItemController } = require('../../modules/menu/menucontroller');
const { sanitize, validate, itemSanitize, itemValidate } = require('../../modules/menu/menuValidation');
const { authorization } = require('../../middleware/authentication.middleware');
=======
const {menuController , menuItemController} = require('../../modules/menu/menucontroller');
const {sanitize,validate} = require('../../modules/menu/menuValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/' , menuController.getMenu);

router.post('/' ,sanitize , validate,authorization, menuController.saveMenu);

router.get('/:id' , menuController.getMenuDetail);

router.delete('/:id' ,authorization, menuController.deleteMenu);



>>>>>>> 01e732e032e223958e93321b5837aa002fdf9bec

router.get('/', menuController.getMenu);
router.post('/', sanitize, validate, authorization, menuController.saveMenu);
router.post('/menuitem', itemSanitize, itemValidate, authorization, menuItemController.saveMenuItem);
router.get('/menuitem/:id', authorization, menuItemController.getMenuItem);
router.get('/detail/:id', menuController.getEditMenu);
router.get('/detailforuser/:key', menuController.getMenuForUser);
router.delete('/:id', authorization, menuController.deleteMenu);

module.exports = router;
