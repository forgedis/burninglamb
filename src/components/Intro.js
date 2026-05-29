"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { gsap } from "gsap";
import TextReveal from "@/components/TextReveal";

export default function Intro({ className, ...other }) {
  const titleRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title: clip-path curtain reveal from bottom
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.out",
          delay: 0.1,
        }
      );

      // Small logo: fade up after title
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.6,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={twMerge("relative overflow-hidden", className)}
      {...other}
    >
      <h1 ref={titleRef} className="bl-title w-full mb-40 md:mb-16">
        <span className="sr-only">Burning Lamb</span>
      </h1>
      <div className="flex sm:items-center justify-between gap-2">
        <div ref={logoRef} className="logo logo-scaled" />
        <TextReveal
          as="p"
          onLoad
          delay={0.7}
          lineStagger={0.15}
          className="text-lg leading-1.2 w-2/3 md:w-1/3"
        >
          Exploring concepts from multiple angles, every project is approached with curiosity and storytelling focusing on creating meaningful experiences and visuals.
        </TextReveal>
      </div>
    </section>
  );
}
