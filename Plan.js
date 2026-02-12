const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  taskLimit: Number,
  earningPerTask: Number
});

module.exports = mongoose.model('Plan', planSchema);