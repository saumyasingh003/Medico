import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import { TbUrgent } from "react-icons/tb";

const Specialization = () => {
  const carouselRef = React.useRef();

  const items = [
    { id: 1, title: "Emergency", icon: <TbUrgent /> },
    { id: 2, title: "Urgent Care" },
    { id: 3, title: "Pediatrics", definition: "The branch of medicine that involves the medical care of infants, children, and adolescents." },
    { id: 4, title: "Surgery", definition: "A medical specialty that uses operative techniques to investigate and treat a pathological condition." },
    { id: 5, title: "Cardiology", definition: "The study and treatment of heart disorders and diseases." },
    { id: 6, title: "Dermatology", definition: "The branch of medicine dealing with the skin, nails, hair, and its diseases." },
    { id: 7, title: "Orthopedics", definition: "The branch of medicine concerned with the diagnosis and treatment of musculoskeletal system disorders." },
    { id: 8, title: "Neurology", definition: "The branch of medicine dealing with disorders of the nervous system." },
    { id: 9, title: "Gastroenterology", definition: "The branch of medicine focused on the digestive system and its disorders." },
    { id: 10, title: "Oncology", definition: "The study and treatment of tumors, particularly cancer." }
  ];

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
        {items.map((item) => (
          <div key={item.id} className="carousel-item">
            <div className="group relative shadow-xl m-4 bg-[#2F5CA2] text-white rounded-2xl p-4 h-60 flex flex-col items-center justify-center transition-transform duration-300">
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2 text-white group-hover:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <div className="font-bold text-xl text-center text-white group-hover:text-2xl transform group-hover:scale-110 transition-transform duration-300">
                  {item.title}
                </div>
              </div>
              
              {/* Centered Definition on Hover */}
              {item.definition && (
                <div className="absolute inset-0 flex  p-4 items-center justify-center bg-white text-gray-500 text-sm rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  {item.definition}
                </div>
              )}
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

export default Specialization;
