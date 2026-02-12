const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  url: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);