const Task = require("../../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).send(tasks)
  }
  catch (err) {
    res.status(400).send(err.details);
  }
}

module.exports = getAllTasks