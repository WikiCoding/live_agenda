const Event = require("../../models/eventModel");

const addEvent = async (req, res) => {
  try {
    // add validations
    const event = new Event({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      eventDate: req.body.eventDate,
      eventEndDate: req.body.eventEndDate
    });

    await event.save();

    res.status(201).send({ message: 'Created event', event });
  } catch (err) {
    res.status(400).send({ message: 'Could not add restaurant', error: err });
  }
}

module.exports = addEvent;