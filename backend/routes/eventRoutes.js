const express = require("express");

const {
    getEvents,
    getEventById,
    createEvent
} = require("../controllers/eventController");

const router = express.Router();


// GET all events
router.get("/", getEvents);


// GET one event
router.get("/:id", getEventById);


// CREATE event
router.post("/", createEvent);


module.exports = router;