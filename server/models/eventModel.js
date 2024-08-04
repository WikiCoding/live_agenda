const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventEndDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;