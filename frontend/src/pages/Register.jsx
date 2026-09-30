import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Register() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/registrations", {
                event_id: id,
                name,
                email,
                phone
            });

            console.log(response.data);

            navigate(
                `/payment/${response.data.registration.id}`
            );

        } catch (error) {
            console.log("Registration error:", error);

            alert(
                error.response?.data?.error ||
                "Registration failed!"
            );
        }
    };

    return (
        <div className="events-page">

            <div className="event-card">

                <h1>Event Registration</h1>

                <p>
                    Fill in your details to register for this event.
                </p>
                <br/>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Full Name</label>
                        <br/>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <br />

                    <div>
                        <label>Email</label>
                        <br/>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <br />

                    <div>
                        <label>Phone Number</label>
                        <br/>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <br />

                    <button
                        type="submit"
                        className="view-button"
                    >
                        Continue to Payment
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;