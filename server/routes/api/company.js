const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/company/' });

const compModule = require('../../modules/company/companyController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validateInput } = require('../../modules/company/companyValidate');
const { GetCache } = require('../../middleware/caching.middleware');

router.get('/', GetCache, compModule.GetCompany);
router.get('/name', compModule.GetCompanyName);
router.post('/', authorization, upload.single('Image'), sanitize, validateInput, compModule.SaveCompany);
router.get('/:id', GetCache, compModule.GetCompanyById);
router.get('/name/:name', compModule.GetCompanyName);
router.delete('/:id', authorization, compModule.DeleteCompany);

module.exports = router;
