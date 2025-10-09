import React from "react";
import TickWhite from "../../assets/TickWhite";
import RotatingText from "../../components/RotatingText";
import TextChanger from "../../components/TextChanger";

const Strategy = () => {
  const cards = [
    {
      title: "Influencer Marketing",
      description:
        "From concept to final cut, we bring bold ideas to life. Whether it's social content, branded visuals, or full-scale commercial shoots, our production team delivers quality storytelling that captures attention and drives action.",
      color: "#548099", // sky-500
    },
    {
      title: "Production",
      description:
        "From concept to final cut, we bring bold ideas to life. Whether it's social content, branded visuals, or full-scale commercial shoots, our production team delivers quality storytelling that captures attention and drives action.",
      color: "#7E5DB9", // violet-400
    },
    {
      title: "Social Media Management",
      description:
        "From concept to final cut, we bring bold ideas to life. Whether it's social content, branded visuals, or full-scale commercial shoots, our production team delivers quality storytelling that captures attention and drives action.",
      color: "#483CB3", // orange-500
    },
    {
      title: "Branding",
      description:
        "From concept to final cut, we bring bold ideas to life. Whether it's social content, branded visuals, or full-scale commercial shoots, our production team delivers quality storytelling that captures attention and drives action.",
      color: "#B46CA7", // green-500
    },
  ];
  return (
    <div data-scroll-section className="text-white">
      <div
        className="title text-[28px] sm:text-[40px] md:text-[70px] capitalize text-center my-[40px] md:my-[80px] loco-text-up px-4"
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat
      >
        No fluff.
        <div className="flex justify-center md:h-[75px] items-center">
          <span className="transition">Just</span>
          <h1 className=" font-bold text-white overflow-hidden flex items-center ml-4">
            <TextChanger
              texts={[
                "expert strategy",
                "creative firepower",
                "flawless execution",
              ]}
              duration={3}
              diagonal={false}
              textClassName="bg-gradient-to-r from-[#07D9F5] to-[#CE88C6] bg-clip-text text-transparent"
            />
          </h1>
          {/* <RotatingText
          
            texts={["expert strategy", "creative firepower", "flawless execution"]}
            mainClassName=" bg-gradient-text px-2 sm:px-2 md:px-3 text-white font-bold text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          /> */}
        </div>
      </div>
      <div className="container-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 md:mt-10 px-4 md:px-6">
        {cards.map((card, i) => (
          <div
            key={String(i)}
            className="relative rounded-[14px] overflow-hidden bg-[#0b0b0b]/60 col-span-2 row-span-1 border border-white/10 hover:border-white/20 transition-colors loco-reveal-card"
            data-scroll
            data-scroll-class="is-inview"
            data-scroll-repeat
            style={{
              backgroundColor: `${card.color}1A`,
              transitionDelay: `${i * 120}ms`,
            }}
          >
            {/* Radial gradient background with subtle blur from card color to white */}
            <div
              className="pointer-events-none absolute inset-0 z-0 blur-[24px] opacity-70"
              style={{
                backgroundImage: `radial-gradient(120% 100% at 30% 30%, ${card.color}, #ffffff)`,
              }}
            />
            <div className="p-4 md:px-4 md:py-8 relative z-10">
              <div
                className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold mb-2 loco-text-up"
                data-scroll
                data-scroll-class="is-inview"
                data-scroll-repeat
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                <TickWhite className="text-[#] w-[60px] md:w-[60px] inline-block h-[50x] px-4 md:px-2 md:h-[60px]" />
                {card.title}
              </div>
              <div
                className="text-white/80 text-[16px] sm:text-[18px] md:text-[24px]  loco-text-up leading-[30px]"
                data-scroll
                data-scroll-class="is-inview"
                data-scroll-repeat
                style={{ transitionDelay: `${450 + i * 120}ms` }}
              >
                {card.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Strategy;
