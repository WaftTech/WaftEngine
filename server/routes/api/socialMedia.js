const express = require('express');
const router = express.Router();

const { authorization, authentication } = require('../../middleware/auth.middleware');
const socialModule = require('../../modules/socialMedia/socialMediaController');
const validation = require('../../modules/socialMedia/socialMediaValidation');
router.get('/', authentication, authorization, socialModule.getSocialMedias);
router.get('/public', socialModule.getSocialMediasForPublic);

router.get('/:id', authentication, authorization, socialModule.getSocialMedia);
router.post('/', authentication, authorization, validation.validate, socialModule.postSocialMedia);
router.delete('/:id', authentication, authorization, socialModule.deleteMedia);

module.exports = router;
