const User = require('../models/User');
const Withdrawal = require('../models/Withdrawal');

exports.getWallet = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.walletBalance });
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);
  if (amount < 500 || amount > user.walletBalance) return res.status(400).json({ message: 'Invalid amount' });
  user.walletBalance -= amount;
  await user.save();
  await new Withdrawal({ user: req.user.id, amount }).save();
  res.json({ message: 'Withdrawal requested' });
};

exports.updateBankDetails = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.bankDetails.accountNumber) return res.status(400).json({ message: 'Bank details already set' });
  user.bankDetails = req.body;
  await user.save();
  res.json({ message: 'Bank details updated' });
};