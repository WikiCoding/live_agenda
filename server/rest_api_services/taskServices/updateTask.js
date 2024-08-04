const Task = require("../../models/taskModel");

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    // add validations
    task.description = req.body.description;
    task.completed = req.body.completed;

    await task.save();

    res.status(200).send({ message: "Updated", task })
  } catch (err) {
    res.status(400).send('Could not update. ', err.details);
  }

}

module.exports = updateTask;