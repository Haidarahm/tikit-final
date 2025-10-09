import React, { useEffect, useRef } from "react";
import Hero from "./Hero";
import "./services.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img41 from "../../assets/services/41.png";
import img42 from "../../assets/services/42.png";
import img43 from "../../assets/services/43.png";
import img44 from "../../assets/services/44.png";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";

const splitTextToSpans = (element) => {
  if (!element || element.dataset.splitDone === "true") return;
  const originalText = element.textContent || "";
  element.innerHTML = "";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    // Split by words on mobile; preserve spaces as text nodes so wrapping occurs between words
    const tokens = originalText.split(/(\s+)/);
    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        element.appendChild(document.createTextNode(token));
      } else if (token.length > 0) {
        const span = document.createElement("span");
        span.textContent = token;
        span.style.display = "inline-inline";
        // Use inline-block to keep the word together while allowing wrap between words
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(100%)";
        span.style.willChange = "transform, opacity";
        element.appendChild(span);
      }
    });
  } else {
    // Desktop: keep letter-based split/animation
    originalText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(100%)";
      span.style.willChange = "transform, opacity";
      element.appendChild(span);
    });
  }
  element.dataset.splitDone = "true";
};

const Services = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(".snap-section");
    if (sections.length < 2) return;

    // Smooth native scrolling only; page-by-page snapping removed

    sectionRefs.current.forEach((section) => {
      const title = section.querySelector("h2");
      const listItems = section.querySelectorAll("li");

      splitTextToSpans(title);
      const titleSpans = title.querySelectorAll("span");
      titleSpans.forEach((s) => s.classList.add("char"));

      // We'll animate list items as blocks (no per-letter split) for a distinct effect

      const animateIn = () => {
        gsap.to(titleSpans, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: { each: 0.05, from: 0, ease: "none" },
          ease: "back.out(0.8)",
        });

        gsap.fromTo(
          listItems,
          {
            y: 30,
            autoAlpha: 0,
            rotateX: -45,
            skewY: 4,
            scale: 0.95,
            filter: "blur(6px)",
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            skewY: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: { each: 0.12, from: "start" },
            delay: 0.15,
            ease: "power3.out",
          }
        );
      };

      const animateOut = () => {
        // Stop in-flight tweens and animate out so the reset is visible
        gsap.killTweensOf(titleSpans);
        gsap.killTweensOf(listItems);
        gsap.to(titleSpans, {
          opacity: 0,
          y: "100%",
          duration: 0.2,
          ease: "power2.in",
        });
        gsap.to(listItems, {
          autoAlpha: 0,
          y: 30,
          rotateX: -30,
          skewY: 3,
          scale: 0.98,
          filter: "blur(4px)",
          duration: 0.2,
          ease: "power2.in",
        });
      };

      animateOut();

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: animateIn,
        onLeave: animateOut,
        onEnterBack: animateIn,
        onLeaveBack: animateOut,
      });
    });

    return () => {
      // no-op
    };
  }, []);

  const sections = [
    {
      id: 1,
      title: "Brand Strategy",
      items: [
        "Brand positioning & messaging",
        "Visual identity development",
        "Market research & analysis",
        "Competitive landscape mapping",
      ],
      image: img41,
    },
    {
      id: 2,
      title: "Digital Design",
      items: [
        "UI/UX design systems",
        "Web & mobile interfaces",
        "Interactive prototypes",
        "User experience optimization",
      ],
      image: img42,
    },
    {
      id: 3,
      title: "Creative Campaigns",
      items: [
        "Multi-channel campaigns",
        "Social media strategies",
        "Content creation & curation",
        "Performance analytics",
      ],
      image: img43,
    },
    {
      id: 4,
      title: "Technical Solutions",
      items: [
        "Frontend development",
        "Backend architecture",
        "API integration",
        "Performance optimization",
      ],
      image: img44,
    },
  ];

  return (
    <div className="services-section w-full font-hero-light">
      <Hero />
      <div>
        {sections.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="snap-section  h-screen w-full flex  items-center justify-center"
            style={{
              backgroundImage: `url(${section.image})`,
              backgroundBlendMode: "multiply",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            aria-label={`${section.title} service`}
          >
            <div className="relative z-10 w-full  text-white text-center px-2 md:px-6">
              <h2 className="section-title text-[40px]  md:text-8xl font-extrabold mb-8 leading-[5.9rem]">
                {section.title}
              </h2>
              <ul className="section-list space-y-3 text-2xl md:text-3xl">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <ContactUs className="snap-section snap-start h-screen flex items-center justify-center" />
      <Footer className="snap-section snap-start h-screen flex items-center" />
    </div>
  );
};

export default Services;
