const express = require('express');
const multer  = require('multer');

var upload = multer({ dest: 'public/uploads/' })

const controller = require('../controllers/seller.controller');

var router = express.Router();

router.get('/index', controller.index);
router.get('/create', controller.create);
router.get('/bill', controller.bill);
router.get('/bill/:billId', controller.confirmBill);
router.get('/profile', controller.profile);
router.get('/product', controller.product);
router.get('/product/delete/:productId', controller.deleleProduct);

router.post('/create', upload.single('image'), controller.postCreate);
router.post('/bill/:billId', controller.postConfirmBill);
router.post('/profile', controller.postProfile);

module.exports = router;