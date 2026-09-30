const express = require("express");

const {
    getTicketById
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/:id", getTicketById);

module.exports = router;