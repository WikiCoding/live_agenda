const Restaurant = require("../../models/restaurantModel");

const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id });

    // add validations
    restaurant.name = req.body.name;
    restaurant.location = req.body.location;
    restaurant.description = req.body.description;

    await restaurant.save();

    res.status(200).send({ message: "Updated", restaurant })
  } catch (err) {
    res.status(400).send('Could not update. ', err.details);
  }

}

module.exports = updateRestaurant;