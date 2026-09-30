import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import api from "../services/api";

function Ticket() {
    const { id } = useParams();

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        async function loadTicket() {
            try {
                const response = await api.get(`/tickets/${id}`);

                setTicket(response.data.ticket);
            } catch (error) {
                console.log("Error loading ticket:", error);
            }
        }

        loadTicket();
    }, [id]);

    if (!ticket) {
        return <h2>Loading ticket...</h2>;
    }

    const registration = ticket.registrations;
    const user = registration.users;
    const event = registration.events;

    return (
        <div className="events-page">
            <div className="event-card">

                <span className="event-status">
                    {ticket.status}
                </span>

                <h1>{event.title}</h1>

                <p className="event-description">
                    {event.description}
                </p>

                <div className="event-info">

                    <p>🎟️ Ticket Number:</p>

                    <h2>{ticket.ticket_number}</h2>

                    <p>👤 Name: {user.name}</p>

                    <p>📧 Email: {user.email}</p>

                    <p>📱 Phone: {user.phone}</p>

                    <p>📍 {event.venue}</p>

                    <p>📅 {event.event_date}</p>

                    <p>⏰ {event.start_time}</p>

                </div>

                <div style={{ textAlign: "center", margin: "25px 0" }}>

                    <h3>Scan QR Code</h3>

                    <br />

                    <QRCodeCanvas
                        value={ticket.id}
                        size={320}
                        level="H"
                    />

                    <p style={{ marginTop: "10px" }}>
                        Show this QR code at the event entrance.
                    </p>

                </div>

                <button className="view-button">
                    Download Ticket
                </button>

            </div>
        </div>
    );
}

export default Ticket;