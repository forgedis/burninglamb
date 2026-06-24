"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import BigButton from "@/components/BigButton";
import PromoSection from "@/components/PromoSection";
import LaunchSection from "@/components/LaunchSection";

const dgFont = { fontFamily: "'Darker Grotesque', sans-serif" };

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showThanks, setShowThanks] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    AOS.init({});
  }, []);

  useEffect(() => {
    if (searchParams.get("thanks") === "1") {
      setShowThanks(true);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (!showThanks) return;
    const t = setTimeout(() => setShowThanks(false), 3000);
    return () => clearTimeout(t);
  }, [showThanks]);

  return (
    <>
      {showThanks && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (!cardRef.current?.contains(e.target)) setShowThanks(false); }}
        >
          <div
            ref={cardRef}
            className="bg-[#111111] rounded-[12px] px-12 py-10 flex flex-col items-center text-center w-[340px]"
          >
            <div className="logo logo-main-mobile mb-6" />
            <h2
              className="font-heading text-white text-[34px] leading-[1.2] mb-3 text-center lowercase"
            >
              thank you for<br />submitting
            </h2>
            <p className="text-white/60 text-[18px] font-medium mt-1" style={dgFont}>
              We will get back to you shortly.
            </p>
          </div>
        </div>
      )}
      <Intro className="mb-32 sm:mb-28 pt-10" />
      <Projects className="mb-20" />
      <BigButton id="view-more-projects" title="View more projects" href="https://dribbble.com/burninglamb" target="_blank" />
      <Approach className="my-20" />
      <PromoSection className="-mx-4 md:-mx-[30px]" />
      <LaunchSection className="-mx-4 md:-mx-[30px]" />
    </>
  );
}
