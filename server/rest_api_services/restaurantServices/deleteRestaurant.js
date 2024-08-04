const Restaurant = require("../../models/restaurantModel");

const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete({ _id: req.params.id });

    res.status(200).send({ message: 'Restaurant deleted', task: deletedRestaurant });
  } catch (err) {
    res.status(400).send('Could not delete. ', err.details);
  }
}

module.exports = deleteRestaurant;