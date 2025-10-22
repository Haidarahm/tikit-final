import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import influencer from '../../assets/influncer/1.png'
gsap.registerPlugin(ScrollTrigger);

// Social Media Icons Component
const SocialIcon = ({ icon: Icon, href, delay = 0 }) => {
  const iconRef = useRef(null);

  useLayoutEffect(() => {
    if (!iconRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        iconRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: delay,
          scrollTrigger: {
            trigger: iconRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <a
      ref={iconRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-14 h-14 rounded-full bg-[var(--secondary)]/10 hover:bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 hover:scale-110"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
};

export const InfluencerDetails = () => {
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const socialRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const { isRtl } = useI18nLanguage();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Main container animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Name animation
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: nameRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            x: isRtl ? 50 : -50,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Social media animation
      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.8,
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={containerRef}
      className={`snap-start snap-always min-h-screen flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24 xl:gap-32 py-8 md:py-12 px-4 md:px-8 lg:px-14 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10">
        {/* Name */}
        <div className="space-y-2">
          <h1
            ref={nameRef}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--foreground)] leading-tight"
          >
            Sarah Johnson
          </h1>
        </div>

        {/* Subtitle */}
        <div className="space-y-4">
          <h2
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-[var(--secondary)] font-medium"
          >
            Digital Content Creator
          </h2>
          <h3
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 font-light"
          >
            Lifestyle & Fashion Influencer
          </h3>
        </div>

        {/* Social Media Links */}
        <div ref={socialRef} className="flex flex-wrap gap-4 md:gap-6">
          <SocialIcon
            icon={FaInstagram}
            href="https://instagram.com/sarahjohnson"
            delay={0}
          />
          <SocialIcon
            icon={FaYoutube}
            href="https://youtube.com/@sarahjohnson"
            delay={0.1}
          />
          <SocialIcon
            icon={FaTiktok}
            href="https://tiktok.com/@sarahjohnson"
            delay={0.2}
          />
          <SocialIcon
            icon={FaTwitter}
            href="https://twitter.com/sarahjohnson"
            delay={0.3}
          />
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 w-full lg:w-auto">
        <div
          ref={imageRef}
          className="relative w-full h-[300px] md:h-[300px] lg:h-[400px] xl:h-[600px] rounded-2xl overflow-hidden"
        >
          <img
            src={influencer}
            alt="Sarah Johnson - Digital Content Creator"
            className="w-full h-full px-8 transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
};
