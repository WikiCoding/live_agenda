const Event = require("../models/eventModel");

const eventsImpl = async (io, socket) => {
  const events = await getEventsList();

  io.emit("ui-update-events", events);

  socket.on("add-event", async (event) => {
    if (event.name.length === 0 || event.description.length === 0 || event.location.length === 0 || event.eventDate.length === 0 || event.eventEndDate.length === 0) return;

    const rest = new Event({
      name: event.name,
      location: event.location,
      description: event.description,
      eventDate: new Date(event.eventDate),
      eventEndDate: new Date(event.eventEndDate)
    });

    try {
      await rest.save();
    } catch (ex) {
      throw ex;
    }

    const events = await getEventsList();

    io.emit("ui-update-events", events);
  });

  socket.on("delete-event", async (eventId) => {
    try {
      await Event.findOneAndDelete({ _id: eventId });
    } catch (error) {
      throw error;
    }

    const events = await getEventsList();

    io.emit("ui-update-events", events);
  });
}

const getEventsList = async () => {
  const events = await Event.find();
  events.sort((a, b) => b.createdAt - a.createdAt);

  return events;
}

module.exports = eventsImpl;