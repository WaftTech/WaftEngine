const express = require('express');
const router = express.Router();
const {menuController , menuItemController} = require('../../modules/menu/menucontroller');
const {sanitize,validate, itemsanitize , itemvalidate} = require('../../modules/menu/menuValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/' , menuController.getMenu);

router.post('/' ,sanitize , validate,authorization, menuController.saveMenu);
router.get('/menuItem' , menuItemController.getMenuItem);

router.get('/:menuId' , menuController.getEditMenu);

router.delete('/menuDelete' ,authorization, menuController.deleteMenu);



router.post('/menuItem' ,itemsanitize, itemvalidate,authorization, menuItemController.saveMenuItem);




module.exports = router;