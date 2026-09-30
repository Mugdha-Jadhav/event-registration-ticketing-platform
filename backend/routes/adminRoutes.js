const express = require("express");

const {
    getDashboardStats,
    getParticipants,
    getPayments,
    getAttendance,
    getEventRegistrations,
    getEventPayments,
    getEventAttendance
} = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", getDashboardStats);

router.get("/participants", getParticipants);

router.get("/payments", getPayments);

router.get("/attendance", getAttendance);

// Event-wise APIs
router.get(
    "/events/:eventId/registrations",
    getEventRegistrations
);

router.get(
    "/events/:eventId/payments",
    getEventPayments
);

router.get(
    "/events/:eventId/attendance",
    getEventAttendance
);

module.exports = router;