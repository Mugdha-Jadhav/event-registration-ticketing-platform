import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
    const navigate = useNavigate();

    return (
        <div className="event-card">

            <div className="event-card-content">

                <span className="event-status">
                    {event.status}
                </span>

                <h2>{event.title}</h2>

                <p className="event-description">
                    {event.description}
                </p>

                <div className="event-info">
                    <p>📍 {event.venue}</p>
                    <p>📅 {event.event_date}</p>
                    <p>⏰ {event.start_time}</p>
                </div>

                <div className="event-bottom">

                    <div>
                        <span className="price-label">
                            Ticket Price
                        </span>

                        <strong>
                            ₹{event.ticket_price}
                        </strong>
                    </div>

                    <div>
                        <span className="price-label">
                            Capacity
                        </span>

                        <strong>
                            {event.capacity}
                        </strong>
                    </div>

                </div>

                <button
                    className="view-button"
                    onClick={() => navigate(`/events/${event.id}`)}
                >
                    View Details
                </button>

            </div>

        </div>
    );
}

export default EventCard;