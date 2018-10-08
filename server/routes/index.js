const express = require('express');
const router = express.Router();

// All route of User
const userRoutes = require('./api/users');
router.use('/user', userRoutes);
// All route of Dynamic Module
const dmodule = require('./api/module');
router.use('/module', dmodule);
// All route of Organization Module
const organizationRoutes = require('./api/organization');
router.use('/org', organizationRoutes);

// Edit update
// router.post('/delete/:id', user.delete);

module.exports = router;
