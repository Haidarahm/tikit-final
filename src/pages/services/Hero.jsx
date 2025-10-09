import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import GradientText from "../../components/GradientText";

const Hero = () => {
  const h1WrapRef = useRef(null);
  const h1Ref = useRef(null);
  const h2WrapRef = useRef(null);
  const h2Ref = useRef(null);

  useLayoutEffect(() => {
    if (!h1Ref.current || !h2Ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        h1Ref.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );
      gsap.fromTo(
        h2Ref.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="snap-section h-screen font-hero-light text-white justify-center items-center  flex flex-col">
      <div className="texts mt-12 text-center">
        <div ref={h1WrapRef} className="overflow-hidden">
          <h1
            ref={h1Ref}
            className="text-[32px] md:text-[96px] leading-[40px] md:leading-[100px] md:mb-8 capitalize will-change-transform translate-y-full"
          >
            We make design that <br />
          </h1>
        </div>
        <div ref={h2WrapRef} className="overflow-hidden">
          <div ref={h2Ref} className="will-change-transform translate-y-full">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={5}
              showBorder={false}
              className="text-[32px] md:text-[96px] leading-[40px] md:leading-[100px] mb-8 capitalize font-bold"
            >
              lead and inspire
            </GradientText>
          </div>
        </div>
        <div className="details md:hidden">
          <h1 className="text-[20px]">Our exclusive services</h1>
          <p className="font-light text-[16px]">
            We partner with brands that want to lead — those ready to break
            through the noise and bring real value to people’s lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
