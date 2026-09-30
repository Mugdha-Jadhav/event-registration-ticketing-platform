import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        event_date: "",
        start_time: "",
        capacity: "",
        ticket_price: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/events", {
                title: formData.title,
                description: formData.description,
                venue: formData.venue,
                event_date: formData.event_date,
                start_time: formData.start_time,
                capacity: Number(formData.capacity),
                ticket_price: Number(formData.ticket_price)
            });

            alert("Event created successfully!");

            navigate("/admin");

        } catch (error) {
            console.log("Create event error:", error);

            alert(
                error.response?.data?.error ||
                "Failed to create event."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="events-page">

            <div className="events-header">
                <h1>Create New Event</h1>

                <p>
                    Add a new event to the platform.
                </p>
            </div>

            <div className="admin-section">

                <form
                    className="event-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>Event Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter event title"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter event description"
                            rows="4"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Venue</label>

                        <input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="Enter venue"
                            required
                        />
                    </div>


                    <div className="form-row">

                        <div className="form-group">
                            <label>Event Date</label>

                            <input
                                type="date"
                                name="event_date"
                                value={formData.event_date}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>Start Time</label>

                            <input
                                type="time"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">
                            <label>Capacity</label>

                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder="200"
                                min="1"
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>Ticket Price (₹)</label>

                            <input
                                type="number"
                                name="ticket_price"
                                value={formData.ticket_price}
                                onChange={handleChange}
                                placeholder="100"
                                min="0"
                                required
                            />
                        </div>

                    </div>


                    <button
                        type="submit"
                        className="view-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Event..."
                            : "Create Event"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateEvent;