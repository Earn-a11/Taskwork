const User = require('../models/User');
const Proof = require('../models/Proof');
const Withdrawal = require('../models/Withdrawal');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (email !== 'admin@taskincome.com' || password !== 'admin123') return res.status(400).json({ message: 'Invalid' });
  res.json({ message: 'Logged in' });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.activatePlan = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  user.plan.isActive = true;
  await user.save();
  res.json({ message: 'Activated' });
};

exports.approveProof = async (req, res) => {
  const { proofId } = req.body;
  const proof = await Proof.findById(proofId).populate('task user');
  proof.isApproved = true;
  proof.user.walletBalance += proof.user.plan.earningPerTask;
  await proof.save();
  await proof.user.save();
  res.json({ message: 'Approved' });
};