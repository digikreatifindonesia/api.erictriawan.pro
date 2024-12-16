const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/', menuController.createMenu);
router.get('/:branchId', menuController.getMenu);

module.exports = router;
