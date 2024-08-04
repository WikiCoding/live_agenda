const socketio = require("socket.io");
const Restaurant = require("../models/restaurantModel");

const socketioRunner = async (httpServer) => {
  const io = socketio(httpServer);

  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);

    const restaurants = await getRestaurantsList();

    io.emit("ui-update", restaurants);

    socket.on("add-restaurant", async (restaurant) => {
      if (restaurant.name.length === 0 || restaurant.description.length === 0 || restaurant.location.length === 0) return;

      const rest = new Restaurant(restaurant);
      try {
        await rest.save();
      } catch (ex) {
        throw ex;
      }

      const restaurants = await getRestaurantsList();

      io.emit("ui-update", restaurants);
    })

    socket.on("deleted-restaurant", async (restaurantId) => {
      try {
        await Restaurant.findOneAndDelete({ _id: restaurantId });
      } catch (error) {
        throw error;
      }

      const tasks = await getRestaurantsList();

      io.emit("ui-update-restaurants", tasks);
    })

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    })
  });
};

const getRestaurantsList = async () => {
  const restaurants = await Restaurant.find();
  restaurants.sort((a, b) => b.createdAt - a.createdAt);

  return restaurants;
}

module.exports = socketioRunner;