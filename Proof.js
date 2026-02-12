const mongoose = require('mongoose');

const proofSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imagePath: String,
  isApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Proof', proofSchema);