const socketio = require("socket.io");
const tasksImpl = require("../socketio/tasksImpl");
const restaurantsImpl = require("../socketio/restaurantsImpl");
const eventsImpl = require("./eventsImpl");

const socketioRunner = async (httpServer) => {
  const io = socketio(httpServer);

  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);

    tasksImpl(io, socket);

    restaurantsImpl(io, socket);

    eventsImpl(io, socket);

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
};



module.exports = socketioRunner;