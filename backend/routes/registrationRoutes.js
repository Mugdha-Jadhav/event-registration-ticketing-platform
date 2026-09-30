const express = require("express");

const {
    createRegistration,
    getRegistrationById,
    createTicketAfterPayment
} = require("../controllers/registrationController");

const router = express.Router();

router.post("/", createRegistration);

router.get("/:id", getRegistrationById);

router.post("/:id/ticket", createTicketAfterPayment);

module.exports = router;