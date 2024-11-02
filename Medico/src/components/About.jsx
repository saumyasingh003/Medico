import React from "react";
import doctor from "../assets/doctor2.jpg";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.avif";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.avif";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.png";
import { motion } from "framer-motion";
const About = () => {
  return (
    <div>
      <div className="mt-8 justify-center relative ">
        <div className="md:m-0 ">
        <div className="overflow-x-hidden px-10">
      <div className="flex md:justify-between flex-col md:flex-row mx-auto  sm:px-4 bg-[#2a9082] mt-10 md:mt-28 p-8 rounded-lg w-full lg:h-[50vh] md:h-[35vh] h-full">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start md:pl-10 lg:mt-28 md:w-1/2">
          <h1 className="lg:text-2xl sm:text-xl text-center md:text-left text-[#151414] font-bold">
            The Ultimate Solution for All The{" "}
            <span className="text-[#e2dcdc]">Health Issues</span>
            <br />
            and Explore <span className="text-[#FFBD24]">Better Life</span>
          </h1>
          <button className="mt-6 md:py-3 py-2 md:px-8 px-4 bg-[#FFF9FA] text-[#FE4053] font-medium border border-[#FE4053] rounded-md hover:bg-red-50 md:text-md text-sm">
            Explore Us
          </button>
        </div>

        {/* Right Section with Scrolling Images */}
        <div className="relative w-2/5 gap-3 flex items-center justify-center overflow-hidden">
          {/* Left Column (Scroll Up) */}
          <div className="hidden md:flex flex-col space-y-4 h-full overflow-hidden">
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ y: 0 }}
              animate={{ y: ["0%", "-100%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(3)].map((_, index) => (
                <img
                  key={index}
                  src={doctor}
                  alt={`Scrolling Image ${index + 1}`}
                  className="h-48 w-auto object-cover rounded-lg shadow-md"
                />
              ))}
            </motion.div>
          </div>

          {/* Right Column (Scroll Down) */}
          <div className="hidden md:flex flex-col space-y-4 h-full overflow-hidden">
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ y: 0 }}
              animate={{ y: ["-100%", "0%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].map((_, index) => (
                <img
                  key={index + 3}
                  src={doctor}
                  alt={`Scrolling Image ${index + 4}`}
                  className="h-48 w-auto object-cover rounded-lg shadow-md"
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile View Grid */}
        <div className="mt-10 grid grid-cols-3 gap-4 md:hidden">
          {[doctor, doctor].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Grid Image ${index + 1}`}
              className="h-32 w-52 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>
    </div>

          <div className="bg-white py-12 px-6 ">
            <h1 className="text-3xl font-bold text-center text-[#007162] mb-6">
              Our Overview
            </h1>

            <p className="text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
              We are the{" "}
              <span className="font-semibold text-[#2F5CA2]">
                fourth largest healthcare provider
              </span>{" "}
              in terms of bed capacity in{" "}
              <span className="font-semibold text-[#2F5CA2]">
                North and Central India
              </span>
              , including{" "}
              <span className="font-semibold text-[#2F5CA2]">
                Bihar and Jharkhand
              </span>
              , with an aggregate of{" "}
              <span className="font-semibold text-[#2F5CA2]">2,500 beds</span>{" "}
              as of{" "}
              <span className="font-semibold text-[#2F5CA2]">
                September 30, 2024
              </span>
              . (Source: CRISIL Report)
              <br />
              <br />
              We operate{" "}
              <span className="font-semibold text-[#2F5CA2]">
                nine hospitals
              </span>{" "}
              under the “Paras Health” brand, located across{" "}
              <span className="font-semibold text-[#2F5CA2]">six states</span>{" "}
              in{" "}
              <span className="font-semibold text-[#2F5CA2]">
                North and Central India
              </span>{" "}
              – <span className="font-semibold">Gurugram</span> and{" "}
              <span className="font-semibold">Faridabad</span> in{" "}
              <span className="font-semibold">Haryana</span>;{" "}
              <span className="font-semibold">Patna</span> and territory of{" "}
              <span className="font-semibold">Jammu and Kashmir</span>.
              <br />
              <br />
              Our core focus is on providing specialized tertiary medical care
              in{" "}
              <span className="font-semibold text-[#2F5CA2]">
                Tier 2 and 3 cities
              </span>
              , aiming to balance quality healthcare services with
              affordability. Across our hospitals, we offer multiple clinical
              specialties, including{" "}
              <span className="font-semibold">
                cardiac sciences, oncology, neurology, gastroenterology, and
                orthopedics
              </span>
              .
              <br />
              Over the years, we’ve successfully targeted underserved markets
              characterized by large catchment areas and a high demand for
              healthcare services, limited existing healthcare infrastructure,
              and proximity to medical colleges for sourcing skilled
              professionals. As a result of our deep knowledge of the regional
              healthcare market and strategic market entry, we have maintained a{" "}
              <span className="font-semibold text-[#2F5CA2]">
                first-mover advantage
              </span>{" "}
              in multiple areas. For example, our hospital in{" "}
              <span className="font-semibold">Gurugram</span> was the{" "}
              <span className="font-semibold">first corporate hospital</span> to
              enter the city in <span className="font-semibold">2008</span>, and
              our <span className="font-semibold">Srinagar hospital</span> is
              now the{" "}
              <span className="font-semibold">largest private hospital</span>{" "}
              there in terms of bed capacity, with{" "}
              <span className="font-semibold">250 beds</span>. (Source: CRISIL
              Report).
            </p>
          </div>

          <div className="bg-white py-12 px-6 lg:px-20">
            <h1 className="text-3xl font-bold text-center text-[#007162] mb-6">
              Our Gallery
            </h1>
            <div className="w-full mt-10 px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                <div className="p-2">
                  <img
                    className="w-full h-60 object-cover rounded-lg shadow-md"
                    src={img1}
                    alt=""
                  />
                </div>
                <div className="p-2">
                  <img
                    className="w-full h-60 object-cover rounded-lg shadow-md"
                    src={img2}
                    alt=""
                  />
                </div>
                <div className="p-2">
                  <img
                    className="w-full h-60 object-cover rounded-lg shadow-md"
                    src={img3}
                    alt=""
                  />
                </div>
                <div className="p-2">
                  <img
                    className="w-full h-60 object-cover rounded-lg shadow-md"
                    src={img4}
                    alt=""
                  />
                </div>
                <div className="p-2">
                  <img
                    className="w-full h-60 object-cover rounded-lg shadow-md"
                    src={img5}
                    alt=""
                  />
                </div>
                <div className="p-2">
                  <img
                    className="w-full h-60 object-cover rounded-lg shadow-md"
                    src={img6}
                    alt=""
                  />
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
