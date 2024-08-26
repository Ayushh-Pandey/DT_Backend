const express = require('express');
const { getEventById, getEventByType, createEvent, updateEvent, deleteAnEvent } = require('../controllers/eventController');

const router = express.Router();

router.get('/events',getEventById);
router.get('/events',getEventByType);
router.post('/events',createEvent);
router.put('/events/:id',updateEvent);
router.delete('/events/:id',deleteAnEvent);

module.exports = router;