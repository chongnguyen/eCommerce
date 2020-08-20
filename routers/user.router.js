const express = require('express');

const controller = require('../controllers/user.controller');

var router = express.Router();

router.get('/purchase', controller.purchase);
router.get('/account', controller.account);

module.exports = router;