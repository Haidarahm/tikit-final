import React, { useState } from "react";
import FloatingInput from "../../components/ui/FloatingInput";
import Hyperspeed from "../../components/Hyperspeed";
import LogoLoop from "../../components/LogoLoop";
import b1 from "../../assets/brands/1.svg";
import b2 from "../../assets/brands/2.svg";
import b3 from "../../assets/brands/3.svg";
import b4 from "../../assets/brands/4.svg";
import b5 from "../../assets/brands/5.svg";

const ContactUs = ({ className = "" }) => {
  const [isSecondSlide, setIsSecondSlide] = useState(false);

  const handleSlideClick = (slideNumber) => {
    setIsSecondSlide(slideNumber === 2);
  };

  const imageLogos = [
    { src: b1, alt: "Brand 1" },
    { src: b2, alt: "Brand 2" },
    { src: b3, alt: "Brand 3" },
    { src: b4, alt: "Brand 4" },
    { src: b5, alt: "Brand 5" },
  ];
  return (
    <div
     data-scroll-section
      className={`relative my-5 md:my-10 gap-3.5  overflow-hidden text-white  font-hero-light rounded-[25px] flex flex-col mx-auto py-[40px] md:py-[60px] px-[40px] md:px-[50px]  w-[95vw] bg-black ${className}`}
    >
      <div className="email  w-full flex flex-col md:flex-row h-2/3 justify-between items-center md:items-stretch relative z-10 ">
        <div className="texts flex justify-between flex-col relative   ">
          <h3 className="subtitle text-center md:text-start text-[16px] md:text-[50px]">
            Kick it off with Tikit!
          </h3>
          <h1 className="title text-[32px] text-center md:text-start md:text-[70px] font-bold">
            contact us now
          </h1>
          <p className="description hidden md:block text-[16px] md:text-[24px] font-light w-full">
            We want to hear from you. let’s us know{" "}
            <br className="hidden md:block" /> how we can help!
          </p>
        </div>
        <div className="action w-full md:w-[45%] gap-[20px] md:gap-0 flex-col flex justify-between">
          <div className="title text-center font-light md:font-medium md:text-start text-[20px] md:text-[24px]">
            let’s us know how we can help!
          </div>
          <div className="swiper-wrapper w-full border flex relative border-white h-[50px] rounded-full">
            <div
              className={`move-item absolute w-1/2 h-full bg-white rounded-full transition-all duration-300 ease-in-out ${
                isSecondSlide ? "left-1/2" : "left-0"
              }`}
            />
            <div
              className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                !isSecondSlide ? "text-black" : "text-white"
              }`}
              onClick={() => handleSlideClick(1)}
            >
              Client
            </div>
            <div
              className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                isSecondSlide ? "text-black" : "text-white"
              }`}
              onClick={() => handleSlideClick(2)}
            >
              Influencer
            </div>
          </div>
          <div className="inputs flex justify-between gap-[20px]">
            <FloatingInput
              id="name"
              label="Name"
              containerClassName="mt-8 flex-1 hidden md:block"
            />
            <FloatingInput
              id="email"
              label="Email"
              containerClassName="mt-8 flex-1"
            />
          </div>
          <button className="w-full bg-[#303134] uppercase rounded-full py-[15px] text-[16px] md:text-[20px]">
            Contact Us
          </button>
        </div>
      </div>
      <div className="brands flex-1 w-full relative z-10">
        <div className="flex w-full justify-between items-center gap-4 mb-4">
          <div className="h-[1px] w-[42%] bg-gray-400"></div>

          <div className="title font-light text-[14px] text-center">
            20+ Brands Trust Us
          </div>

          <div className="h-[1px] w-[42%] bg-gray-400"></div>
        </div>
        <div
          style={{
            height: "120px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogoLoop
            logos={imageLogos}
            speed={50}
            direction="left"
            logoHeight={70}
            gap={150}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#000"
            ariaLabel="Brand partners"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
