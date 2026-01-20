"use client";
import { useEffect, useRef } from "react";
import Lenis from 'lenis';
import { useScroll } from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero"; 
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";

import { ProjectLumiere } from "@/components/sections/projects/lumiere";
import { ProjectStudyPlan } from "@/components/sections/projects/study-plan";
import { ProjectZacaplace } from "@/components/sections/projects/zacaplace";
import { ProjectDavi } from "@/components/sections/projects/davi";
import { ProjectReadeek } from "@/components/sections/projects/readeek";

import { ProjectCard } from "@/components/ui/project-card";

// Novos imports
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

const projects = [
  {
    component: <ProjectLumiere />,
    color: "#0A1410",
    direction: "none" as const
  },
  {
    component: <ProjectStudyPlan />,
    color: "#F0F2F5",
    direction: "right" as const
  },
  {
    component: <ProjectZacaplace />,
    color: "#F3F4F6",
    direction: "left" as const
  },
  {
    component: <ProjectDavi />,
    color: "#F8FAFC",
    direction: "right" as const
  },
  {
    component: <ProjectReadeek />,
    color: "#09090b",
    direction: "left" as const
  }
];

export default function Home() {
  const container = useRef(null);
  
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <main className="relative w-full bg-background overflow-x-hidden">
      <Navbar />
      
      <Hero />
      <About />
      <Stack />

      {/* --- SESSÃO DE PROJETOS --- */}
      <section ref={container} className="relative h-[500vh] bg-zinc-950">
        {projects.map((project, i) => {
          const start = i === 0 ? 0 : (i - 1) * 0.25;
          const end = i === 0 ? 1 : i * 0.25;

          return (
            <ProjectCard 
              key={i} 
              i={i} 
              progress={scrollYProgress}
              range={[start, end]}
              color={project.color}
              direction={project.direction}
            >
              {project.component}
            </ProjectCard>
          );
        })}
      </section>

      {/* --- NOVAS SESSÕES --- */}
      
      {/* 1. Testemunhas (Dark) - Conecta com o fundo dark do Readeek */}
      <Testimonials />

      {/* 2. Contato (Light) - Contraste forte para chamar atenção */}
      <Contact />

      {/* 3. Footer (Dark) - Fechamento elegante */}
      <Footer />

    </main>
  );
}