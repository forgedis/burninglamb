import { twMerge } from "tailwind-merge";
import phases from "@/data/approach-phases";
import TextReveal from "@/components/TextReveal";

export default function Approach({ className, ...other }) {
  return (
    <section
      id="approach"
      className={twMerge(className)}
      {...other}
    >
      <div className="grid md:grid-cols-[1fr_0.66fr] mb-20">
        <TextReveal
          as="h2"
          id="approach-title"
          className="mb-8 font-heading text-6xl leading-1.3 tracking-2 lowercase"
        >
          Approach
        </TextReveal>
        <TextReveal as="p" className="text-lg leading-1.2" start="top 85%">
          The design process is built on continuous collaboration, where ideas develop through regular feedback and iteration. This ongoing approach helps ensure the work stays aligned with your goals at every stage.
        </TextReveal>
      </div>
      <div>
        {phases.map(({ title, description }, index) => (
          <div key={title} className="relative group grid grid-cols-[1fr_0.66fr] gap-5 py-5 pl-2 md:pl-0 border-t-0.5 border-gray-500 md:items-center hover:text-black hover:border-black transition-colors">
            <div className="grid grid-cols-[0.6fr_1fr] gap-4 md:items-center mt-2 md:mt-0">
              <div>
                <span
                  className="rounded-full border border-primary-500 px-2 py-1 text-xs font-bold leading-1.3 tracking-2 text-primary-500 group-hover:bg-transparent group-hover:text-black group-hover:border-black"
                  aria-hidden
                >
                  .0{index+1}
                </span>
              </div>
              <TextReveal as="span" className="font-heading lowercase mt-0.5 md:mt-0" start="top 95%">{title}</TextReveal>
            </div>
            <TextReveal as="p" className="opacity-60 text-lg m-0" start="top 95%" lineStagger={0.1}>{description}</TextReveal>
            <div className="z-[-1] w-full md:w-[calc(100%+60px)] bg-primary-500 absolute bottom-0 md:-translate-x-[30px] h-0 group-hover:h-full transition-all"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
