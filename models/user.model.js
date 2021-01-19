const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  verified: Boolean,
  verifyCode: String,
  avatar: String,
  address: String,
  shopName: String,
  cart: JSON
});

UserSchema.methods.sendMessage = (verifyCode, phoneNumber) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  console.log(phoneNumber)
  client.messages
    .create({
      body: `Cảm ơn bạn đã đăng ký tài khoản tại son môi 3ce. Mã xác nhận của bạn là ${verifyCode}`,
      from: process.env.PHONE_NUMBER,
      to: phoneNumber
    })
    .then(message => console.log(message.sid));
}
const User = mongoose.model('User', UserSchema);

module.exports = User;
