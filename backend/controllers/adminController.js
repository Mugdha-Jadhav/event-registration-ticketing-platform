const supabase = require("../config/supabase");

const getDashboardStats = async (req, res) => {
    try {
        // Total events
        const { count: eventsCount, error: eventsError } =
            await supabase
                .from("events")
                .select("*", {
                    count: "exact",
                    head: true
                });

        // Total registrations
        const {
            count: registrationsCount,
            error: registrationsError
        } = await supabase
            .from("registrations")
            .select("*", {
                count: "exact",
                head: true
            });

        // Successful payments
        const {
            data: payments,
            error: paymentsError
        } = await supabase
            .from("payments")
            .select("amount")
            .eq("payment_status", "paid");

        // Total attendance
        const {
            count: attendanceCount,
            error: attendanceError
        } = await supabase
            .from("attendance")
            .select("*", {
                count: "exact",
                head: true
            });

        if (
            eventsError ||
            registrationsError ||
            paymentsError ||
            attendanceError
        ) {
            return res.status(500).json({
                success: false,
                error: "Could not load dashboard statistics."
            });
        }

        // Calculate revenue
        const revenue = payments.reduce(
            (total, payment) =>
                total + Number(payment.amount),
            0
        );

        res.json({
            success: true,

            stats: {
                events: eventsCount || 0,
                registrations: registrationsCount || 0,
                payments: payments.length,
                revenue: revenue,
                attendance: attendanceCount || 0
            }
        });

    } catch (error) {
        console.log("Dashboard error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getParticipants = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("registrations")
            .select(`
                id,
                registration_date,
                status,
                users (
                    name,
                    email,
                    phone
                ),
                events (
                    title,
                    event_date,
                    venue
                )
            `)
            .order("registration_date", {
                ascending: false
            });

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            participants: data
        });

    } catch (error) {
        console.log("Participants error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getPayments = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("payments")
            .select(`
                id,
                amount,
                payment_id,
                payment_status,
                payment_date,
                registrations (
                    users (
                        name,
                        email
                    ),
                    events (
                        title
                    )
                )
            `)
            .order("payment_date", {
                ascending: false
            });

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            payments: data
        });

    } catch (error) {
        console.log("Payments error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getAttendance = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("attendance")
            .select(`
                id,
                check_in_time,
                tickets (
                    ticket_number,
                    registrations (
                        users (
                            name,
                            email
                        ),
                        events (
                            title
                        )
                    )
                )
            `)
            .order("check_in_time", {
                ascending: false
            });

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            attendance: data
        });

    } catch (error) {
        console.log("Attendance error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get registrations for one event
const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;

        const { data, error } = await supabase
            .from("registrations")
            .select(`
                id,
                registration_date,
                status,
                users (
                    name,
                    email,
                    phone
                )
            `)
            .eq("event_id", eventId)
            .order("registration_date", {
                ascending: false
            });

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            registrations: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Get payments for one event
const getEventPayments = async (req, res) => {
    try {
        const { eventId } = req.params;

        const { data, error } = await supabase
            .from("payments")
            .select(`
                id,
                amount,
                payment_id,
                payment_status,
                payment_date,
                registrations!inner (
                    event_id,
                    users (
                        name,
                        email
                    )
                )
            `)
            .eq("registrations.event_id", eventId)
            .order("payment_date", {
                ascending: false
            });

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            payments: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Get attendance for one event
const getEventAttendance = async (req, res) => {
    try {
        const { eventId } = req.params;

        const { data, error } = await supabase
            .from("attendance")
            .select(`
                id,
                check_in_time,
                tickets!inner (
                    ticket_number,
                    registrations!inner (
                        event_id,
                        users (
                            name,
                            email
                        )
                    )
                )
            `)
            .eq("tickets.registrations.event_id", eventId)
            .order("check_in_time", {
                ascending: false
            });

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            attendance: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getParticipants,
    getPayments,
    getAttendance,
    getEventRegistrations,
    getEventPayments,
    getEventAttendance
};