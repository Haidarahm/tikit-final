import React, { useEffect, useRef, useMemo } from "react";
import Hero from "./Hero";
import "./services.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import { useTheme } from "../../store/ThemeContext"; // Import the theme context
import { useServicesStore } from "../../store/servicesStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";

const splitTextToSpans = (element) => {
  if (!element || element.dataset.splitDone === "true") return;
  const originalText = element.textContent || "";
  element.innerHTML = "";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    const tokens = originalText.split(/(\s+)/);
    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        element.appendChild(document.createTextNode(token));
      } else if (token.length > 0) {
        const span = document.createElement("span");
        span.textContent = token;
        span.style.display = "inline-inline";
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(100%)";
        span.style.willChange = "transform, opacity";
        element.appendChild(span);
      }
    });
  } else {
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
  const { theme } = useTheme(); // Get current theme
  const { services, loadServices, loading } = useServicesStore();
  const { language } = useI18nLanguage();

  useEffect(() => {
    loadServices({ lang: language, page: 1, per_page: 10 });
  }, [language, loadServices]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(".snap-section");
    if (sections.length < 2) return;

    sectionRefs.current.forEach((section) => {
      const title = section.querySelector("h2");
      const descPara = section.querySelector(".section-desc");

      splitTextToSpans(title);
      const titleSpans = title.querySelectorAll("span");
      titleSpans.forEach((s) => s.classList.add("char"));

      const animateIn = () => {
        gsap.to(titleSpans, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: { each: 0.05, from: 0, ease: "none" },
          ease: "back.out(0.8)",
        });
        if (descPara) {
          gsap.fromTo(
            descPara,
            { y: 20, autoAlpha: 0, filter: "blur(4px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
              delay: 0.15,
            }
          );
        }
      };

      const animateOut = () => {
        gsap.killTweensOf(titleSpans);
        if (descPara) gsap.killTweensOf(descPara);
        gsap.to(titleSpans, {
          opacity: 0,
          y: "100%",
          duration: 0.2,
          ease: "power2.in",
        });
        if (descPara) {
          gsap.to(descPara, {
            autoAlpha: 0,
            y: 20,
            filter: "blur(4px)",
            duration: 0.25,
            ease: "power2.in",
          });
        }
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

  const sections = useMemo(() => {
    const list = Array.isArray(services) ? services : [];
    return list.map((s) => ({
      id: s.id,
      title: s.title ?? "",
      description: s.description ?? "",
      image: s.media ?? "",
    }));
  }, [services]);

  // Calculate overlay based on theme
  const getSectionStyle = (image) => ({
    backgroundImage: `url(${image})`,
    backgroundBlendMode: theme === "dark" ? "multiply" : "overlay",
    backgroundColor:
      theme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
  });

  return (
    <div className="services-section w-full font-hero-light">
      <Hero />
      <div>
        {sections.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="snap-section h-screen w-full flex items-center justify-center"
            style={getSectionStyle(section.image)}
            aria-label={`${section.title} service`}
          >
            <div
              className={`relative z-10 w-full text-center px-2 md:px-6 ${
                theme === "dark" ? "text-white" : "text-[var(--foreground)]"
              }`}
            >
              <h2 className="section-title text-[40px] md:text-8xl font-extrabold mb-8 leading-[5.9rem]">
                {section.title}
              </h2>
              <p className="section-desc max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed opacity-0 will-change-transform">
                {section.description}
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  className="font-light bg-[var(--secondary)] text-[var(--background)] rounded-full border border-[var(--secondary)] dark:border-white px-4 md:px-5 py-1.5 md:py-2 text-[12px] md:text-[14px] transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-md hover:ring-1 hover:ring-[var(--secondary)] dark:hover:ring-white hover:brightness-105"
                  type="button"
                >
                  Explore Service
                </button>
              </div>
            </div>
          </section>
        ))}
        {!loading && (!sections || sections.length === 0) ? (
          <div className="text-center py-10 opacity-70">No services found.</div>
        ) : null}
      </div>
      <ContactUs className="snap-section snap-start h-screen flex items-center justify-center" />
      <Footer className="snap-section snap-start h-screen flex items-center" />
    </div>
  );
};

export default Services;
