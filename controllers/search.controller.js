// const Product = require('../models/product.model');

module.exports.index = (req, res) =>{
  let {keyword} = req.query;
  console.log(keyword);

  res.redirect('/');
}