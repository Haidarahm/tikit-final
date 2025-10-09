// StickyPinnedSection.jsx
import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * StickyPinnedSection
 * Props:
 * - items: Array<{ title: string; subtitle?: string; description: string; media?: React.ReactNode }>
 * - heightPerItemVh: number (default 300)
 */
export default function StickyPinnedSection({
  items,
  heightPerItemVh = 150,
  className,
}) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const mediaRefs = useRef([]);
  const textRefs = useRef([]);
  const navigate = useNavigate();

  const count = items?.length ?? 0;

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el || !count) return;

    const pinDistance = window.innerHeight * (count * (heightPerItemVh / 100));

    const ctx = gsap.context(() => {
      // Reset states
      gsap.set(mediaRefs.current, { opacity: 0, y: 20, scale: 0 });
      gsap.set(textRefs.current, {
        opacity: 0,
        y: 0,
        visibility: "hidden",
        zIndex: 0,
      });

      // Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${pinDistance}`,
          scrub: 0.8, // smoother scrub
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Adjusted values
      const segment = 2.0; // per item span
      const textFadeDur = 0.25;
      const switchDelay = 0.02;

      // Media easing
      const inEase = "power3.out";
      const outEase = "power2.inOut";

      for (let i = 0; i < count; i++) {
        const textNode = textRefs.current[i];
        const mediaNode = mediaRefs.current[i];
        const at = i * segment;

        // --- TEXT ---
        if (textNode) {
          const lettersTitle = textNode.querySelectorAll(".letter-title");
          const lettersSubtitle = textNode.querySelectorAll(".letter-subtitle");
          const lettersDesc = textNode.querySelectorAll(".letter-desc");
          const lettersBtn = textNode.querySelectorAll(".letter-btn");

          tl.fromTo(
            textNode,
            { autoAlpha: 0, zIndex: 1, y: 8, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: textFadeDur,
              ease: "power2.out",
            },
            at + switchDelay
          );
          tl.to(
            textNode,
            {
              autoAlpha: 0,
              zIndex: 0,
              y: -8,
              filter: "blur(6px)",
              duration: textFadeDur,
              ease: "power2.in",
            },
            at + segment - textFadeDur - switchDelay
          );

          // Prepare letters
          gsap.set([lettersTitle, lettersSubtitle, lettersDesc, lettersBtn], {
            opacity: 0,
            y: 30,
            visibility: "inherit",
          });

          const itemTl = gsap.timeline({ paused: true });
          itemTl.to(lettersTitle, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.012,
            ease: "power3.out",
          });
          if (lettersSubtitle.length) {
            itemTl.to(
              lettersSubtitle,
              {
                opacity: 1,
                y: 0,
                duration: 0.18,
                stagger: 0.01,
                ease: "power3.out",
              },
              ">+0.04"
            );
          }
          if (lettersDesc.length) {
            itemTl.to(
              lettersDesc,
              {
                opacity: 1,
                y: 0,
                duration: 0.18,
                stagger: 0.01,
                ease: "power3.out",
              },
              ">+0.04"
            );
          }
          if (lettersBtn.length) {
            itemTl.to(
              lettersBtn,
              {
                opacity: 1,
                y: 0,
                duration: 0.16,
                stagger: 0.008,
                ease: "power3.out",
              },
              ">+0.04"
            );
          }

          // Trigger the per-item text animation
          tl.call(() => itemTl.restart(true), [], at + switchDelay);
        }

        // --- MEDIA (per-item transitions with reversible tweens) ---
        if (mediaNode) {
          // initial state
          gsap.set(mediaNode, {
            opacity: 0,
            scale: 0.85,
            y: 30,
            filter: "blur(20px)",
            willChange: "opacity, transform, filter",
            pointerEvents: "auto",
          });

          // bring current to front, others behind
          tl.call(
            () => {
              const all = mediaRefs.current || [];
              all.forEach((n, idx) => {
                if (!n) return;
                gsap.set(n, { zIndex: idx === i ? 2 : 1 });
              });
            },
            [],
            at + switchDelay - 0.01
          );

          // animate IN
          tl.to(
            mediaNode,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: segment * 0.35,
              ease: inEase,
            },
            at + switchDelay
          );

          // crossfade OUT previous with slight overlap
          if (i > 0) {
            const prev = mediaRefs.current[i - 1];
            if (prev) {
              tl.to(
                prev,
                {
                  opacity: 0,
                  scale: 0.94,
                  y: -14,
                  filter: "blur(8px)",
                  duration: segment * 0.28,
                  ease: outEase,
                },
                at + switchDelay + 0.04
              );
            }
          }

          // animate OUT near end of segment (reversible on scroll back)
          tl.to(
            mediaNode,
            {
              opacity: 0,
              scale: 0.9,
              y: -30,
              filter: "blur(12px)",
              duration: segment * 0.25,
              ease: outEase,
            },
            at + segment - 0.25
          );
        }
      }

      // Fade out entire section at the very end
      const fadeOutPortion = 0.15;
      const fadeStart = pinDistance * (1 - fadeOutPortion);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: `top+=${fadeStart} top`,
            end: `top+=${pinDistance} top`,
            scrub: true,
          },
        })
        .to(stickyRef.current, { autoAlpha: 0, y: -40, ease: "none" });

      // Featured Work title entrance on section enter
      const fwLetters = el.querySelectorAll(".fw-letter");
      if (fwLetters.length) {
        const playFeaturedTitle = () => {
          gsap.set(fwLetters, { opacity: 0, y: 12 });
          gsap.to(fwLetters, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power3.out",
          });
        };
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          onEnter: playFeaturedTitle,
        });
      }
    });

    return () => ctx.revert();
  }, [count, heightPerItemVh]);

  if (!count) return null;

  return (
    <section
      ref={sectionRef}
      style={{ height: "100vh" }}
      className="relative  font-hero-light w-full overflow-visible"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center justify-between gap-10 px-10"
      >
        <div className=" text-white px-10 flex  w-full font-bold absolute top-25 left-1/2 -translate-x-1/2 uppercase  items-center justify-between gap-4 ">
          <div>
            {Array.from("Featured Work").map((ch, i) => (
              <span key={i} className="fw-letter text-[32px]  inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          <button className="rounded-full border font-light bg-white text-black  px-5 py-2  transition-colors hover:bg-transparent hover:text-white">
            {Array.from("Explore Work").map((ch, i) => (
              <span key={i} className="fw-letter inline-block text-[14px]">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </button>
        </div>
        {/* Text column */}
        <div className="relative h-[70vh] mt-20 w-full max-w-xl">
          {items.map((it, i) => (
            <div
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              className="absolute inset-0 flex flex-col justify-center"
              style={{
                willChange: "opacity, transform",
                transform: "translateZ(0)",
              }}
            >
              <h2 className="text-2xl font-bold text-[32px] text-white">
                {Array.from(it.title ?? "").map((ch, j) => (
                  <span key={j} className="letter letter-title inline-block">
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </h2>
              {it.subtitle ? (
                <p className="mt-2  text-white text-[20px]">
                  {Array.from(it.subtitle ?? "").map((ch, j) => (
                    <span
                      key={j}
                      className="letter letter-subtitle inline-block"
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </p>
              ) : null}
              <p className="mt-6 w-full font-light text-white text-[24px]">
                {Array.from(it.description ?? "").map((ch, j) => (
                  <span key={j} className="letter letter-desc inline-block">
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </p>
              <div className="mt-8">
                <button
                  className="font-light rounded-full border border-white bg-transparent px-5 py-2 text-white transition-colors hover:bg-white hover:text-black"
                  onClick={() => {
                    try {
                      const id = items?.[i]?.id;
                      if (id != null) {
                        navigate(`/details/${encodeURIComponent(id)}`);
                      }
                    } catch (_) {}
                  }}
                >
                  {Array.from("View Work").map((ch, j) => (
                    <span
                      key={j}
                      className="letter  text-[14px] letter-btn inline-block"
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Media column */}
        <div className="sticky z-10 top-10 mt-20 h-[55vh] w-[35rem] shrink-0 overflow-hidden rounded-xl">
          <div className="relative h-full w-full">
            {items.map((it, i) => (
              <div
                key={i}
                ref={(el) => (mediaRefs.current[i] = el)}
                className="absolute inset-0 cursor-pointer transition-transform duration-300 ease-out"
                style={{
                  opacity: 0,
                  willChange: "opacity, transform",
                }}
                onMouseEnter={(e) => {
                  try {
                    gsap.to(e.currentTarget, {
                      scale: 1.1,
                      duration: 0.25,
                      ease: "power2.out",
                    });
                  } catch {}
                }}
                onMouseLeave={(e) => {
                  try {
                    gsap.to(e.currentTarget, {
                      scale: 1.0,
                      duration: 0.25,
                      ease: "power2.out",
                    });
                  } catch {}
                }}
                onClick={() => {
                  try {
                    const id = items?.[i]?.id;
                    if (id != null)
                      navigate(`/details/${encodeURIComponent(id)}`);
                  } catch {}
                }}
              >
                {it.media ?? null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
