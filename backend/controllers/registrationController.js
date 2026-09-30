const supabase = require("../config/supabase");

const createRegistration = async (req, res) => {
    try {
        const {
            event_id,
            name,
            email,
            phone
        } = req.body;

        // 1. Create participant
        const { data: user, error: userError } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    phone
                }
            ])
            .select()
            .single();

        if (userError) {
            return res.status(500).json({
                success: false,
                error: userError.message
            });
        }

        // 2. Create registration
        const {
            data: registration,
            error: registrationError
        } = await supabase
            .from("registrations")
            .insert([
                {
                    user_id: user.id,
                    event_id: event_id
                }
            ])
            .select()
            .single();

        if (registrationError) {
            return res.status(500).json({
                success: false,
                error: registrationError.message
            });
        }

        // Ticket is NOT created here.
        // It will be created after payment.

        res.status(201).json({
            success: true,
            message: "Registration created successfully!",
            user: user,
            registration: registration
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Get registration by ID
const getRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("registrations")
            .select(`
                id,
                user_id,
                event_id,
                status,
                registration_date,
                users (
                    name,
                    email,
                    phone
                ),
                events (
                    title,
                    ticket_price
                )
            `)
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                error: "Registration not found"
            });
        }

        res.json({
            success: true,
            registration: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Create ticket after payment
const createTicketAfterPayment = async (req, res) => {
    try {
        const { id } = req.params;

        // Check registration
        const { data: registration, error: registrationError } =
            await supabase
                .from("registrations")
                .select("*")
                .eq("id", id)
                .single();

        if (registrationError || !registration) {
            return res.status(404).json({
                success: false,
                error: "Registration not found"
            });
        }

        // Check whether ticket already exists
        const { data: existingTicket } = await supabase
            .from("tickets")
            .select("*")
            .eq("registration_id", id)
            .maybeSingle();

        if (existingTicket) {
            return res.json({
                success: true,
                message: "Ticket already exists.",
                ticket: existingTicket
            });
        }

        // Generate ticket number
        const ticketNumber =
            "TKT-" +
            Math.random()
                .toString(36)
                .substring(2, 10)
                .toUpperCase();

        // Create ticket
        const { data: ticket, error: ticketError } =
            await supabase
                .from("tickets")
                .insert([
                    {
                        registration_id: id,
                        ticket_number: ticketNumber,
                        status: "active"
                    }
                ])
                .select()
                .single();

        if (ticketError) {
            return res.status(500).json({
                success: false,
                error: ticketError.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Ticket created successfully!",
            ticket: ticket
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


module.exports = {
    createRegistration,
    getRegistrationById,
    createTicketAfterPayment
};