const socketio = require("socket.io");
const Task = require("../models/taskModel")

const socketioRunner = async (httpServer) => {
  const io = socketio(httpServer);

  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);

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
    })

    socket.on("deleted-task", async (taskId) => {
      try {
        await Task.findOneAndDelete({ _id: taskId });
      } catch (error) {
        throw error;
      }

      const tasks = await getTaskList();

      io.emit("ui-update", tasks);
    })

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    })
  });
};

const getTaskList = async () => {
  const tasks = await Task.find();
  tasks.sort((a, b) => b.createdAt - a.createdAt);

  return tasks;
}

module.exports = socketioRunner;