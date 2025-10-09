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
    <section
      data-scroll-section
      className="snap-start snap-always h-[50vh] md:h-screen w-full flex items-center justify-center"
    >
      <div className="text-center mt-[104px]">
        <div ref={h1WrapRef} className="overflow-hidden">
          <h1
            ref={h1Ref}
            className="text-[32px] md:text-[70px] leading-[40px] md:leading-[110px] capitalize py-2 will-change-transform translate-y-full"
          >
            Any questions? simply ask us.
          </h1>
        </div>
        <div ref={h2WrapRef} className="overflow-hidden">
          <div ref={h2Ref} className="will-change-transform translate-y-full">
            <GradientText
              colors={["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]}
              animationSpeed={5}
              showBorder={false}
              className="text-[32px] md:text-[96px] leading-[40px] md:leading-[100px] mb-8 capitalize font-bold"
            >
              This is you, home!
            </GradientText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
