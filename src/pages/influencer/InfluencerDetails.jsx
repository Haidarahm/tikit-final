import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import influencer from "../../assets/influncer/1.png";
import overlay from "../../assets/tick-overlay.png";
import overlayDark from "../../assets/tick-overlay-dark.png";
gsap.registerPlugin(ScrollTrigger);

// Social Media Icons Component
const SocialIcon = ({ icon: Icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-14 h-14 rounded-full bg-[var(--secondary)]/10 hover:bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 hover:scale-110"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
};

export const InfluencerDetails = ({
  name = "Sarah Johnson",
  primarySubtitle = "Digital Content Creator",
  secondarySubtitle = "Lifestyle & Fashion Influencer",
  image = influencer,
  socialLinks = [
    { platform: "instagram", href: "https://instagram.com/sarahjohnson" },
    { platform: "youtube", href: "https://youtube.com/@sarahjohnson" },
    { platform: "tiktok", href: "https://tiktok.com/@sarahjohnson" },
    { platform: "twitter", href: "https://twitter.com/sarahjohnson" },
  ],
}) => {
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const socialRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const { isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Clean up any existing ScrollTrigger instances for this component
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.trigger === containerRef.current ||
        trigger.trigger === nameRef.current ||
        trigger.trigger === subtitleRef.current ||
        trigger.trigger === socialRef.current ||
        trigger.trigger === imageRef.current
      ) {
        trigger.kill();
      }
    });

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
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            fastScrollEnd: true,
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
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              fastScrollEnd: true,
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
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          }
        );
      }

      // Social media animation (container only, no per-icon stagger)
      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.6,
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              fastScrollEnd: true,
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
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
      // Additional cleanup for ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === containerRef.current ||
          trigger.trigger === nameRef.current ||
          trigger.trigger === subtitleRef.current ||
          trigger.trigger === socialRef.current ||
          trigger.trigger === imageRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, [isRtl, theme]);

  return (
    <section
      ref={containerRef}
      className={`snap-start snap-always overflow-hidden w-full min-h-screen flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24 xl:gap-32 py-8 md:py-12 px-4 md:px-8 lg:px-14 ${
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
            {name}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="space-y-4">
          <h2
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-[var(--secondary)] font-medium"
          >
            {primarySubtitle}
          </h2>
          <h3
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 font-light"
          >
            {secondarySubtitle}
          </h3>
        </div>

        {/* Social Media Links */}
        <div ref={socialRef} className="flex flex-wrap gap-4 md:gap-6">
          {socialLinks.map((social, index) => {
            const getIcon = (platform) => {
              switch (platform) {
                case "instagram":
                  return FaInstagram;
                case "youtube":
                  return FaYoutube;
                case "tiktok":
                  return FaTiktok;
                case "twitter":
                  return FaTwitter;
                default:
                  return FaInstagram;
              }
            };

            return (
              <SocialIcon
                key={social.platform}
                icon={getIcon(social.platform)}
                href={social.href}
              />
            );
          })}
        </div>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="relative  flex justify-end flex-1  h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] rounded-2xl "
      >
        <img
          src={image}
          alt={`${name} - ${primarySubtitle}`}
          className="w-[90%] h-full px-8 "
          loading="lazy"
        />
        <img
          src={theme === "dark" ? overlayDark : overlay}
          alt="overlay"
          className="absolute bottom-4 md:-bottom-2  right-0 md:h-2/3 w-[90%]"
        />
      </div>
    </section>
  );
};
