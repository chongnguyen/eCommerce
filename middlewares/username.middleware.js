const User = require('../models/user.model');
const Product = require('../models/product.model');

module.exports.userName = async (req, res, next) => {
  let id = req.signedCookies.userId;
  let listProduct = [];
  if(id){
    let user = await User.findById({_id: id});
    // console.log(user);
    // let cart = JSON.parse({});
    let cart = {};
    let productsInCart = Object.keys(cart);
    let quantumInCart = Object.values(cart);
    listProduct = await Product.find({_id: {$in: productsInCart}});

    res.locals.userName = user.name || user.phone;
    res.locals.userAvatar = user.avatar || '/image/avatar-default.png';
    res.locals.quantum = quantumInCart || [];
  }
  res.locals.listProduct = listProduct;
  next();
}