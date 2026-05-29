"use client";

import Image from "next/image";
import Button from "./Button";
import TextReveal from "./TextReveal";

const mail = "hi@burninglamb.eu";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-footer)]">
      <div className="mx-auto max-w-[var(--max-width)] px-4 md:px-[30px]">
        <div className="items-end justify-between md:flex">
          <div>
            <TextReveal as="h2" className="mb-6 font-heading text-6xl lowercase md:mb-16" start="top 90%">
              Contact us directly
            </TextReveal>
            <div className="mb-10">
              <a
                className="text-5xl font-semibold leading-0.9 text-primary-500 underline hover:text-white md:text-9xl"
                href={`mailto:${mail}`}
              >
                {mail}
              </a>
            </div>
            <div className="mb-10 flex flex-wrap gap-2">
              <Button
                className="group flex items-center gap-2 px-5 md:px-12"
                href="https://t.me/burning_lamb"
                isAlwaysSmall
                target="_blank"
              >
                <Image
                  alt=""
                  src="/svg/telegram-outlined.svg"
                  width="13"
                  height="13"
                  className="group-hover:hidden"
                />
                <Image
                  alt=""
                  src="/svg/telegram-filled.svg"
                  width="13"
                  height="13"
                  className="hidden group-hover:block"
                />{" "}
                <span className="mt-[3px] flex">
                  <span className="sr-only">Telegram </span>
                  @Burning_lamb
                </span>
              </Button>
            </div>
          </div>
          <div className="logo-main-mobile flex sm:hidden mb-5" />
          <div className="logo-main hidden sm:flex mb-5" />
        </div>
        <div className="mb-5 flex flex-col justify-between border-t-0.5 border-gray-500 pt-5 md:flex-row md:items-end">
          <p className="text-sm uppercase leading-1.2 tracking-8 opacity-40">
            © {new Date().getFullYear()} Burning lamb — Digital Agency
          </p>
          <p className="mb-0 grid leading-1.2 opacity-40 md:grid-cols-2 md:gap-8">
            <span>Tax ID: 2122164924</span>
            <span>Business ID: 56035136</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
