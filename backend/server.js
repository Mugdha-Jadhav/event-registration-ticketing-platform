const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./config/supabase");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Event Registration Platform API is running!"
    });
});


// Supabase test route
app.get("/api/test", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .select("id")
            .limit(1);

        console.log("Supabase error:", error);

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            message: "Supabase connection successful!",
            data: data
        });

    } catch (error) {
        console.log("Server error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});