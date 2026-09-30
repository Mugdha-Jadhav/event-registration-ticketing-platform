const supabase = require("../config/supabase");

const checkInTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;

        // 1. Check if ticket exists
        const { data: ticket, error: ticketError } = await supabase
            .from("tickets")
            .select("*")
            .eq("id", ticketId)
            .single();

        if (ticketError || !ticket) {
            return res.status(404).json({
                success: false,
                error: "Invalid ticket."
            });
        }

        // 2. Check ticket status
        if (ticket.status !== "active") {
            return res.status(400).json({
                success: false,
                error: "Ticket is not active."
            });
        }

        // 3. Check if already checked in
        const { data: existingAttendance } = await supabase
            .from("attendance")
            .select("*")
            .eq("ticket_id", ticketId)
            .maybeSingle();

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                error: "This ticket has already been checked in."
            });
        }

        // 4. Create attendance record
        const { data: attendance, error: attendanceError } =
            await supabase
                .from("attendance")
                .insert([
                    {
                        ticket_id: ticketId
                    }
                ])
                .select()
                .single();

        if (attendanceError) {
            return res.status(500).json({
                success: false,
                error: attendanceError.message
            });
        }

        // 5. Send success response
        res.json({
            success: true,
            message: "Attendance marked successfully!",
            attendance: attendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    checkInTicket
};