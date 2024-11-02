import React from "react";
import picture from "../assets/picture.png";
import doctor from "../assets/doctor.png";
import Specialization from "./Specialization";
import FeedBackForm from "./FeedBackForm";
import OurDoctors from "./OurDoctors";

const Home = () => {
  return (
    <div className="  mt-16 mx-auto ">
      {/* Hospital Image */}
      <div className="p-8 ">
        <img
          src={picture}
          alt="Medico Hospital"
          className="w-[100em] max-w-8xl h-[40em] rounded-xl shadow-lg "
        />
      </div>

      {/* About Section */}
      <div className="mt-8 flex flex-col justify-center ">
        <h1 className="text-4xl  text-center font-bold text-[#007162] mb-2 ">
          About The Medico..
        </h1>

        <div className="flex items-center justify-between   ml-6  mb-2">
          <div className="w-1/2">
            <p className="text-gray-700 ">
              Medico, Patna, stands at the forefront of Bihar's healthcare
              landscape with its distinguished 200-bed multi-specialty tertiary
              care facility. Recognized for pioneering medical and surgical
              interventions, it has garnered patient confidence through advanced
              infrastructure and round-the-clock emergency services. As part of
              Medico Health's mission to promote a healthier Bharat, it operates
              a network of 8 hospitals across North and East India, providing
              accessible, high-quality healthcare.Medico excels in over 450
              specialties, encompassing Cardio Sciences, Gynecology,
              Neurosciences, Oncology, and Gastroenterology, supported by a team
              of top-tier physicians who deliver personalized, comprehensive
              care. Upholding a commitment to excellence.
            </p>
          </div>
          <div className="">
            <img src={doctor} alt="Doctor" className="w-full  mx-auto " />
          </div>
        </div>
      </div>
      {/* our Specialization */}
      <div className=" container mt-8 flex flex-col justify-center relative ">
        <h1 className="text-4xl text-center font-bold text-[#007162] mb-2  ">
          Our Specialization
        </h1>
        <div className=" mt-10 ">
          <Specialization />
        </div>
        </div>


        <div className=" container mt-8 flex flex-col justify-center relative ">
        <h1 className="text-4xl text-center font-bold text-[#007162] mb-2 ml-9  ">
          Our Specialized Doctors
        </h1>
        <div className=" mt-10 ">
        <OurDoctors />
        </div>
       
        <FeedBackForm />
      </div>
    </div>
  );
};

export default Home;
