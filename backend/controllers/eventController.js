const supabase = require("../config/supabase");

// Get all events
const getEvents = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .order("event_date", { ascending: true });

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            events: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Get one event by ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                error: "Event not found"
            });
        }

        res.json({
            success: true,
            event: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Create a new event
const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            venue,
            event_date,
            start_time,
            capacity,
            ticket_price
        } = req.body;

        const { data, error } = await supabase
            .from("events")
            .insert([
                {
                    title,
                    description,
                    venue,
                    event_date,
                    start_time,
                    capacity,
                    ticket_price
                }
            ])
            .select();

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Event created successfully!",
            event: data[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


module.exports = {
    getEvents,
    getEventById,
    createEvent
};