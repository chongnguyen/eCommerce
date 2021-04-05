const express = require('express');

const controller = require('../controllers/product.controller');
// const validation = require('../validations/product.validation');

var router = express.Router();

router

router.get('', controller.index);
router.get('/detail/:idProduct', controller.detail);
// router.get('/search', controller.index);
router.get('/genres/:genre', controller.index);
router.get('/address/:address', controller.index);
// router.get('/sort/:kind', controller.sort);
module.exports = router;