const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.use(auth);

router.put('/password', userController.changePassword);

module.exports = router;
