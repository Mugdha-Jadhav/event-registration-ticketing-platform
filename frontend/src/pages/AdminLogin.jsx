import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "adminToken",
                response.data.token
            );

            navigate("/admin");

        } catch (error) {
            console.log("Login error:", error);

            alert(
                error.response?.data?.error ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="events-page">

            <div className="events-header">
                <h1>Admin Login</h1>

                <p>
                    Login to manage the event platform.
                </p>
            </div>

            <div className="admin-section">

                <form
                    className="event-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>Admin Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter admin email"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="view-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminLogin;