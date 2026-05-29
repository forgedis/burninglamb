"use client";
import Image from "next/image"
import TextReveal from "@/components/TextReveal"
import { twMerge } from "tailwind-merge"

const ProjectsTitle = ({ className, ...props }) => {
    return (
        <div className={twMerge("pointer-events-none flex flex-nowrap items-start gap-4 sticky top-[48.5px] z-[10] pt-4 pb-2", className)} {...props}>
            <TextReveal as="h2" className="leading-1 font-heading lowercase text-4xl">Featured projects</TextReveal>
            <a href="#view-more-projects" className="pointer-events-auto group">
                <Image className="group-hover:hidden transition-all" src="/svg/circled-arrow-down-primary.svg" alt="" width="24" height="24" />
                <Image className="hidden group-hover:block transition-all" src="/svg/circled-arrow-down.svg" alt="" width="24" height="24" />
                <span className="sr-only">Scroll to projects end</span>
            </a>
        </div>
    )
}

export default ProjectsTitle;