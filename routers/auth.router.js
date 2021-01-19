const express = require('express');

const controller = require('../controllers/auth.controller');
const validation = require('../validations/auth.validation');

var router = express.Router();

router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/verifyCode', controller.verifyCode);

router.post('/register', validation.postAuthentication, controller.postRegister);
router.post('/login', controller.postLogin);
router.post('/verifyCode', controller.postVerifyCode);

module.exports = router;