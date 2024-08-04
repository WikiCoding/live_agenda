const express = require('express');
const router = new express.Router();
const getAllTasks = require('../rest_api_services/taskServices/getAllTasks');
const addTask = require('../rest_api_services/taskServices/addTask');
const updateTask = require('../rest_api_services/taskServices/updateTask');
const deleteTask = require('../rest_api_services/taskServices/deleteTask');

router.get('/tasks', getAllTasks);

router.post('/tasks', addTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;