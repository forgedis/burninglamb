"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import BigButton from "@/components/BigButton";
import PromoSection from "@/components/PromoSection";
import LaunchSection from "@/components/LaunchSection";

export default function Home() {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <>
      <Intro className="mb-32 sm:mb-28 pt-10" />
      <Projects className="mb-20" />
      <BigButton id="view-more-projects" title="View more projects" href="https://dribbble.com/burninglamb" target="_blank" />
      <Approach className="my-20" />
      <PromoSection className="-mx-4 md:-mx-[30px]" />
      <LaunchSection className="-mx-4 md:-mx-[30px]" />
    </>
  );
}
