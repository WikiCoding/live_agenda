const Task = require("../../models/taskModel");

const addTask = async (req, res) => {
  try {
    const task = new Task({
      description: req.body.description,
      completed: false
    });

    await task.save();

    res.status(201).send({ message: 'Created task', task });
  } catch (err) {
    res.status(400).send({ message: 'Could not add task', error: err });
  }
}

module.exports = addTask;