import React, { useEffect } from "react";
import FlowingMenu from "../../components/FlowingMenu";
import { useServicesStore } from "../../store/servicesStore";

const Services = () => {
  const { services, loadServices } = useServicesStore();

  useEffect(() => {
    loadServices();
  }, []);

  const items = (services || []).map((s) => ({
    link: `service-details/${s?.id}`,
    text: s?.title,
    image: s?.media,
  }));

  return (
    <div className="section mt-16 relative font-hero-light flex flex-col mx-auto    z-10 w-full justify-center">
      <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
        <h1 className=" md:text-center font-bold text-[18px] md:text-[32px] ">
          What We Do Best
        </h1>
        <button className="bg-white hover:bg-transparent transition duration-75 ease-in hover:text-white border border-white px-2 h-8 md:h-10 text-[11px] text-black rounded-full uppercase">
          Explore Projects
        </button>
      </div>

      <div
        className="hidden md:block"
        style={{ position: "relative", height: "100%" }}
      >
        <FlowingMenu items={items} />
      </div>
      <div className="mobile-view flex flex-col md:hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex pb-4 justify-center text-[20px] mb-4 ${
              index < items.length - 1 ? "border-white border-b-2" : ""
            }`}
            data-aos="flip-up"
            data-aos-delay={index * 150}
            data-aos-duration="600"
            data-aos-easing="ease-out-cubic"
            data-aos-once="false"
            data-aos-mirror="true"
          >
            <h2 className="text-lg font-semibold mt-2">{item.text}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
