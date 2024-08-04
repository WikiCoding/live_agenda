const Restaurant = require("../../models/restaurantModel");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).send(restaurants)
  }
  catch (err) {
    res.status(400).send(err.details);
  }
}

module.exports = getAllRestaurants;