const express = require("express");

const {
    createDemoPayment
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/demo", createDemoPayment);

module.exports = router;