import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarCheck } from "react-icons/fa";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://medico-backend-wp55.onrender.com/appointment/view"
        );
        if (response.data.success) {
          setAppointments(response.data.appointments);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const StatusDropdown = ({ appointment }) => {
    const [status, setStatus] = useState(appointment.status);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleStatusChange = (newStatus) => {
      setStatus(newStatus);
      setShowDropdown(false);
    };

    return (
      <div className="relative">
        <div
          className={`py-1 px-3 rounded cursor-pointer uppercase ${
            status === "pending"
              ? "bg-blue-500 text-white"
              : status === "accepted"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
          style={{ zIndex: 1000 }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {status}
        </div>

        {showDropdown && (
          <div className="absolute top-full mt-1 w-full bg-white  z-20 shadow-lg rounded">
            <div
              onClick={() => handleStatusChange("pending")}
              className="py-1 px-3 hover:bg-blue-500 hover:text-white cursor-pointer rounded uppercase"
            >
              Pending
            </div>
            <div
              onClick={() => handleStatusChange("accepted")}
              className="py-1 px-3 hover:bg-green-500 hover:text-white cursor-pointer rounded uppercase"
            >
              Accepted
            </div>
            <div
              onClick={() => handleStatusChange("rejected")}
              className="py-1 px-3 hover:bg-red-500 hover:text-white cursor-pointer rounded uppercase"
            >
              Rejected
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="mt-28 flex flex-col justify-center">
        <h1 className="text-4xl text-center font-bold text-[#007162] mb-2 flex items-center justify-center">
          Appointment We Got Today!!
          <FaCalendarCheck size={60} className="text-yellow-400 ml-2" />
        </h1>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Appointments ({appointments.length})
        </h2>
        <div className="flex justify-center w-full">
          <table className="table-auto bg-white shadow-md rounded-lg border border-gray-300 overflow-x-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal border-b border-gray-300">
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">First Name</th>
                <th className="py-2 px-3 text-left">Last Name</th>
                <th className="py-2 px-3 text-left">Doctor</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Phone</th>
                <th className="py-2 px-3 text-left">Address</th>
                <th className="py-2 px-3 text-left">DOB</th>
                <th className="py-2 px-3 text-left">Gender</th>
                <th className="py-2 px-3 text-left">Department</th>
                <th className="py-2 px-3 text-left">Visited</th>
                <th className="py-2 px-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {appointments.map((appointment, index) => (
                <tr
                  key={appointment._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-3 text-left">{index + 1}</td>
                  <td className="py-2 px-3 text-left">
                    {appointment.firstname}
                  </td>
                  <td className="py-2 px-3 text-left">
                    {appointment.lastname}
                  </td>
                  <td className="py-2 px-3 text-left uppercase">{`${appointment.doctorFirstname} ${appointment.doctorLastname}`}</td>
                  <td className="py-2 px-3 text-left">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 text-left">{appointment.email}</td>
                  <td className="py-2 px-3 text-left">{appointment.phone}</td>
                  <td className="py-2 px-3 text-left">{appointment.address}</td>
                  <td className="py-2 px-3 text-left">
                    {new Date(appointment.dob).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 text-left">{appointment.gender}</td>
                  <td className="py-2 px-3 text-left">
                    {appointment.department}
                  </td>
                  <td className="py-2 px-3 text-left uppercase">
                    {appointment.hasVisited}
                  </td>
                  <td className="py-2 px-3 text-left">
                    <StatusDropdown appointment={appointment} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
