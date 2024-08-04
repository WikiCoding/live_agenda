const Task = require("../../models/taskModel");

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete({ _id: req.params.id });

    res.status(200).send({ message: 'Task deleted', task: deletedTask });
  } catch (err) {
    res.status(400).send('Could not delete. ', err.details);
  }
}

module.exports = deleteTask;