// app/page.tsx
"use client";
import { useEffect, useRef } from "react";
import Lenis from 'lenis'
import { useScroll } from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero"; 
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";

// Importe seus projetos
import { ProjectLumiere } from "@/components/sections/projects/lumiere";
import { ProjectStudyPlan } from "@/components/sections/projects/study-plan";
import { ProjectZacaplace } from "@/components/sections/projects/zacaplace";
import { ProjectDavi } from "@/components/sections/projects/davi";
import { ProjectReadeek } from "@/components/sections/projects/readeek";

// Importe o Wrapper que criamos no Passo 1
import { ProjectCard } from "@/components/ui/project-card";

// Configure a lista e as cores de fundo de cada card
const projects = [
  {
    component: <ProjectLumiere />,
    color: "#0A1410" // Cor do fundo do Lumiere
  },
  {
    component: <ProjectStudyPlan />,
    color: "#F0F2F5" // Cor do fundo do Study Plan
  },
  {
    component: <ProjectZacaplace />,
    color: "#F3F4F6" // Cor do fundo do Zacaplace
  },
  {
    component: <ProjectDavi />,
    color: "#F8FAFC" // Cor do fundo do Davi
  },
  {
    component: <ProjectReadeek />,
    color: "#09090b" // Cor do fundo do Readeek
  }
];

export default function Home() {
  const container = useRef(null);
  
  // Smooth Scroll (Opcional, mas melhora muito o efeito de sticky)
  useEffect( () => {
    const lenis = new Lenis()
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  // Hook de scroll global para a seção de projetos
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

      {/* --- SESSÃO DE PROJETOS (Main Container) --- */}
      {/* Importante: mt-0 ou ajustado para não ter buraco entre stack e projetos */}
      <section ref={container} className="relative mt-[10vh] mb-[10vh]">
        {projects.map((project, i) => {
          // Cálculo de escala: O primeiro card diminui mais, o último fica tamanho real (1)
          const targetScale = 1 - ( (projects.length - i) * 0.05 );
          
          return (
            <ProjectCard 
              key={i} 
              i={i} 
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              color={project.color}
            >
              {project.component}
            </ProjectCard>
          );
        })}
      </section>

      {/* Footer / Próximos Passos */}
      <section className="relative z-10 bg-zinc-950 py-24 flex items-center justify-center border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="text-center">
          <h2 className="text-zinc-500 text-xl mb-4">Gostou do que viu?</h2>
          <p className="text-zinc-400 text-sm mb-8">Entre em contato para construirmos algo juntos.</p>
          <span className="text-zinc-600 text-xs">© 2026 Paulo Henrique.</span>
        </div>
      </section>

    </main>
  );
}