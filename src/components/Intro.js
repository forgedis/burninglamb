"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { gsap } from "gsap";
import TextReveal from "@/components/TextReveal";

export default function Intro({ className, ...other }) {
  const lettersRef = useRef([]);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each letter path: drops in from above, left→right stagger (rejouice-style)
      gsap.fromTo(
        lettersRef.current,
        { y: -180, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          stagger: 0.06,
          delay: 0.05,
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
          delay: 0.9,
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
      <h1 className="w-full mb-40 md:mb-16" aria-label="Burning Lamb">
        <svg
          width="100%"
          viewBox="0 0 1380 166"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            <clipPath id="title-clip">
              <rect width="1380" height="166" />
            </clipPath>
          </defs>
          <g clipPath="url(#title-clip)">
            {/* B */}
            <path ref={(el) => (lettersRef.current[0] = el)} d="M68.9953 77.0885C87.9631 77.0885 116.178 85.3869 116.178 119.529C116.178 152.011 90.334 166.237 60.2227 166H8.06131L8.06131 0.0319391L55.9549 0.0319391C86.0663 -1.86483 112.384 9.75293 112.384 39.8643C112.384 69.0272 87.9631 76.6143 68.9953 76.6143V77.0885ZM37.2243 66.4192L55.9549 66.4192C71.8405 66.4192 83.2211 59.3062 83.2211 42.4723C83.2211 26.8239 71.8405 21.1336 55.9549 21.3707L37.2243 21.3707L37.2243 66.4192ZM37.2243 144.661H60.4598C77.0566 144.898 87.0147 134.229 87.0147 115.972C87.0147 97.9531 71.8405 87.5208 55.9549 87.7579L37.2243 87.7579L37.2243 144.661Z" fill="white" />
            {/* U */}
            <path ref={(el) => (lettersRef.current[1] = el)} d="M150.358 0.506142V100.798C150.358 154.382 221.013 156.042 221.013 100.798V0.506142L249.939 0.506142L249.939 103.643C249.939 186.627 121.432 187.813 121.432 103.643L121.432 0.506142L150.358 0.506142Z" fill="white" />
            {/* R */}
            <path ref={(el) => (lettersRef.current[2] = el)} d="M286.544 87.995L286.307 166H257.381V0.0319391L305.274 0.0319391C334.674 0.0319391 361.703 9.04163 361.703 42.4723C361.703 67.3676 346.529 82.0676 322.582 86.5724L361.466 166L331.829 166L293.657 87.995L286.544 87.995ZM286.544 65.4708L305.274 65.4708C321.16 65.4708 332.54 61.9143 332.54 43.8949C332.54 26.1126 321.16 22.3191 305.274 22.5562L286.544 22.5562V65.4708Z" fill="white" />
            {/* N */}
            <path ref={(el) => (lettersRef.current[3] = el)} d="M420.697 0.0319391L484.95 158.887V0.0319391L515.536 0.0319391L513.639 166H459.107L396.276 10.9384L394.616 166H365.927L365.927 0.0319391L420.697 0.0319391Z" fill="white" />
            {/* I */}
            <path ref={(el) => (lettersRef.current[4] = el)} d="M552.729 0.0319391L552.966 166H523.566V0.0319391L552.729 0.0319391Z" fill="white" />
            {/* N */}
            <path ref={(el) => (lettersRef.current[5] = el)} d="M613.697 0.0319391L677.95 158.887V0.0319391L708.536 0.0319391L706.639 166H652.107L589.276 10.9384L587.616 166H558.927V0.0319391L613.697 0.0319391Z" fill="white" />
            {/* G */}
            <path ref={(el) => (lettersRef.current[6] = el)} d="M732.689 83.9644C732.689 119.055 754.976 142.764 793.623 142.764C809.508 142.764 832.033 138.734 834.641 96.5305V93.6853H756.398V72.3466L860.01 72.3466V166H834.641V131.621C829.187 157.702 810.22 167.897 785.561 167.897C740.513 167.897 708.505 134.229 708.505 83.9644C708.505 33.6997 740.513 0.0319391 789.118 0.0319391L859.299 0.0319391L859.062 25.6384L789.118 25.1642C754.976 25.1642 732.689 48.874 732.689 83.9644Z" fill="white" />
            {/* L */}
            <path ref={(el) => (lettersRef.current[7] = el)} d="M997.881 143.476L997.644 166H918.927V0.0319391L949.513 0.0319391L948.09 143.476H997.881Z" fill="white" />
            {/* A */}
            <path ref={(el) => (lettersRef.current[8] = el)} d="M1075.09 166L1069.63 131.621H1030.99L1025.53 166H996.845L1022.69 0.0319391L1078.88 0.0319391L1104.72 166L1075.09 166ZM1034.31 109.097L1066.31 109.097L1050.43 6.90777L1034.31 109.097Z" fill="white" />
            {/* M */}
            <path ref={(el) => (lettersRef.current[9] = el)} d="M1209.25 0.0319391L1264.26 0.0319391L1262.36 166H1234.15V30.3804L1213.04 166L1156.85 166L1135.28 27.061L1133.62 166H1105.64V0.0319391L1159.7 0.0319391L1184.59 159.124L1209.25 0.0319391Z" fill="white" />
            {/* B */}
            <path ref={(el) => (lettersRef.current[10] = el)} d="M1328 77.0885C1346.96 77.0885 1375.18 85.3869 1375.18 119.529C1375.18 152.011 1349.33 166.237 1319.22 166H1267.06V0.0319391L1314.95 0.0319391C1345.07 -1.86483 1371.38 9.75293 1371.38 39.8643C1371.38 69.0272 1346.96 76.6143 1328 76.6143V77.0885ZM1296.22 66.4192L1314.95 66.4192C1330.84 66.4192 1342.22 59.3062 1342.22 42.4723C1342.22 26.8239 1330.84 21.1336 1314.95 21.3707L1296.22 21.3707V66.4192ZM1296.22 144.661H1319.46C1336.06 144.898 1346.01 134.229 1346.01 115.972C1346.01 97.9531 1330.84 87.5208 1314.95 87.7579L1296.22 87.7579V144.661Z" fill="white" />
          </g>
        </svg>
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
