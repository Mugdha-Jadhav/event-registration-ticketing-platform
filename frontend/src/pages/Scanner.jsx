import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../services/api";

function Scanner() {
    const scannerRef = useRef(null);
    const [message, setMessage] = useState(
        "Starting camera..."
    );

    useEffect(() => {
        let isMounted = true;

        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        async function startScanner() {
            try {
                await scanner.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: 250
                    },
                    async (decodedText) => {
                        console.log("QR detected:", decodedText);

                        if (!isMounted) {
                            return;
                        }

                        try {
                            setMessage("Checking ticket...");

                            await scanner.stop();

                            const response = await api.post(
                                `/attendance/check-in/${decodedText}`
                            );

                            setMessage(
                                `✅ ${response.data.message}`
                            );

                        } catch (error) {
                            console.log("Attendance error:", error);

                            setMessage(
                                error.response?.data?.error ||
                                "Unable to mark attendance."
                            );
                        }
                    },
                    () => {
                        // Ignore QR scanning errors
                    }
                );

                if (isMounted) {
                    setMessage(
                        "Camera ready. Point it at a QR code."
                    );
                }
            } catch (error) {
                console.log("Camera start error:", error);

                if (isMounted) {
                    setMessage(
                        "Could not start camera."
                    );
                }
            }
        }

        startScanner();

        return () => {
            isMounted = false;

            if (scannerRef.current) {
                scannerRef.current
                    .isScanning
                    ? scannerRef.current
                        .stop()
                        .catch(() => {})
                    : null;
            }
        };
    }, []);

    return (
        <div className="events-page">
            <div className="event-card">

                <h1>QR Scanner</h1>

                <p className="event-description">
                    Point the camera at a QR code.
                </p>

                <div
                    id="qr-reader"
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        margin: "20px auto"
                    }}
                ></div>

                <h3 style={{ textAlign: "center" }}>
                    {message}
                </h3>

            </div>
        </div>
    );
}

export default Scanner;