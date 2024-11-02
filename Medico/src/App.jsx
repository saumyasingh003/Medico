import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Appointment from "./components/Appointment";
import Doctors from "./components/Doctors";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { AuthProvider } from "./components/context_api/AuthContext";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/appointment"
          element={
            <ProtectedRoute requiredRole="patient">
              <Appointment />
            </ProtectedRoute>
          }
        />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
