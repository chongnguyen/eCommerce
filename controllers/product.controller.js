const Product = require('../models/product.model');

module.exports.index = async (req, res) => {
  let { keyword = ''} = req.query
    , genre  = req.params.genre
    , {kind = ''} = req.query
    , objFind = {}
    , products = [];

  genre = genre ? genre.replace(/-/mg, ' ') : '';

  keyword && (objFind.name = new RegExp(keyword, 'i'));
  genre && (objFind.genres = genre);
  if(kind) {
    let sort = -1;
    if(kind === 'price') sort = 1
    products = await Product.find(objFind).sort({price: sort});
  } else {
    products = await Product.find(objFind);
  }
  
  
  let genres = await Product.distinct('genres');

  // Phan trang
  let { start, end, arr, temp, pageCurrent } = pagination(products, req.query.page);

  res.render('layouts/common', {
    products: products.slice(start, end),
    genres,
    pages: arr,
    active: parseInt(pageCurrent),
    max: temp,
    keyword,
    kind: genre,
  });
}

module.exports.detail = async (req, res) => {
  let id = req.params.idProduct.slice(-24);
  let product = await Product.findOne({ _id: id });
  let { genres } = product;
  let similarProducts = await Product.find({ genres }).limit(12);


  res.render('products/detail', {
    product,
    similarProducts
  });
}

// module.exports.sort = async ()

function pagination(products, pageCurrent = 1) {
  let n = 30; // total product on the page.
  let start = (pageCurrent - 1) * n;
  let end = pageCurrent * n;
  let totalPage = products.length / n;
  let temp = 0;
  let arr = [];
  for (let i = 0; i < totalPage; i++) {
    arr.push(++temp);
  }
  return { start, end, arr, temp, pageCurrent }
}