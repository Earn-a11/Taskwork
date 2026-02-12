const User = require('../models/User');
const Referral = require('../models/Referral');

exports.buyPlan = async (req, res) => {
  const { planName, planPrice, earningPerTask, taskLimit } = req.body;
  const user = await User.findById(req.user.id);
  if (user.plan.isActive) return res.status(400).json({ message: 'Plan already active' });
  user.plan = { name: planName, price: planPrice, earningPerTask, taskLimit, isActive: false };
  await user.save();
  res.json({ message: 'Plan purchased, awaiting activation' });
};

exports.activatePlan = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.plan.isActive = true;
  if (user.referredBy) {
    const referrer = await User.findById(user.referredBy);
    const bonus = user.plan.price * 0.25;
    referrer.walletBalance += bonus;
    await referrer.save();
    await new Referral({ referrer: user.referredBy, referred: user._id, bonus }).save();
  }
  await user.save();
  res.json({ message: 'Plan activated' });
};