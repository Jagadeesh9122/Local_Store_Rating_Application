const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const adminController = require('../controllers/admin.controller');

router.use(auth);
router.use(requireRole('admin'));

router.get('/dashboard', adminController.dashboard);
router.post('/users', adminController.createUser);
router.post('/stores', adminController.createStore);
router.get('/users', adminController.listUsers);
router.get('/stores', adminController.listStores);
router.get('/users/:id', adminController.getUserDetails);

module.exports = router;
