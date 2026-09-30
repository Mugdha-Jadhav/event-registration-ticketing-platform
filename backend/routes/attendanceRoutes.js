const express = require("express");

const {
    checkInTicket
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/check-in/:ticketId", checkInTicket);

module.exports = router;