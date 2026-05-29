import { twMerge } from "tailwind-merge";
import Button from "./Button";
import ProjectsCarousel from "./ProjectsCarousel";
import ProjectsTitle from "./ProjectsTitle";
import TextReveal from "./TextReveal";

export default function Project({
  title,
  description,
  tags,
  slides,
  index,
  ...other
}) {

  const Tags = ({ className }) => (
    <div className={twMerge("flex-wrap gap-1", className)}>
      {tags.map((tag) => (
        <Button key={tag} isAlwaysSmall>
          {tag}
        </Button>
      ))}
    </div>
  )
  return (
    <article
      className="group relative rounded-xl bg-[var(--bg-background-rgb)] mb-16 md:mb-32"
      {...other}
    >
      <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-center bg-[var(--background-rgb)] gap-3 md:gap-5 lg:gap-10 sticky py-3 top-[100px] md:top-[48.5px] z-[9] border-b-0.5">
        <ProjectsTitle className="hidden md:flex py-0 opacity-0 md:mr-10" aria-hidden/>
        <h3 className="flex items-center gap-2 bg-transparent text-3xl font-semibold leading-0.9 md:text-4xl">
          <span
            className="rounded-full border border-primary-500 px-2 py-1 text-xs font-bold leading-1.3 tracking-2 text-primary-500 transition-colors duration-500"
            aria-hidden
          >
            .0{index+1}
          </span>
          <span className="text-lg leading-1.2">{title}</span>
        </h3>
        <Tags className="hidden sm:flex justify-end" />
      </div>
      <div className="mb-4 sm:mb-8">
        <ProjectsCarousel slides={slides} />
      </div>
      <Tags className="flex sm:hidden mb-4" />
      <TextReveal as="p" className="text-lg leading-1.2 w-[70%] lg:w-2/5" start="top 92%">
        {description}
      </TextReveal>
    </article>
  );
}
