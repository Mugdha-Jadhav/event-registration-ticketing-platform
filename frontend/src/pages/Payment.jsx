import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Payment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            // Get registration details
            const registrationResponse = await api.get(
                `/registrations/${id}`
            );

            const registration =
                registrationResponse.data.registration;

            // Demo payment
            const paymentResponse = await api.post(
                "/payments/demo",
                {
                    registration_id: id,
                    amount: registration.events.ticket_price
                }
            );

            if (paymentResponse.data.success) {
                alert("Demo payment successful!");

                // Generate ticket after payment
                const ticketResponse = await api.post(
                    `/registrations/${id}/ticket`
                );

                navigate(
                    `/ticket/${ticketResponse.data.ticket.id}`
                );
            }

        } catch (error) {
            console.log("Payment error:", error);

            alert(
                error.response?.data?.error ||
                "Payment failed!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="events-page">

            <div className="event-card">

                <h1>Demo Payment</h1>

                <p className="event-description">
                    This is a simulated payment for the
                    college project.
                </p>

                <div className="event-info">

                    <p>💳 Payment Mode: Demo</p>

                    <p>
                        🔒 No real money will be charged.
                    </p>

                </div>

                <button
                    className="view-button"
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading
                        ? "Processing..."
                        : "Pay Now (Demo)"}
                </button>

            </div>

        </div>
    );
}

export default Payment;