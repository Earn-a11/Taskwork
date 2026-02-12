const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referred: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bonus: Number
});

module.exports = mongoose.model('Referral', referralSchema);