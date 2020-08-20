module.exports.postAuthentication = (req, res, next) => {
  const {password, confirm} = req.body;

  if(password !== confirm){
  //   res.send('<script>alert("Nhap lai mat khau khong dung"); ' +
  // 'window.location.assign("/auth/register")</script>');
    res.render('auths/register', {
      errs: ['Mật khẩu không khớp'],
      values: req.body
    });
    return;
  }

  next();
}