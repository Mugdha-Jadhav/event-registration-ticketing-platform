import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
    const [stats, setStats] = useState({
        events: 0,
        registrations: 0,
        payments: 0,
        revenue: 0,
        attendance: 0
    });

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load dashboard statistics and events
    useEffect(() => {
        async function loadDashboard() {
            try {
                const statsResponse = await api.get(
                    "/admin/dashboard"
                );

                const eventsResponse = await api.get(
                    "/events"
                );

                setStats(statsResponse.data.stats);
                setEvents(eventsResponse.data.events);

            } catch (error) {
                console.log(
                    "Dashboard error:",
                    error
                );
            }
        }

        loadDashboard();
    }, []);

    // Load event-specific data
    const loadEventData = async (eventId, type) => {
        try {
            setLoading(true);
            setSelectedEvent(eventId);
            setSelectedType(type);

            let response;

            if (type === "registrations") {
                response = await api.get(
                    `/admin/events/${eventId}/registrations`
                );

                setEventData(
                    response.data.registrations
                );
            }

            if (type === "payments") {
                response = await api.get(
                    `/admin/events/${eventId}/payments`
                );

                setEventData(
                    response.data.payments
                );
            }

            if (type === "attendance") {
                response = await api.get(
                    `/admin/events/${eventId}/attendance`
                );

                setEventData(
                    response.data.attendance
                );
            }

        } catch (error) {
            console.log(
                "Event data error:",
                error
            );

            setEventData([]);
        } finally {
            setLoading(false);
        }
    };

    const selectedEventDetails = events.find(
        (event) => event.id === selectedEvent
    );

    return (
        <div className="events-page">

            {/* HEADER */}

            <div className="events-header">

                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage events, registrations,
                        payments and attendance.
                    </p>

                    <button
                        className="create-event-button"
                        onClick={() =>
                            window.location.href =
                            "/admin/create-event"
                        }
                    >
                        + Create New Event
                    </button>

                </div>


            {/* DASHBOARD STATISTICS */}

            <div className="events-container">

                <div className="event-card">
                    <h2>🎟️ Events</h2>
                    <h1>{stats.events}</h1>
                    <p>Total Events</p>
                </div>

                <div className="event-card">
                    <h2>👥 Registrations</h2>
                    <h1>{stats.registrations}</h1>
                    <p>Total Registrations</p>
                </div>

                <div className="event-card">
                    <h2>💳 Payments</h2>
                    <h1>{stats.payments}</h1>
                    <p>Successful Payments</p>
                </div>

                <div className="event-card">
                    <h2>💰 Revenue</h2>
                    <h1>₹{stats.revenue}</h1>
                    <p>Total Revenue</p>
                </div>

                <div className="event-card">
                    <h2>✅ Attendance</h2>
                    <h1>{stats.attendance}</h1>
                    <p>Total Check-ins</p>
                </div>

            </div>


            {/* EVENTS */}

            <div className="admin-section">

                <h2>📅 Events</h2>

                {events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map((event) => (
                        <div
                            className="admin-event-card"
                            key={event.id}
                        >

                            <div className="admin-event-info">

                                <span className="event-status">
                                    {event.status}
                                </span>

                                <h2>
                                    {event.title}
                                </h2>

                                <p>
                                    📅 {event.event_date}
                                </p>

                                <p>
                                    📍 {event.venue}
                                </p>

                                <p>
                                    💰 Ticket Price:
                                    ₹{event.ticket_price}
                                </p>

                                <p>
                                    👥 Capacity:
                                    {event.capacity}
                                </p>

                            </div>


                            {/* EVENT ACTIONS */}

                            <div className="admin-event-buttons">

                                <button
                                    onClick={() =>
                                        loadEventData(
                                            event.id,
                                            "registrations"
                                        )
                                    }
                                >
                                    👥 Registrations
                                </button>

                                <button
                                    onClick={() =>
                                        loadEventData(
                                            event.id,
                                            "payments"
                                        )
                                    }
                                >
                                    💳 Payments
                                </button>

                                <button
                                    onClick={() =>
                                        loadEventData(
                                            event.id,
                                            "attendance"
                                        )
                                    }
                                >
                                    ✅ Attendance
                                </button>

                            </div>

                        </div>
                    ))
                )}

            </div>


            {/* EVENT DATA */}

            {selectedEvent && (
                <div className="admin-section">

                    <h2>
                        {selectedEventDetails?.title}
                    </h2>

                    <p>
                        Showing:
                        {" "}
                        <strong>
                            {selectedType}
                        </strong>
                    </p>

                    <br />

                    {loading ? (
                        <p>Loading data...</p>
                    ) : eventData.length === 0 ? (
                        <p>
                            No {selectedType} found
                            for this event.
                        </p>
                    ) : (

                        <div className="table-container">

                            {/* REGISTRATIONS */}

                            {selectedType ===
                                "registrations" && (

                                <table>

                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {eventData.map(
                                            (item) => (
                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                >
                                                    <td>
                                                        {
                                                            item
                                                                .users
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item
                                                                .users
                                                                ?.email
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item
                                                                .users
                                                                ?.phone
                                                        }
                                                    </td>

                                                    <td>
                                                        {new Date(
                                                            item.registration_date
                                                        ).toLocaleString()}
                                                    </td>

                                                    <td>
                                                        {
                                                            item.status
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>
                            )}


                            {/* PAYMENTS */}

                            {selectedType ===
                                "payments" && (

                                <table>

                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Amount</th>
                                            <th>Payment ID</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {eventData.map(
                                            (item) => (
                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            item
                                                                .registrations
                                                                ?.users
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item
                                                                .registrations
                                                                ?.users
                                                                ?.email
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {
                                                            item.amount
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item.payment_id
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item.payment_status
                                                        }
                                                    </td>

                                                    <td>
                                                        {new Date(
                                                            item.payment_date
                                                        ).toLocaleString()}
                                                    </td>

                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>
                            )}


                            {/* ATTENDANCE */}

                            {selectedType ===
                                "attendance" && (

                                <table>

                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Ticket Number</th>
                                            <th>Check-in Time</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {eventData.map(
                                            (item) => (
                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            item
                                                                .tickets
                                                                ?.registrations
                                                                ?.users
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item
                                                                .tickets
                                                                ?.registrations
                                                                ?.users
                                                                ?.email
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item
                                                                .tickets
                                                                ?.ticket_number
                                                        }
                                                    </td>

                                                    <td>
                                                        {new Date(
                                                            item.check_in_time
                                                        ).toLocaleString()}
                                                    </td>

                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>
                            )}

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}

export default AdminDashboard;