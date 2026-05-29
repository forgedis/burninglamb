"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Authentic line-by-line curtain reveal using split-type.
 * Each visual line gets one overflow:hidden wrapper — the line content
 * slides up from below into the mask, exactly like rejouice.com.
 *
 * Props:
 *   as          — HTML tag (default "span")
 *   className   — applied to wrapper
 *   delay       — initial delay in seconds
 *   lineStagger — delay between lines (default 0.12s)
 *   onLoad      — animate on mount instead of scroll
 *   start       — ScrollTrigger start string (default "top 88%")
 *   children    — plain text string
 */
export default function TextReveal({
  children,
  className,
  as: Tag = "span",
  delay = 0,
  lineStagger = 0.12,
  onLoad = false,
  start = "top 88%",
  ...rest
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let splitInstance = null;
    let ctx = null;
    const wrappers = [];

    let cancelled = false;

    import("split-type").then(({ default: SplitType }) => {
      if (cancelled || !containerRef.current) return;

      // Split into lines — SplitType wraps each visual line in a div
      splitInstance = new SplitType(container, {
        types: "lines",
        lineClass: "tr-line",
      });

      const lines = splitInstance.lines;
      if (!lines || !lines.length) return;

      // Wrap each line in an overflow:hidden mask element
      lines.forEach((line) => {
        const mask = document.createElement("div");
        mask.style.overflow = "hidden";
        mask.style.display = "block";
        // Slight extra height to avoid descender clipping
        mask.style.paddingBottom = "0.08em";
        line.parentNode.insertBefore(mask, line);
        mask.appendChild(line);
        wrappers.push(mask);
      });

      // Animate lines from below (top of letters visible first)
      ctx = gsap.context(() => {
        gsap.fromTo(
          lines,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.95,
            ease: "power3.out",
            stagger: lineStagger,
            delay,
            ...(onLoad
              ? {}
              : {
                  scrollTrigger: {
                    trigger: container,
                    start,
                  },
                }),
          }
        );
      });
    });

    return () => {
      cancelled = true;
      // Unwrap the mask divs we inserted
      wrappers.forEach((mask) => {
        while (mask.firstChild) {
          mask.parentNode.insertBefore(mask.firstChild, mask);
        }
        mask.parentNode.removeChild(mask);
      });
      if (splitInstance) splitInstance.revert();
      if (ctx) ctx.revert();
    };
  }, [delay, lineStagger, onLoad, start]);

  return (
    <Tag ref={containerRef} className={className} {...rest}>
      {children}
    </Tag>
  );
}
