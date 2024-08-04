const Restaurant = require("../../models/restaurantModel");

const addRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description
    });

    await restaurant.save();

    res.status(201).send({ message: 'Created restaurant', task });
  } catch (err) {
    res.status(400).send({ message: 'Could not add restaurant', error: err });
  }
}

module.exports = addRestaurant;