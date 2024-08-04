const Task = require("../models/taskModel");

const tasksImpl = async (io, socket) => {
  const tasks = await getTaskList();

  io.emit("ui-update", tasks);

  socket.on("add-task", async (description) => {
    if (description.length === 0) return;

    const task = new Task({ description })
    try {
      await task.save();
    } catch (ex) {
      throw ex;
    }

    const tasks = await getTaskList();

    io.emit("ui-update", tasks);
  });

  socket.on("deleted-task", async (taskId) => {
    try {
      await Task.findOneAndDelete({ _id: taskId });
    } catch (error) {
      throw error;
    }

    const tasks = await getTaskList();

    io.emit("ui-update", tasks);
  });
}

const getTaskList = async () => {
  const tasks = await Task.find();
  tasks.sort((a, b) => b.createdAt - a.createdAt);

  return tasks;
};

module.exports = tasksImpl;