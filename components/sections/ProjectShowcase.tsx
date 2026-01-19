"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

// Dados dos Projetos Centralizados aqui para facilitar o controle da animação
const PROJECTS = [
  {
    id: "study",
    number: "01",
    title: "StudyPlan AI",
    description: "Orquestrador educacional inteligente. Transforma editais complexos em planos de estudo estruturados utilizando a API do Google Gemini, Prisma ORM e uma interface analítica.",
    tags: ["Next.js 15", "Gemini AI", "Prisma", "Tailwind"],
    image: "/studyplan-print.png", // Certifique-se de ter essa imagem em public/
    link: "https://studyplanbr.vercel.app/",
    repo: "https://github.com/paulos19/studyplanbr",
    color: "from-emerald-500/20 to-emerald-900/5" // Gradiente sutil
  },
  {
    id: "davi",
    number: "02",
    title: "Davi CRM",
    description: "Plataforma de inteligência de vendas com RAG (Retrieval-Augmented Generation). Classificação automática de leads, Kanban interativo e agendamento inteligente.",
    tags: ["RAG AI", "Vector DB", "Zustand", "Shadcn/ui"],
    image: "/davi-print.png", // Certifique-se de ter essa imagem em public/
    link: "https://davi-chi.vercel.app/",
    repo: "https://github.com/paulos19/davi",
    color: "from-blue-500/20 to-blue-900/5"
  }
];

export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Aumentamos a altura para garantir que o scroll seja suave e lento o suficiente
  // 300vh = 1 tela de entrada + 1 tela para o primeiro projeto + 1 tela de transição
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], 
  });

  return (
    // ESTE É O TRILHO DO SCROLL (Invisível, apenas define o tempo da animação)
    <section ref={containerRef} className="relative h-[300vh] bg-neutral-950">
      
      {/* ESTE É O PALCO (Fica preso na tela enquanto o usuário scrolla o trilho) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* === PROJETO 1 (BASE) === 
            Ele fica fixo no fundo (z-0). Não se move, apenas espera ser coberto.
        */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
          <ProjectCard 
            project={PROJECTS[0]} 
            bgGradient={PROJECTS[0].color}
          />
        </div>

        {/* === PROJETO 2 (OVERLAY) === 
            Ele entra deslizando por cima do Projeto 1.
            Controlado pelo scrollYProgress.
        */}
        <Project2Overlay progress={scrollYProgress} project={PROJECTS[1]} />

      </div>
    </section>
  );
}

// Sub-componente para o Projeto 2 (O que desliza)
function Project2Overlay({ progress, project }: { progress: MotionValue<number>, project: typeof PROJECTS[1] }) {
  // LÓGICA DE TRANSIÇÃO:
  // Começa fora da tela na direita (100%) quando o scroll está em 20%.
  // Chega no centro (0%) quando o scroll está em 60%.
  // Isso cria o efeito de "Slide Deck".
  const x = useTransform(progress, [0.2, 0.6], ["100%", "0%"]);
  
  // Sombra para dar profundidade quando ele passa por cima
  const opacity = useTransform(progress, [0.2, 0.25], [0, 1]);

  return (
    <motion.div 
      style={{ x, opacity }}
      className="absolute inset-0 w-full h-full z-10 bg-neutral-950 flex items-center justify-center shadow-[-50px_0_100px_rgba(0,0,0,0.8)] border-l border-white/10"
    >
      <ProjectCard 
        project={project} 
        bgGradient={project.color}
      />
    </motion.div>
  );
}

// Componente Visual do Cartão do Projeto (Reutilizável)
function ProjectCard({ project, bgGradient }: { project: any, bgGradient: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
      
      {/* Fundo Atmosférico */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-20 pointer-events-none`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_90%)] pointer-events-none" />

      {/* Número de Fundo */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[20vw] font-serif font-bold text-white/[0.03] select-none leading-none pointer-events-none">
        {project.number}
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Info */}
        <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-emerald-400 tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-4xl md:text-7xl font-bold font-serif text-white leading-none">
              {project.title}
            </h3>
          </div>

          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            {project.description}
          </p>

          <div className="flex gap-6 pt-4 justify-center lg:justify-start">
            <Link href={project.link} target="_blank" className="group flex items-center gap-2 text-white font-medium bg-white/10 px-6 py-3 rounded-full hover:bg-emerald-500/20 hover:text-emerald-300 transition-all border border-transparent hover:border-emerald-500/30">
              Ver Online
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
            <Link href={project.repo} target="_blank" className="group flex items-center gap-2 text-neutral-400 px-6 py-3 rounded-full border border-white/5 hover:border-white/20 hover:text-white transition-all">
              <Github className="w-5 h-5" />
              GitHub
            </Link>
          </div>
        </div>

        {/* Visual / Print */}
        <div className="order-1 lg:order-2 perspective-1000 w-full">
           <BrowserFrame src={project.image} alt={project.title} />
        </div>

      </div>
    </div>
  );
}