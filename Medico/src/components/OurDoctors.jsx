import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

const OurDoctors = () => {
  const carouselRef = React.useRef();
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/doctor/viewDoctor"); 
        if (response.data.success) {
          setDoctors(response.data.doctors); 
        } else {
          throw new Error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(error.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Carousel
        ref={carouselRef}
        infinite={true}
        dots={false}
        slidesToShow={5}
        slidesToScroll={1}
        responsive={responsiveSettings}
      >
        {doctors.map((doctor) => (
          <div key={doctor._id} className="carousel-item">
            <div className="group relative shadow-xl m-4 bg-[#41a998]  text-black rounded-2xl p-4 h-60 flex flex-col items-center justify-between transition-transform duration-300">
              <div className="flex flex-col items-center">
                <img
                  src={doctor.avatar.url} // Update to the correct path for the photo
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full mb-2" // Adjust size as necessary
                />
                <div className=" text-sm text-center text-white">
                   Dr.{" "}{doctor.firstname}{" "}{doctor.lastname}
                </div>
                <div className="text-sm text-white">{doctor.doctorDepartment} </div>
                <div className="text-sm text-white">{doctor.experience} + years of experience</div>
                <div className="text-sm text-white">{doctor.email}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <LeftOutlined
        onClick={() => carouselRef.current.prev()}
        className="bg-white shadow-lg rounded-full p-3 absolute top-[50%] left-10"
      />
      <RightOutlined
        onClick={() => carouselRef.current.next()}
        className="bg-white shadow-lg rounded-full p-3 absolute right-10 top-[50%]"
      />
    </div>
  );
};

export default OurDoctors;
