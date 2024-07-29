const express = require('express');
const router = new express.Router();
const getAllTasks = require('../services/taskServices/getAllTasks');
const addTask = require('../services/taskServices/addTask');
const updateTask = require('../services/taskServices/updateTask');
const deleteTask = require('../services/taskServices/deleteTask');

router.get('/tasks', getAllTasks);

router.post('/tasks', addTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;