import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        async function loadEvent() {
            try {
                const response = await api.get(`/events/${id}`);

                setEvent(response.data.event);
            } catch (error) {
                console.log("Error loading event:", error);
            }
        }

        loadEvent();
    }, [id]);

    if (!event) {
        return <h2>Loading event...</h2>;
    }

    return (
        <div className="events-page">

            <div className="event-card">

                <span className="event-status">
                    {event.status}
                </span>

                <h1>{event.title}</h1>

                <p className="event-description">
                    {event.description}
                </p>

                <div className="event-info">

                    <p>📍 {event.venue}</p>

                    <p>📅 {event.event_date}</p>

                    <p>⏰ {event.start_time}</p>

                    <p>🎟️ Ticket Price: ₹{event.ticket_price}</p>

                    <p>👥 Capacity: {event.capacity}</p>

                </div>

                <button className="view-button" 
                    onClick={() => navigate(`/events/${id}/register`)}>
                    Register Now
                </button>

            </div>

        </div>
    );
}

export default EventDetails;