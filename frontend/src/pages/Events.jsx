import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function loadEvents() {
            try {
                const response = await api.get("/events");
                setEvents(response.data.events);
            } catch (error) {
                console.log("Error loading events:", error);
            }
        }

        loadEvents();
    }, []);

    return (
        <div className="events-page">

            <div className="events-header">
                <h1>Upcoming Events</h1>

                <p>
                    Discover and register for exciting college events.
                </p>
            </div>

            <div className="events-container">

                {events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                        />
                    ))
                )}

            </div>

        </div>
    );
}

export default Events;