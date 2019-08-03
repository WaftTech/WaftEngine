const express = require('express');
const router = express.Router();

const bugModule = require('../../modules/bug/bugController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, bugModule.GetErrors);
router.get('/grby', authorization, bugModule.GetErrorsGRBY);
router.delete('/all', authorization, authentication, bugModule.DeleteAll);
router.delete('/:id', authorization, authentication, bugModule.DeleteError);
module.exports = router;
