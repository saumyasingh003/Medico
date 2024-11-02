import React, { useEffect, useState } from "react";
import { FaSmileBeam } from "react-icons/fa";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(""); // To store the selected message for the modal
  const [error, setError] = useState(null); // To manage error messages

  const toggleModal = (message) => {
    setSelectedMessage(message); // Set the selected message for the modal
    setIsModalOpen(!isModalOpen);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:4000/message/view");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setFeedbacks(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMessages(); 
  }, []);

  return (
    <div className=" ">
      <div className="mt-28 flex flex-col justify-center relative">
        <h1 className="text-4xl text-center   font-bold text-[#007162] mb-2 flex items-center justify-center">
          FeedBacks That You Should Know !!
          <FaSmileBeam size={60} className="text-yellow-400 ml-2" />
        </h1>
      </div>
      <div className="mt-10  ">
        {/* Error message display */}
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full overflow-x-auto  border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#007162] text-white">
              <th className="border border-gray-300 px-4 py-2">
                First Name
              </th>
              <th className="border border-gray-300 px-4 py-2 ">
                Last Name
              </th>
              <th className="border border-gray-300 px-4 py-2 ">
                Message
              </th>
              <th className="border border-gray-300 px-4 py-2 ">Email</th>
              <th className="border border-gray-300 px-4 py-2 ">Phone</th>
              <th className="border border-gray-300 px-4 py-2 ">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.firstname}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.lastname}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                <div className="text-center">
                <button
                    className="text-blue-500"
                    onClick={() => toggleModal(feedback.message)} // Pass the message to the modal
                  >
                    View 
                  </button>
                </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Full Message */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-2">Full Message</h2>
              <p className="text-green-500">{selectedMessage}</p>{" "}
              {/* Display the selected message */}
              <button
                className="mt-4 px-4 py-2 bg-[#007162] text-white rounded"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
