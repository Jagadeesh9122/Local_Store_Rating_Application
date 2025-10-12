const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const auth = require('../middlewares/auth.middleware');


router.get('/', auth, storeController.listStores);
router.get('/:id', auth, storeController.getStore);
router.post('/:id/rate', auth, storeController.submitRating);

module.exports = router;
