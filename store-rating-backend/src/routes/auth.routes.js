const express = require('express');
const router = express.Router();
const { signupValidator, loginValidator } = require('../validators/auth.validator');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', signupValidator, authController.signup);
router.post('/login', loginValidator, authController.login);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
