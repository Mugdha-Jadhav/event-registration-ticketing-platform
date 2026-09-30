const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Email and password are required."
            });
        }

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                error: "Invalid admin credentials."
            });
        }

        const token = jwt.sign(
            {
                role: "admin",
                email: email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            success: true,
            message: "Admin login successful!",
            token
        });

    } catch (error) {
        console.log("Login error:", error);

        res.status(500).json({
            success: false,
            error: "Login failed."
        });
    }
};

module.exports = {
    adminLogin
};