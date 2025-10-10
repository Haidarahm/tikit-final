import React from "react";
import ScrollStack, { ScrollStackItem } from "../../components/ScrollStackItem";
import image1 from "../../assets/images/goal-image-1.png";
import image2 from "../../assets/images/goal-image-2.png";
import image3 from "../../assets/images/goal-image-3.png";
import image4 from "../../assets/images/goal-image-4.png";
import { useTheme } from "../../store/ThemeContext.jsx";

function Goals() {
  const { theme } = useTheme();
  
  const goalsData = [
  {
    id: 1,
    title: "Amplify your brand's reach",
    description: "Reach real audiences with meaningful content. We grow traffic that actually converts.",
    image: image1,
    backgroundColor: "bg-[#76A3BE]",
    backgroundColorLight: "bg-[#D4E6F4]",
  },
  {
    id: 2,
    title: "Boost campaign performance",
    description: "Track results in real time and optimize every move — all managed on one smart platform.",
    image: image2,
    backgroundColor: "bg-[#5653B7]",
    backgroundColorLight: "bg-[#E0DFFA]",
  },
  {
    id: 3,
    title: "Drive real engagement",
    description: "Reach real audiences with meaningful content. We grow traffic that actually converts.",
    image: image3,
    backgroundColor: "bg-[#9D74E5]",
    backgroundColorLight: "bg-[#E8DCFD]",
  },
  {
    id: 4,
    title: "Drive real engagement",
    description: "Reach real audiences with meaningful content. We grow traffic that actually converts.",
    image: image4,
    backgroundColor: "bg-[#B46CA7]",
    backgroundColorLight: "bg-[#F5D8ED]",
  },
];

  // Function to get the appropriate background class based on theme
  const getBackgroundClass = (goal) => {
    return theme === 'dark' ? goal.backgroundColor : goal.backgroundColorLight;
  };

  return (
    <div className="section font-hero-light flex flex-col md:flex-row mx-auto md:h-[450vh]  z-10 w-full md:w-6/7">
      <ScrollStack
        useWindowScroll={true}
        itemDistance={0}
        itemStackDistance={50}
        stackPosition="100"
        className="hidden md:block"
      >
        {goalsData.map((goal) => (
          <ScrollStackItem
            key={goal.id}
            itemClassName={`flex relative mx-[4px] items-center overflow-hidden ${getBackgroundClass(goal)}`}
          >
            <div className="text">
              <h2 className=" w-full text-[var(--foreground)]  md:max-w-[500px] text-[20px] md:text-[52px] leading-[24px] md:leading-[50px] mb-[10px] md:mb-[22px]">
                {goal.title}
              </h2>
              <p className=" font-light text-[var(--foreground)]  text:[14px] md:text-[32px] leading-[20px] md:leading-[35px]">
                {goal.description}
              </p>
            </div>
            <img
              src={goal.image}
              alt={goal.title}
              className="rounded-[15px] md:rounded-[39px] w-[120px] md:w-[500px] object-cover"
              loading="lazy"
            />
          </ScrollStackItem>
        ))}
      </ScrollStack>
      <div className="container-goals mx-2 block md:hidden">
        {goalsData.map((goal, index) => {
          const animationDirection =
            index % 2 === 0 ? "fade-right" : "fade-left";
          const animationDelay = index * 200;

          return (
            <div
              key={goal.id}
              className={`flex my-12 mx-[4px] p-4 rounded-[10px] items-center overflow-hidden ${getBackgroundClass(goal)}`}
              data-aos={animationDirection}
              data-aos-delay={animationDelay}
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic"
              data-aos-once="false"
              data-aos-mirror="true"
            >
              <div className="text">
                <h2 className=" w-] text-[20px] md:text-[52px] leading-[24px] md:leading-[50px] mb-[10px] md:mb-[22px]">
                  {goal.title}
                </h2>
                <p className=" text:[14px] font-light leading-[20px]">
                  {goal.description}
                </p>
              </div>
              <img
                src={goal.image}
                alt={goal.title}
                className="rounded-[15px] md:rounded-[39px] w-[120px] md:w-[500px] object-cover"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Goals;