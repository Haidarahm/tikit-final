import React from "react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "../../components/ui/ThreeDScrollTriggerRow";
import quote from "../../assets/icons/quot.svg";

const Reviews = () => {
  const testimonials = [
    {
      name: "Sophia Martinez",
      company: "Global Enterprises Ltd.",
      avatar:
        "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
      text: "AtomWallet has completely transformed how we manage international payments. Transactions are fast, secure, and effortless.",
    },
    {
      name: "David Lee",
      company: "TechBridge Solutions",
      avatar:
        "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
      text: "Sending money to partners abroad has never been this smooth. AtomWallet's real-time tracking gives us complete peace of mind.",
    },
    {
      name: "Amira Hassan",
      company: "FinEdge Capital",
      avatar:
        "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
      text: "The security features are outstanding. Multi-layer protection ensures our business transactions remain private and protected.",
    },
    {
      name: "Liam Anderson",
      company: "Anderson Trading Co.",
      avatar:
        "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
      text: "With AtomWallet, I can pay vendors and receive funds globally without worrying about hidden fees. Transparent and reliable!",
    },
    {
      name: "Chen Wei",
      company: "BrightPath Logistics",
      avatar:
        "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
      text: "The interface is so intuitive. Within minutes, my team was making international payments without any training required.",
    },
  ];
  return (
    <div className="reviews relative w-full md:min-h-screen font-hero-light py-10 md:py-20">
      <ThreeDScrollTriggerContainer>
        <ThreeDScrollTriggerRow baseVelocity={3} direction={1}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex gap-[23px] h-[180px] md:h-[300px] w-[320px] md:w-[600px] ml-[20px] p-2 md:p-7 rounded-xl text-white border border-white/15 bg-white/10 backdrop-blur-md shadow-xl"
            >
              <div className="icon h-full">
                <img src={quote} alt="" className="mh-[20px] d:h-[40px] w-[20px]  md:w-[40px]" />
              </div>

              <div className="content flex-col flex-1 justify-between w-full flex">
                <p className="relative block text-wrap text-[14px] md:text-[24px] font-light">
                  {testimonial.text}
                </p>
                <div className="user flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className=" w-[31px] md:w-[75px] h-[31px] md:h-[75px] rounded-full "
                  />
                  <div className="name-specialist flex flex-col ml-[20px]">
                    <div className="text-[16px] md:text-[20px]">{testimonial.name}</div>
                    <div className="specialist text-[12px] md:text-[18px] text-gray-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
      <ThreeDScrollTriggerContainer>
        <ThreeDScrollTriggerRow baseVelocity={3} direction={-1}>
          {testimonials.map((testimonial, index) => (
             <div
              key={index}
              className="flex gap-[23px] h-[180px] md:h-[300px] w-[320px] md:w-[600px] ml-[20px] p-2 md:p-7 rounded-xl text-white border border-white/15 bg-white/10 backdrop-blur-md shadow-xl"
            >
              <div className="icon h-full">
                <img src={quote} alt="" className="mh-[20px] d:h-[40px] w-[20px]  md:w-[40px]" />
              </div>

              <div className="content flex-col flex-1 justify-between w-full flex">
                <p className="relative block text-wrap text-[14px] md:text-[24px] font-light">
                  {testimonial.text}
                </p>
                <div className="user flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className=" w-[31px] md:w-[75px] h-[31px] md:h-[75px] rounded-full "
                  />
                  <div className="name-specialist flex flex-col ml-[20px]">
                    <div className="text-[16px] md:text-[20px]">{testimonial.name}</div>
                    <div className="specialist text-[12px] md:text-[18px] text-gray-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
     
    </div>
  );
};

export default Reviews;
