const express = require("express");
const router = new express.Router();
const getAllEvents = require("../rest_api_services/eventServices/getAllEvents");
const addEvent = require("../rest_api_services/eventServices/addEvent");
const updateEvent = require("../rest_api_services/eventServices/updateEvent");
const deleteEvent = require("../rest_api_services/eventServices/deleteEvent");

router.get("/events", getAllEvents);

router.post('/events', addEvent);

router.put('/events/:id', updateEvent);

router.delete('/events/:id', deleteEvent);

module.exports = router;