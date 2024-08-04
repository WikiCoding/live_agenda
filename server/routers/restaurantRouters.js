const express = require("express");
const router = new express.Router();
const getAllRestaurants = require("../rest_api_services/restaurantServices/getAllRestaurants");
const addRestaurant = require("../rest_api_services/restaurantServices/addRestaurant");
const updateRestaurant = require("../rest_api_services/restaurantServices/updateRestaurant");
const deleteRestaurant = require("../rest_api_services/restaurantServices/deleteRestaurant");

router.get("/restaurants", getAllRestaurants);

router.post('/restaurants', addRestaurant);

router.put('/restaurants/:id', updateRestaurant);

router.delete('/restaurants/:id', deleteRestaurant);

module.exports = router;