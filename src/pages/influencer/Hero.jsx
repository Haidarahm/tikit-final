import React from "react";
import GradientText from "../../components/GradientText";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Hero = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  return (
    <section
      className={`text-[var(--foreground)] h-[50vh] md:h-screen w-full flex items-center justify-center ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="text-center mt-[104px]">
        <div className="overflow-hidden">
          <h1 className="text-[32px] md:text-[70px] leading-[40px] capitalize py-2">
            Showcase of Partner
          </h1>
        </div>
        <div className="overflow-hidden">
          <div>
            <GradientText
              colors={gradientColors}
              animationSpeed={5}
              showBorder={false}
              className="text-[32px] mx-auto md:text-[96px] leading-[40px] md:leading-[170px] mb-8 capitalize font-bold"
            >
              Influencers
            </GradientText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
