require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

// define Model
// const User = require('./models/user.model');
// const Product = require('./models/product.model');

// Define Router
const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const sellerRouter = require('./routers/seller.router');
const searchRouter = require('./routers/search.router');

// middlewares
const userName = require('./middlewares/username.middleware');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();



// getting-started.js
mongoose.connect('mongodb://localhost/son_moi_3ce', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('Connect success!')
});

// const user = new User({phone: '0932234', email: 'trongnguyen0324@gmail.com'});
// var now = Date.now();
// user.cart= {
//   [now]: 1
// };

// user.save((err, user) => {
//   if(err) console.log(err);
//   else console.log(user);
// })

// User.find({phone: '0932234'}, (err, user) => {
//   if(err) console.log(err);
//   else console.log(user[0].cart['1595131329770']);
// })


// Config
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.COOKIE_SECRET));

// Middleware use for all router
app.use(userName.userName);

const port = 3000;



// app.get('/', async (req, res) => {
//   let products = await Product.findOne();
//   res.render('layouts/common', {
//     products
//   });
// })
app.use('/', productRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter);
app.use('/user', authMiddleware.loginMiddleware, userRouter);
app.use('/seller', authMiddleware.loginMiddleware, sellerRouter);

app.listen(port, () => console.log(`Server listen at http://localhost:${port}`));

// todo: format description product
// todo: find product, bill, purcharse
// todo: filter bar
// todo: filter bill.....