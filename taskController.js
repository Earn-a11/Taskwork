const Task = require('../models/Task');
const Proof = require('../models/Proof');
const User = require('../models/User');

const fixedTasks = [
  { title: 'Subscribe this channel', url: 'https://youtube.com/@usainsider-f2m?si=_t_-reV_bMfvebH7' },
  { title: 'Like this video', url: 'https://youtu.be/9WEQts7b8Pw?si=suOdcrNhCiDH-C1k' },
  { title: 'Comment this video', url: 'https://youtu.be/ZNcG6SIGUSE?si=25fqfZ_UH1DnKdpE' },
  { title: 'Watch this video', url: 'https://youtu.be/MNSgwY1Nm8Y?si=vrCGW4LIBOFCOdGD' },
  { title: 'Like, Share and Subscribe', url: 'https://youtube.com/shorts/CFfYsXgZGMs?si=X0zaoepmUOlpB3pq' }
];

exports.getTasks = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.plan.isActive) return res.redirect('/plans');
  let tasks = await Task.find({ user: req.user.id });
  if (tasks.length === 0) {
    for (let i = 0; i < 5; i++) {
      const task = new Task({ ...fixedTasks[i], user: req.user.id });
      await task.save();
      tasks.push(task);
    }
  }
  res.json(tasks);
};

exports.completeTask = async (req, res) => {
  const { taskId } = req.body;
  const task = await Task.findById(taskId);
  if (task.isCompleted) return res.status(400).json({ message: 'Task already completed' });
  task.isCompleted = true;
  await task.save();
  res.json({ message: 'Proof submitted' });
};

exports.uploadProof = async (req, res) => {
  const { taskId } = req.body;
  const proof = new Proof({ task: taskId, user: req.user.id, imagePath: req.file.path });
  await proof.save();
  res.json({ message: 'Proof uploaded' });
};