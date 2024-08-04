const socketio = require("socket.io");
const Task = require("../models/taskModel");
const Restaurant = require("../models/restaurantModel");
const Event = require("../models/eventModel");

const socketioRunner = async (httpServer) => {
  const io = socketio(httpServer);

  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);

    const tasks = await getTaskList();

    const rests = await getRestaurantsList();

    const events = await getEventsList();

    io.emit("ui-update", tasks);

    io.emit("ui-update-restaurants", rests);

    io.emit("ui-update-events", events);

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
    })

    socket.on("add-restaurant", async (restaurant) => {
      if (restaurant.name.length === 0 || restaurant.description.length === 0 || restaurant.location.length === 0) return;

      const rest = new Restaurant(restaurant);
      try {
        await rest.save();
      } catch (ex) {
        throw ex;
      }

      const restaurants = await getRestaurantsList();

      io.emit("ui-update-restaurants", restaurants);
    });

    socket.on("delete-restaurant", async (restaurantId) => {
      try {
        await Restaurant.findOneAndDelete({ _id: restaurantId });
      } catch (error) {
        throw error;
      }

      const restaurants = await getRestaurantsList();

      io.emit("ui-update-restaurants", restaurants);
    });

    socket.on("add-event", async (event) => {
      if (event.name.length === 0 || event.description.length === 0 || event.location.length === 0 || event.eventDate.length === 0) return;

      const rest = new Event({
        name: event.name,
        location: event.location,
        description: event.description,
        eventDate: Date(event.eventDate)
      });

      try {
        await rest.save();
      } catch (ex) {
        throw ex;
      }

      const events = await getEventsList();

      io.emit("ui-update-events", events);
    });

    socket.on("delete-event", async (eventId) => {
      try {
        await Event.findOneAndDelete({ _id: eventId });
      } catch (error) {
        throw error;
      }

      const events = await getEventsList();

      io.emit("ui-update-events", events);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
};

const getTaskList = async () => {
  const tasks = await Task.find();
  tasks.sort((a, b) => b.createdAt - a.createdAt);

  return tasks;
};

const getRestaurantsList = async () => {
  const restaurants = await Restaurant.find();
  restaurants.sort((a, b) => b.createdAt - a.createdAt);

  return restaurants;
}

const getEventsList = async () => {
  const events = await Event.find();
  events.sort((a, b) => b.createdAt - a.createdAt);

  return events;
}

module.exports = socketioRunner;