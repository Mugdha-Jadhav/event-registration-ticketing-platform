const supabase = require("../config/supabase");

const createDemoPayment = async (req, res) => {
    try {
        const {
            registration_id,
            amount
        } = req.body;

        // Create demo payment record
        const { data: payment, error } = await supabase
            .from("payments")
            .insert([
                {
                    registration_id,
                    amount,
                    payment_id: "DEMO-" + Date.now(),
                    payment_status: "paid"
                }
            ])
            .select()
            .single();

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Demo payment successful!",
            payment: payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createDemoPayment
};