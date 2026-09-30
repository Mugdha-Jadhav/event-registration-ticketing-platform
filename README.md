# Event Registration & Ticketing Platform

A web-based Event Registration & Ticketing Platform developed as a college capstone project.

The system allows participants to view events, register for events, complete a demo payment, receive a digital ticket with a QR code, and have their attendance verified through QR scanning.

Administrators can log in, create events, view event statistics, and monitor registrations, payments, and attendance.

---

## Features

### Participant Features

- View available events
- View complete event details
- Register for an event
- Enter participant information
- Complete demo payment
- Generate a digital ticket
- Generate a unique QR code
- View ticket information
- QR-based attendance check-in
- Prevent duplicate attendance check-in

### Admin Features

- Admin login
- View dashboard statistics
- View all events
- Create new events
- View event-wise registrations
- View event-wise payments
- View event-wise attendance

---

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- Axios
- React Router
- QRCode React
- HTML5 QR Code

### Backend

- Node.js
- Express.js
- JavaScript
- CORS
- JWT

### Database

- Supabase
- PostgreSQL

### Other Technologies

- QR Code generation
- QR Code scanning
- REST API
- Demo payment system

---

## Project Structure

```text
LaunchED Capstone Project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── EventCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── Ticket.jsx
│   │   │   ├── Scanner.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CreateEvent.jsx
│   │   │   └── AdminLogin.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── controllers/
│   │   ├── eventController.js
│   │   ├── registrationController.js
│   │   ├── ticketController.js
│   │   ├── attendanceController.js
│   │   ├── paymentController.js
│   │   ├── adminController.js
│   │   └── authController.js
│   │
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   ├── registrationRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── adminRoutes.js
│   │   └── authRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md