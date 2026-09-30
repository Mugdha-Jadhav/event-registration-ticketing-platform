import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Ticket from "./pages/Ticket";
import Scanner from "./pages/Scanner";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import AdminLogin from "./pages/AdminLogin";

function App() {
    return (
        <BrowserRouter>

            <Routes>

              <Route
                  path="/admin/login"
                  element={<AdminLogin />}
              />

              <Route
                  path="/admin/create-event"
                  element={<CreateEvent />}
              />

              <Route
                path="/admin"
                element={<AdminDashboard />}
            />

              <Route
                  path="/payment/:id"
                  element={<Payment />}
              />

              <Route path="/scanner" element={<Scanner />} />
                <Route
                    path="/ticket/:id"
                    element={<Ticket />}
                />
                <Route
                    path="/"
                    element={<Events />}
                />

                <Route
                    path="/events/:id"
                    element={<EventDetails />}
                />

                <Route
                    path="/events/:id/register"
                    element={<Register />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;