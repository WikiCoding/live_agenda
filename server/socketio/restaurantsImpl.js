const socketio = require("socket.io");
const Restaurant = require("../models/restaurantModel");

const restaurantsImpl = async (io, socket) => {
  const rests = await getRestaurantsList();

  io.emit("ui-update-restaurants", rests);

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
};

const getRestaurantsList = async () => {
  const restaurants = await Restaurant.find();
  restaurants.sort((a, b) => b.createdAt - a.createdAt);

  return restaurants;
}

module.exports = restaurantsImpl;