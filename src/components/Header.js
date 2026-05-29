"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import HeaderLink from "./HeaderLink";

export default function Header({ className, ...other }) {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <header
      className={twMerge("flex items-center justify-between ", className)}
      {...other}
    >
      <nav className="flex gap-7 md:gap-10 lg:gap-20">
        <HeaderLink href="#" className="hidden md:flex text-lg">
          About
        </HeaderLink>
        <HeaderLink href="#projects" className="hidden md:flex text-lg">
          Featured Projects
        </HeaderLink>
        <HeaderLink href="#approach" className="hidden md:flex text-lg">
          Approach
        </HeaderLink>
        <HeaderLink href="#contact" className="hidden md:flex text-lg">
          Contact
        </HeaderLink>
        <div className="logo md:hidden" />
      </nav>
      <a href="mailto:hi@burninglamb.eu" className="flex items-center gap-1 hover:text-primary-500 transition-colors" >
        <Image
          alt=""
          src="/svg/arrow-left-down-primary.svg"
          width="20"
          height="20"
          className="-scale-x-100"
        />
        <span className="text-lg underline">hi@burninglamb.eu</span>
      </a>
    </header>
  );
}
