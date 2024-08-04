const Event = require("../../models/eventModel");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).send(events)
  }
  catch (err) {
    res.status(400).send(err.details);
  }
}

module.exports = getAllEvents;