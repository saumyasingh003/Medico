import React, { useState } from "react";
import axios from "axios";
import doctor2 from "../assets/doctor2.jpg";
import toast, { Toaster } from 'react-hot-toast';

const FeedBackForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/message/send", {
        firstname,
        lastname,
        email,
        phone,
        message,
      });

      toast.success(response.data.message || "Message sent successfully!!", {
        style: {
          marginRight:'4px',
          padding: '16px', 
          borderRadius: '8px',
          border: '2px solid  green'
         
        },
      });

      // Reset form fields after submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred !!", {
        style: {
          marginRight:'4px',
          padding: '16px',    
          borderRadius: '8px', 
           border: '2px solid red',
           
        },
      });
    }
  };

  return (
    <div className="justify-center mb-10 mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl text-center font-bold text-[#007162]">
        Send Us Your Feedback..
      </h1>
      <div className="flex items-center justify-center space-x-6">
        <div className="w-[50%] flex flex-col items-center">
          <img
            src={doctor2}
            className="w-[450px] h-[450px] rounded-lg object-cover"
            alt="Doctor"
          />
          <p className="text-center text-[#007162] text-xl font-bold shadow-2xl rounded-lg">
            Your Feedback Matters!!
          </p>
        </div>
        <div className="w-[60%] mt-6">
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex space-x-8 mb-5">
              <input
                type="text"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <input
                type="text"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5 h-24"
            />

            <div className="text-center">
              <button
                type="submit"
                className="w-[20em] bg-[#007162] text-white font-semibold text-sm rounded-lg py-2.5 hover:bg-[#005f4a] transition"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedBackForm;
