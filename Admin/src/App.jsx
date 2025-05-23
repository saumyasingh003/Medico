import Dashboard from "./Components/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddDoctor from "./Components/AddDoctor";
import AddNewAdmin from "./Components/AddNewAdmin";
import Doctor from "./Components/Doctor";
import Feedback from "./Components/Feedback";
import Layout from "./Layout";
import Login from "./Components/Login";
import Appointment from "./Components/Appointment";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";

function App() {
  return (
    <div className="container">
  
        <Navbar />
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path = "/" element={<Navigate to='/admin/login'/>}/>
          <Route path="/adminfile
          " element={<ProtectedRoute requiredRole="admin"><Layout /></ProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointment />} />
            <Route path="doctor/addnew" element={<AddDoctor />} />
            <Route path="addnew" element={<AddNewAdmin />} />
            <Route path="feedbacks" element={<Feedback />} />
            <Route path="doctors" element={<Doctor />} />
          </Route>
        </Routes>
      
    </div>
  );
}

export default App;
