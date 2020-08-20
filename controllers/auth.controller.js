const User = require('../models/user.model');
const md5 = require('md5');

module.exports.register = (req, res) => {
  res.render('auths/register', {
    values: ''
  });
}

module.exports.login = (req, res) => {
  res.render('auths/login', {
    values: ''
  })
}

module.exports.verifyCode = (req, res) => {
  res.render('auths/verifyCode', {

  })
}

module.exports.postRegister = async (req, res) => {
  let { phone } = req.body
    , password = md5(req.body.password)
    , verifyCode = generatorCode()
    , verified = false;

  User.create({ phone, password, verifyCode, verified }, (err, data) => {
    data.sendMessage(verifyCode, phone);
  });

  if (req.signedCookies.userId) {
    userName
  }
  res.redirect('/auth/verifyCode');
  // res.send('<script>alert("Dang ky thanh cong!"); location.assign("/auth/login")</script>')
}

module.exports.postLogin = async (req, res) => {
  let { phone, password } = req.body;
  let user = await User.findOne({ phone, password: md5(password) });
  if (!user) {
    res.render('auths/login', {
      errs: ['Sai tai khoan hoac mat khau'],
      values: req.body
    });
    return;
  }
  res.cookie('userId', user._id, { signed: true });
  res.redirect('/');
}

module.exports.postVerifyCode = async (req, res) => {
  let { verifyCode } = req.body;
  let user = await User.findOne({ verifyCode, verified: false });
  if (!user) {
    res.send('<script>alert("Sai mã xác nhận! Vui long kiểm tra lại"); location.assign("/auth/verifyCode")</script>');
    return;
  }
  user.verified = true;
  user.verifyCode = undefined;
  user.save();
  res.send('<script>alert("Dang ky thanh cong!"); location.assign("/auth/login")</script>');

}

// window.location.assign("/")
function generatorCode() {
  return Math.round(Math.random() * 8999 + 1000);
}