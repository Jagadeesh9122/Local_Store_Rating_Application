const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const ownerController = require('../controllers/owner.controller');

router.use(auth);
router.use(requireRole('owner'));

router.get('/dashboard', ownerController.dashboard);

module.exports = router;
