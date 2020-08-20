const User = require('../models/user.model');

module.exports.userName = async (req, res, next) => {
  let id = req.signedCookies.userId;
  if(id){
    let user = await User.findById({_id: id})
    res.locals.userName = user.userName || user.phone;
  }
  next();
}