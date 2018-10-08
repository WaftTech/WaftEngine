const express = require('express');
const router = express.Router();

// All route of User
const userRoutes = require('./api/users');
router.use('/user', userRoutes);
// All route of Dynamic Module
const dmodule = require('./api/module');
router.use('/module', dmodule);

// Edit update
// router.post('/delete/:id', user.delete);

module.exports = router;
