const express = require('express');
const path = require('path');
const router = express.Router();
const htmlManupulator = require('./htmlmanupulator');

const checkExt = (req, res, next) => {
  const filepath = req.params[0];
  if (!filepath) {
    htmlManupulator.sendForHome(req, res, next);
  } else {
    const filarr = filepath.split('.');
    if (filarr.length > 1) {
      next();
    } else {
      htmlManupulator.sendWithRoute(req, res, next);
    }
  }
};
router.get('/*', checkExt);

module.exports = router;
