const Event = require("../../models/eventModel");

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete({ _id: req.params.id });

    res.status(200).send({ message: 'Event deleted', task: deletedEvent });
  } catch (err) {
    res.status(400).send('Could not delete. ', err.details);
  }
}

module.exports = deleteEvent;