import React, { useEffect, useLayoutEffect, useRef } from "react";
import hiddenImg from "../../assets/work/hidden.webp";
import kraveImg from "../../assets/work/krave.webp";
import porscheImg from "../../assets/work/porsche.webp";
import rangeRoverImg from "../../assets/work/range-rover.webp";
import theReveImg from "../../assets/work/the-reve.webp";
import image1 from "../../assets/images/card-1.jpg";
import image2 from "../../assets/images/card-2.jpg";
import image3 from "../../assets/images/card-3.jpg";
import { useTheme } from "../../store/ThemeContext.jsx";
import "./work.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import GradientText from "../../components/GradientText";

gsap.registerPlugin(ScrollTrigger);

const imagesArr = [
  {
    src: hiddenImg,
    title: "Hidden Project",
    subtitle: "A secret creative work",
  },
  { src: kraveImg, title: "Krave", subtitle: "Branding & Identity" },
  { src: porscheImg, title: "Porsche", subtitle: "Automotive Campaign" },
  { src: rangeRoverImg, title: "Range Rover", subtitle: "Luxury Experience" },
  { src: theReveImg, title: "The Reve", subtitle: "Fashion Editorial" },
  { src: image1, title: "Card One", subtitle: "UI/UX Design" },
  { src: image2, title: "Card Two", subtitle: "Web Development" },
  { src: image3, title: "Card Three", subtitle: "Photography" },
];

const Work = () => {
  const { theme } = useTheme();
  const imagesRef = useRef([]);
  const paragraphContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const titleContainerRef = useRef(null);
  const titleRef = useRef(null);
  const descTitleWrapRef = useRef(null);
  const descTitleRef = useRef(null);
  const descParaWrapRef = useRef(null);
  const descParaRef = useRef(null);

  const gradientColors =
  theme === "light"
    ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
    : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const start = isMobile ? "top 80%" : "top 90%";
    const end = isMobile ? "top 60%" : "top 20%";

    imagesRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { height: "10%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.5,
          },
        }
      );
    });
  }, []);

  useLayoutEffect(() => {
    if (!titleContainerRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );
    }, titleContainerRef);
    return () => ctx.revert();
  }, []);

  // Animate description (title then paragraph) after main title
  useLayoutEffect(() => {
    if (!descTitleRef.current || !descParaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        descTitleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );
      gsap.fromTo(
        descParaRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.55 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!paragraphContainerRef.current || !paragraphRef.current) return;
    gsap.set(paragraphRef.current, { yPercent: 100, opacity: 1 });
    gsap.to(paragraphRef.current, {
      yPercent: 0,
      duration: 0.9,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div className="work-section font-hero-light flex flex-col h-[calc(100%+10vh)]">
      <div className="h-[75vh] flex flex-col justify-around items-center w-full description  mt-[104px]">
        <div className="w-full"></div>
        <div ref={titleContainerRef} className="overflow-hidden">
          <div
            ref={titleRef}
            className="title will-change-transform translate-y-full"
          >
            <GradientText
              colors={gradientColors}
              animationSpeed={5}
              showBorder={false}
              className="text-[32px] md:text-[96px] leading-[40px] md:leading-[100px] mb-8 capitalize font-bold"
            >
              Featured Work
            </GradientText>
          </div>
        </div>
        <div className="description relative z-30 text-center md:text-start flex md:flex-row flex-col text-[var(--foreground)] px-[20px] md:px-[30px] gap-4 md:gap-12 justify-center items-center">
          <div ref={descTitleWrapRef} className="overflow-hidden w-[20%]">
            <div
              ref={descTitleRef}
              className="title font-bold mt-4 md:mt-0 text-[20px] md:text-[24px] will-change-transform translate-y-full"
            >
              what makes us special
            </div>
          </div>
          <div ref={descParaWrapRef} className="overflow-hidden">
            <div
              ref={descParaRef}
              className="paragraph text-[16px] md:text-[22px] will-change-transform translate-y-full"
            >
              We take a similar approach to design commercial we do impactfully
              approache, over the flowchart of user friendly wireframe.
            </div>
          </div>
        </div>
        {/* <div ref={paragraphContainerRef} className="overflow-hidden">
          <p
            ref={paragraphRef}
            className="paragraph font-light text-[16px] md:text-[32px] md:w-[900px] text-center leading-[40px]"
          >
            We take a similar approach to design commercial we do impactfully
            approache, over the flowchart of user friendly wireframe.
          </p>
        </div> */}
      </div>

      {/* Image Grid */}
      <div className="images grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-4 md:h-[300vh] p-4">
        {imagesArr.map((item, i) => (
          <div
            key={i}
            ref={(el) => (imagesRef.current[i] = el)}
            className="group relative shadow-lg  rounded-lg overflow-hidden"
            style={{ height: "10%" }}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover  rounded-lg"
            />

            {/* Overlay */}
            <div className=" content-work absolute  inset-0 flex flex-col items-center overflow-hidden justify-center bg-black/30 md:bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-[30px] font-bold ">
                {item.title}
              </h3>
              <p className="text-gray-200 text-[20px] mb-4">{item.subtitle}</p>
              <button className="px-4 py-2 rounded-full border border-white bg-transparent text-white hover:bg-white hover:text-black transition">
                View Work
              </button>
            </div>
          </div>
        ))}
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Work;

/* work.css */
