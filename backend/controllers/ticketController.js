const supabase = require("../config/supabase");

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("tickets")
            .select(`
                id,
                ticket_number,
                status,
                registrations (
                    id,
                    event_id,
                    users (
                        name,
                        email,
                        phone
                    ),
                    events (
                        title,
                        description,
                        venue,
                        event_date,
                        start_time,
                        ticket_price
                    )
                )
            `)
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                error: "Ticket not found"
            });
        }

        res.json({
            success: true,
            ticket: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    getTicketById
};