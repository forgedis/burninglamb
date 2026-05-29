"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { gsap } from "gsap";
import TextReveal from "@/components/TextReveal";

const promoImages = [
  { src: "/images/newprojects/aiclonely.png", alt: "AI Clonely project" },
  { src: "/images/newprojects/asteria.png", alt: "Asteria project" },
  { src: "/images/newprojects/kuchyne na mieru.png", alt: "Kuchyne na mieru project" },
  { src: "/images/newprojects/noma.png", alt: "Noma project" },
];

const IMG_W = 300;
const IMG_H = 190;

export default function PromoSection({ className }) {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const isMoving = useRef(false);
  const stopTimer = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const images = imagesRef.current;
    if (!section || !images.length) return;

    // Initial state: images centered, scaled to 0
    gsap.set(images, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      x: section.offsetWidth / 2,
      y: section.offsetHeight / 2,
    });

    function handleMouseMove(e) {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Move all images toward cursor with stagger (trail effect)
      gsap.to(images, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        overwrite: "auto",
      });

      // Scale up when mouse starts moving
      if (!isMoving.current) {
        isMoving.current = true;
        gsap.to(images, {
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.4)",
          stagger: 0.06,
          overwrite: "auto",
        });
      }

      // Reset stop timer — if mouse stops, scale down
      clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => {
        isMoving.current = false;
        gsap.to(images, {
          scale: 0,
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.05,
          overwrite: "auto",
        });
      }, 300);
    }

    function handleMouseLeave() {
      isMoving.current = false;
      clearTimeout(stopTimer.current);
      gsap.to(images, {
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.04,
        overwrite: "auto",
      });
    }

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(stopTimer.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={twMerge("relative bg-primary-500 overflow-hidden cursor-default", className)}
    >
      {/* Trail images — all exist in DOM, follow cursor with stagger */}
      {promoImages.map((img, i) => (
        <div
          key={i}
          ref={(el) => (imagesRef.current[i] = el)}
          className="absolute top-0 left-0 pointer-events-none rounded-sm overflow-hidden"
          style={{
            width: `${IMG_W}px`,
            height: `${IMG_H}px`,
            zIndex: promoImages.length - i,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes={`${IMG_W}px`}
          />
        </div>
      ))}

      {/* Center content: text + CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-[30px] py-24 md:py-32 min-h-[640px]">
        <TextReveal
          as="p"
          lineStagger={0.09}
          start="top 90%"
          className="font-heading leading-0.9 tracking-2 lowercase text-black text-center mb-10 md:mb-14"
          style={{ fontSize: "clamp(3rem, 7vw, 6.25rem)", maxWidth: "640px" }}
        >
          Web design tailored to your needs
        </TextReveal>
        <a
          href="#contact"
          className="group relative flex items-center justify-between bg-black rounded-[4px] px-10 overflow-hidden"
          style={{ width: "388px", maxWidth: "100%", height: "84px" }}
        >
          <span className="font-heading text-[34px] leading-1.3 lowercase tracking-2 text-primary-500">
            tell us more
          </span>
          <svg
            width="44"
            height="37"
            viewBox="0 0 51 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path
              className="origin-left duration-500 scale-x-[66%] group-hover:scale-x-100 transition-all"
              d="M49.5137 14.3005L0 14.5005"
              stroke="#F04823"
              strokeWidth="2.63889"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
            <path
              className="origin-left duration-500 -translate-x-1/3 group-hover:translate-x-0 transition-all"
              d="M35.0545 26.8875C41.3581 17.8033 49.6162 14.5 49.6162 14.5C49.6162 14.5 41.3581 11.1967 35.0544 2.11184"
              stroke="#F04823"
              strokeWidth="2.63889"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
