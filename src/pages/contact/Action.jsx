import React, { useState } from "react";
import GradientText from "../../components/GradientText";

// FloatingInput Component (placeholder - replace with your actual component)
const FloatingInput = ({ id, label, containerClassName }) => (
  <div className={containerClassName}>
    <div className="relative">
      <input
        type="text"
        id={id}
        className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-transparent focus:border-white focus:outline-none peer"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-4 -top-2.5 bg-[#000] px-1 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  </div>
);

// GradientText Component (placeholder - replace with your actual component)

const Action = () => {
  const [isSecondSlide, setIsSecondSlide] = useState(false);

  const handleSlideClick = (slideNumber) => {
    setIsSecondSlide(slideNumber === 2);
  };

  return (
    <div
      data-scroll-section
      className="snap-start snap-always min-h-screen justify-center flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-24 xl:gap-32 py-8 md:py-12  px-4 md:px-8 lg:px-14"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start space-y-4 md:space-y-6">
        <h2 className="text-base md:text-2xl mb-0 lg:text-3xl xl:text-4xl text-white/80">
          Kick it off with Tikit!
        </h2>
        <GradientText
          colors={["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]}
          animationSpeed={5}
          showBorder={false}
          className="text-4xl md:text-5xl ml-0 lg:text-6xl text-center md:text-start font-bold leading-tight"
        >
          Contact Us Now{" "}
        </GradientText>
        {/* text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight */}
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-light text-white/90 leading-snug">
          We want to hear from you. Let us know how we can help!
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 lg:gap-10">
        {/* Toggle Switch */}
        <div className="w-full border flex relative border-white h-12 md:h-14 rounded-full">
          <div
            className={`move-item absolute w-1/2 h-full bg-white rounded-full transition-all duration-300 ease-in-out ${
              isSecondSlide ? "left-1/2" : "left-0"
            }`}
          />
          <div
            className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer text-sm md:text-base font-medium transition-colors duration-300 ${
              !isSecondSlide ? "text-black" : "text-white"
            }`}
            onClick={() => handleSlideClick(1)}
          >
            Client
          </div>
          <div
            className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer text-sm md:text-base font-medium transition-colors duration-300 ${
              isSecondSlide ? "text-black" : "text-white"
            }`}
            onClick={() => handleSlideClick(2)}
          >
            Influencer
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 flex-1">
          <FloatingInput
            id="contact-name"
            label="Name"
            containerClassName="col-span-1"
          />
          <FloatingInput
            id="contact-email"
            label="Email"
            containerClassName="col-span-1"
          />
          <FloatingInput
            id="contact-phone"
            label="Phone"
            containerClassName="col-span-1"
          />
          <FloatingInput
            id="contact-subject"
            label="Subject"
            containerClassName="col-span-1"
          />

          {/* Responsive Message Textarea */}
          <div className="col-span-1 sm:col-span-2">
            <div className="relative">
              <textarea
                id="contact-message"
                rows={4}
                className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-transparent focus:border-white focus:outline-none peer resize-y min-h-[120px] md:min-h-[160px]"
                placeholder="Message"
              />
              <label
                htmlFor="contact-message"
                className="absolute left-4 -top-2.5 bg-[#000] px-1 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
              >
                Message
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button className="px-5 h-12 md:h-14 cursor-pointer relative col-span-1 sm:col-span-2 rounded-full group  font-medium bg-transparent text-white border border-white flex items-center justify-center transition-all hover:scale-105 overflow-hidden">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out rounded-full transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
            <span className="relative uppercase group-hover:text-black text-sm md:text-base font-semibold">
              Contact Us
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Action;
