import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import InfiniteScroll from "../../components/InfiniteScroll";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      offset: 100,
    });
  }, []);

  const items = [
    { content: "Text Item 1" },
    { content: <p>Paragraph Item 2</p> },
    { content: "Text Item 3" },
    { content: <p>Paragraph Item 4</p> },
    { content: "Text Item 5" },
    { content: <p>Paragraph Item 6</p> },
    { content: "Text Item 7" },
    { content: <p>Paragraph Item 8</p> },
    { content: "Text Item 9" },
    { content: <p>Paragraph Item 10</p> },
    { content: "Text Item 11" },
    { content: <p>Paragraph Item 12</p> },
    { content: "Text Item 13" },
    { content: <p>Paragraph Item 14</p> },
  ];
  return (
    <div data-scroll-section className="  flex flex-col">
      <div style={{ height: "500px", position: "relative" }}>
        <div className="overlay absolute h-full w-full bg-black opacity-50 z-20 "></div>

        <div
          className="title z-30 w-full md:pl-[60px] text-center md:text-start absolute text-[32px] md:text-[64px] capitalize  flex items-center  font-bold leading-[60px] h-full text-white"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          We are Tikit — a full-service <br className="hidden md:block" />{" "}
          marketing agency
        </div>
        <InfiniteScroll
          items={items}
          isTilted={true}
          tiltDirection="right"
          autoplay={true}
          autoplaySpeed={0.5}
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
      <div className="description relative z-30 text-center md:text-start flex-1 flex md:flex-row flex-col text-white px-[20px] md:px-[60px] gap-4 md:gap-14 justify-center items-center">
        <div className="title uppercase font-bold mt-4 md:mt-0 text-[20px] md:text-[34px] w-2/7 ">
          About Us
        </div>
        <div className="paragraph text-[16px] md:text-[28px] ">
          Driven by insight and creativity: the story behind "Tikit" — a
          regional agency powering brands, building trust, and delivering
          results.
        </div>
      </div>
    </div>
  );
};

export default Hero;
