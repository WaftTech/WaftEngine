const express = require('express');
const router = express.Router();
const {menuController , menuItemController} = require('../../modules/menu/menucontroller');
const {sanitize,validate} = require('../../modules/menu/menuValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/' , menuController.getMenu);

router.post('/' ,sanitize , validate,authorization, menuController.saveMenu);

router.get('/:id' , menuController.getMenuDetail);

router.delete('/:id' ,authorization, menuController.deleteMenu);





module.exports = router;