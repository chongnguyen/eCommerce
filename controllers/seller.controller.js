const Bill = require('../models/bill.model.js');
const Product = require('../models/product.model.js');
const User = require('../models/user.model.js');

module.exports.index = async (req, res) => {
  let {userId: shopId} = req.signedCookies;
  let bills = await Bill.find({shopId}) || [];
  let stateBill = {0: 0, 1: 0, 2: 0, 3: 0};

  for(let bill of bills){
    let {state} = bill;
    stateBill[state]++;
  }
  res.render('sellerChannel/index', {
    stateBill
  });
}
module.exports.create = (req, res) => {
  res.render('sellerChannel/create');
}

module.exports.update = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  console.log(product);
  res.render('sellerChannel/create', {
    product,
  });
}

module.exports.profile = async (req, res) => {
  let {userId} = req.signedCookies;
  let user = await User.findById(userId);
  res.render('sellerChannel/profile', {
    user
  });
}

module.exports.product = async (req, res) => {
  let {userId: shopId} = req.signedCookies;
  const { 
    page: currentPage = 1,
    q: search,
  } = req.query;
  const conditions = {
    shopId
  };
  if(search){
    conditions.name = {$regex: new RegExp(search), $options: 'i'}
  }
  let { 
    docs: products,
    page, 
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  } = await Product.paginate(conditions, {
    page: currentPage, limit: 20,
  });
  
  res.render('sellerChannel/product', {
    products,
    page, 
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    search,
  });
}
module.exports.bill = async (req, res) => {
  let {userId: shopId} = req.signedCookies;

  let bills = await Bill.find({shopId}) || [];
  let productIds = [];

  for(let bill of bills){
    console.log(bill);
    productIds.push(bill.productId);
  }
  console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log(productIds);
  const { 
    page: currentPage = 1,
    q: search,
  } = req.query;
  const conditions = {
    _id: {$in: productIds}
  };
  if(search){
    conditions.name = {$regex: new RegExp(search), $options: 'i'}
  }
  let { 
    docs: products,
    page, 
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  } = await Product.paginate(conditions, {
    page: currentPage, limit: 20,
  });
  
  res.render('sellerChannel/bill', {
    products,
    page, 
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    search,
    bills,
  });
}

module.exports.deleteProduct = async (req, res) => {
  let {productId} = req.params;
  Product.deleteOne({_id: productId}, (err) => {
    if(err){
      res.send("<sciprt>alert('Xóa thất bại, vui lòng thử lại sau!')</sciprt>; location.assign('/seller/product')");
      return;
    }
    res.redirect('back');
  });
}

module.exports.confirmBill = async (req, res) => {
  let billId = req.params.billId;
  let bill = await Bill.findOne({_id: billId}) || {};
  let product = await Product.findOne({_id: bill.productId}) || {};
  let user = await User.findOne({_id: bill.buyerId}) || {};

  res.render('sellerChannel/confirmBill', {
    bill,
    product,
    user
  });
}

module.exports.postConfirmBill = (req, res) => {
  let id = req.params.billId;
  let bill = Bill.findOne({_id: id}, (err, bill) => {
    if(err) {
      res.send('<script>alert("Xac nhan that bại")</script>');
      return;
    }
    bill.state = 1;
    bill.save();
  });
  res.redirect('/seller/bill');
}

module.exports.postCreate = (req, res) => {
  const Product = require('../models/product.model');
  const cloudinary = require('cloudinary');

  cloudinary.config({ 
    cloud_name: 'di3tcnhtx', 
    api_key: '277922599317199', 
    api_secret: process.env.CLOUDINARY_SECRET 
  });

  let id = req.signedCookies.userId;

  let product = {... req.body};
  product.shopId = id;
  product.date = new Date();
  if( product.price <= 0 || product.oldPrice <= 0) {
    res.send('<script>alert("Giá của sản phẩm không được âm, vui lòng kiểm tra lại!"); location.assign("/seller/create")</script>');
    return;
  }
  if(req.file){
    // let filename = req.file.path.split('\\')[2];
    let filename = req.file.filename;
    product.image = "https://res.cloudinary.com/di3tcnhtx/image/upload/v1598237198/sonmoi_3ce/" + filename;
    cloudinary.v2.uploader.upload(req.file.path, 
    {resource_type: "image", public_id: "sonmoi_3ce/" + filename,
    overwrite: true},
    function(error, result) {
      console.log(result, error)
      const fs = require('fs')
      console.log(req.file.path);
      fs.unlinkSync(req.file.path)
    });
  }

  

  Product.create(product);

  res.redirect('back');
}

module.exports.postUpdate = async (req, res) => {
  const cloudinary = require('cloudinary');
  cloudinary.config({ 
    cloud_name: 'di3tcnhtx', 
    api_key: '277922599317199', 
    api_secret: process.env.CLOUDINARY_SECRET 
  });

  const { productId } = req.params;
  const foundProduct = await Product.findById(productId);
  let product = {... req.body};
  if( product.price <= 0 || product.oldPrice <= 0) {
    res.send('<script>alert("Giá của sản phẩm không được âm, vui lòng kiểm tra lại!"); location.assign("/seller/create")</script>');
    return;
  }
  if(req.file){
    // let filename = req.file.path.split('\\')[2];
    let filename = req.file.filename;
    product.image = "https://res.cloudinary.com/di3tcnhtx/image/upload/v1598237198/sonmoi_3ce/" + filename;
    cloudinary.v2.uploader.upload(req.file.path, 
    {resource_type: "image", public_id: "sonmoi_3ce/" + filename,
    overwrite: true},
    function(error, result) {
      console.log(result, error)
      const fs = require('fs')
      console.log(req.file.path);
      fs.unlinkSync(req.file.path)
    });
  }

  Object.assign(foundProduct, product);
  await foundProduct.save();
  res.redirect('/seller/product');
}

module.exports.postProfile = require('./user.controller').postAccout
