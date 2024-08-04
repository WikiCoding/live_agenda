const Event = require("../../models/eventModel");

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });

    // add validations
    event.name = req.body.name;
    event.location = req.body.location;
    event.description = req.body.description;
    event.eventDate = req.body.eventDate;
    event.eventEndDate = req.body.eventEndDate;

    await event.save();

    res.status(200).send({ message: "Updated", event })
  } catch (err) {
    res.status(400).send('Could not update. ', err.details);
  }

}

module.exports = updateEvent;