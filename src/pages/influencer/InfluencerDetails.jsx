import React, { useRef } from "react";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTheme } from "../../store/ThemeContext";
import { FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import influencer from "../../assets/influncer/1.png";
import overlay from "../../assets/tick-overlay.png";
import overlayDark from "../../assets/tick-overlay-dark.png";

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
  const { isRtl } = useI18nLanguage();
  const { theme } = useTheme();

  return (
    <section
      className={`overflow-hidden w-full min-h-screen flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24 xl:gap-32 py-8 md:py-12 px-4 md:px-8 lg:px-14 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10">
        {/* Name */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--foreground)] leading-tight">
            {name}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-[var(--secondary)] font-medium">
            {primarySubtitle}
          </h2>
          <h3 className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 font-light">
            {secondarySubtitle}
          </h3>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap gap-4 md:gap-6">
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
      <div className="relative flex justify-end flex-1 h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] rounded-2xl">
        <img
          src={image}
          alt={`${name} - ${primarySubtitle}`}
          className="w-[90%] h-full px-8"
          loading="lazy"
        />
        <img
          src={theme === "dark" ? overlayDark : overlay}
          alt="overlay"
          className="absolute bottom-4 md:-bottom-2 right-0 md:h-2/3 w-[90%]"
        />
      </div>
    </section>
  );
};
