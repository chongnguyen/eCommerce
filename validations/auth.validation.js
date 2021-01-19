const { PhoneCallInstance } = require("twilio");

module.exports.postAuthentication = (req, res, next) => {
  const {password, confirm, phone} = req.body;
  const errs = [];

  if(/\D/g.test(phone)){
    errs.push('Số điện thoại có chứa ký tự đặc biệt')
  }
  if(phone.length !== 10){
    errs.push('Số điện thoại phải đủ 10 ký tự!')
  }
  if(password !== confirm){
    errs.push('Mật khẩu không khớp!');
  }
  if(password.length < 8){
    errs.push('Mật khẩu tối thiểu 8 ký tự')
  }

  if(errs[0]){
    res.render('auths/register', {
      errs,
      values: req.body
    });
    return;
  }

  next();
}