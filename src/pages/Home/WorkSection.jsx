import React, { useEffect, useMemo } from "react";
import StickyPinnedSection from "../../components/ui/StickyPinnedSection";
import { useWorkStore } from "../../store/workStore";

export default function WorkSection() {
  const { works, loadWorks, loading } = useWorkStore();

  useEffect(() => {
    if (!works || works.length === 0) {
      loadWorks();
    }
  }, [works, loadWorks]);

  const items = useMemo(() => {
    return (works || []).map((w) => ({
      id: w.id,
      title: w.title ?? "",
      subtitle: w.subtitle ?? "",
      description: w.description ?? "",
      media: w.media ? (
        <img
          src={w.media}
          alt={w.title ?? "work"}
          className="h-full rounded-[20px] w-full object-cover"
          loading="lazy"
        />
      ) : null,
    }));
  }, [works]);

  return (
    <>
      <div className="relative hidden md:block h-[540vh] z-10 w-full overflow-visible text-[var(--foreground)]">
        <StickyPinnedSection items={items} heightPerItemVh={150} />
      </div>
      <div className="mobile-view gap-[30px] md:hidden relative text-[var(--foreground)] flex flex-col w-full px-[20px]">
        <div className="headline sticky top-0 flex w-full justify-between mt-[40px]">
          <h1 className="text-[18px] font-bold">Featured Work</h1>{" "}
          <button className="px-2 md:hidden text-[11px] rounded-full uppercase border border-[var(--foreground)] text-[var(--foreground)] bg-transparent">
            Explore Projects
          </button>
        </div>
        <div className="main-content w-full flex flex-col gap-[20px]">
          {(items || []).map((item, index) => (
            <div
              key={(item.title || "") + String(index)}
              className="element-wrapper flex flex-col w-full gap-[30px]"
            >
              <div className="text flex flex-col gap-[10px]">
                {item.title ? (
                  <h1 className="title text-[20px] font-bold">{item.title}</h1>
                ) : null}
                {item.subtitle ? (
                  <div className="subtitle text-[16px] opacity-80">
                    {item.subtitle}
                  </div>
                ) : null}
                {item.description ? (
                  <div className=" description text-[14px] opacity-80">
                    {item.description}
                  </div>
                ) : null}
              </div>
              {item.media ? (
                <div className="image relative w-full h-[250px] rounded-[20px] overflow-hidden">
                  {item.media}
                </div>
              ) : null}
            </div>
          ))}
          {(!items || items.length === 0) && !loading ? (
            <div className="text-center text-sm opacity-70">
              No works found.
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
