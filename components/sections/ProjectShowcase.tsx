"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MobileFrame } from "@/components/ui/MobileFrame";

// ... (MANTENHA A CONSTANTE PROJECTS IGUAL AO ANTERIOR) ...
const PROJECTS = [
  {
    id: "study",
    number: "01",
    type: "web",
    title: "StudyPlan AI",
    description: "Orquestrador educacional. Transforma editais em planos de estudo estruturados com Gemini AI e Prisma.",
    tags: ["Next.js 15", "Gemini AI", "Prisma"],
    image: "/studyplan-print.png", 
    link: "https://studyplanbr.vercel.app/",
    repo: "https://github.com/paulos19/studyplanbr",
    color: "#10b981", 
    direction: "base"
  },
  {
    id: "davi",
    number: "02",
    type: "web",
    title: "Davi CRM",
    description: "Inteligência de vendas com RAG. Classificação automática de leads e Kanban interativo.",
    tags: ["RAG AI", "Vector DB", "Shadcn"],
    image: "/davi-print.png", 
    link: "https://davi-chi.vercel.app/",
    repo: "https://github.com/paulos19/davi",
    color: "#3b82f6", 
    direction: "from-right"
  },
  {
    id: "zaca",
    number: "03",
    type: "web",
    title: "Zacaplace",
    description: "Marketplace Multi-vendor. Dashboard administrativo, Stripe Connect e sistema de reviews.",
    tags: ["Stripe", "NextAuth", "Admin"],
    image: "/1.jpg", 
    link: "#",
    repo: "https://github.com/paulos19/make-marketplace",
    color: "#a855f7", 
    direction: "from-left"
  },
  {
    id: "lumiere",
    number: "04",
    type: "web",
    title: "Lumiere",
    description: "Experiência culinária AI-First. Gera receitas exclusivas e cria imagens realistas via N8N.",
    tags: ["N8N Workflow", "OpenAI DALL-E", "i18n"],
    image: "/lumiere-print.png", 
    link: "#",
    repo: "https://github.com/paulos19/lumieres",
    color: "#f59e0b", 
    direction: "from-right"
  },
  {
    id: "readeek",
    number: "05",
    type: "mobile",
    title: "Readeek Mobile",
    description: "Super App Literário. Combina leitor EPUB avançado, gamificação e rede social nativa.",
    tags: ["React Native", "Expo", "Zustand"],
    image: "/readeek-print.png", 
    link: "#",
    repo: "https://github.com/paulos19/readeek-mobile",
    color: "#8b5cf6", 
    direction: "from-bottom"
  }
];

export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], 
  });

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-neutral-950">
      
      <div className="absolute top-0 left-0 right-0 h-32 z-50 flex items-center justify-center pointer-events-none">
         <div className="bg-neutral-950/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 mt-8">
            <span className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
              Selected Works
            </span>
         </div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        <div className="absolute inset-0 w-full h-full z-0">
          <ProjectCard project={PROJECTS[0]} />
        </div>

        <ProjectOverlay 
            project={PROJECTS[1]} 
            progress={scrollYProgress} 
            range={[0.1, 0.25]} 
            zIndex={10}
        />

        <ProjectOverlay 
            project={PROJECTS[2]} 
            progress={scrollYProgress} 
            range={[0.3, 0.45]} 
            zIndex={20}
        />

        <ProjectOverlay 
            project={PROJECTS[3]} 
            progress={scrollYProgress} 
            range={[0.5, 0.65]} 
            zIndex={30}
        />

        {/* AJUSTE AQUI: Termina em 0.85 para dar tempo da próxima seção entrar sem colisão visual */}
        <ProjectOverlay 
            project={PROJECTS[4]} 
            progress={scrollYProgress} 
            range={[0.7, 0.85]} 
            zIndex={40}
        />

      </div>
    </section>
  );
}

// ... (MANTENHA OS COMPONENTES ProjectOverlay E ProjectCard IGUAIS) ...
function ProjectOverlay({ 
    project, 
    progress, 
    range, 
    zIndex 
}: { 
    project: any, 
    progress: MotionValue<number>, 
    range: [number, number], 
    zIndex: number 
}) {
  const localProgress = useTransform(progress, range, [0, 1]);
  const opacity = useTransform(localProgress, [0, 0.1], [0, 1]);

  let xInput = ["0%", "0%"];
  let yInput = ["0%", "0%"];

  if (project.direction === "from-right") {
    xInput = ["100%", "0%"];
  } else if (project.direction === "from-left") {
    xInput = ["-100%", "0%"];
  } else if (project.direction === "from-bottom") {
    yInput = ["100%", "0%"];
  }

  const x = useTransform(localProgress, [0, 1], xInput);
  const y = useTransform(localProgress, [0, 1], yInput);
  
  const shadowClass = project.direction === "from-left" 
    ? "shadow-[50px_0_100px_rgba(0,0,0,0.8)] border-r" 
    : "shadow-[-50px_0_100px_rgba(0,0,0,0.8)] border-l";

  return (
    <motion.div 
      style={{ x, y, zIndex, opacity }}
      className={`absolute inset-0 w-full h-full bg-neutral-950 border-white/5 ${shadowClass}`}
    >
      <ProjectCard project={project} progress={localProgress} />
    </motion.div>
  );
}

function ProjectCard({ 
  project, 
  progress 
}: { 
  project: any, 
  progress?: MotionValue<number>
}) {
  const isMobile = project.type === "mobile";
  const isReversed = project.direction === "from-left";

  const bgScale = progress ? useTransform(progress, [0, 1], [1.5, 1.1]) : 1.1;
  const bgBlur = progress ? useTransform(progress, [0, 0.8], ["blur(20px)", "blur(10px)"]) : "blur(10px)";
  
  const textOpacity = progress ? useTransform(progress, [0.4, 0.8], [0, 1]) : 1;
  const textY = progress ? useTransform(progress, [0.4, 0.8], [50, 0]) : 0;

  const frameY = progress ? useTransform(progress, [0, 1], [100, 0]) : 0;

  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ scale: bgScale, filter: bgBlur }}
          className="relative w-full h-full opacity-20"
        >
           <Image 
             src={project.image} 
             alt="Background" 
             fill 
             className="object-cover" 
           />
           <div className="absolute inset-0 bg-neutral-950/50 mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity: textOpacity }}
        className={`absolute bottom-0 text-[30vw] font-serif font-bold text-white/[0.02] select-none leading-none pointer-events-none z-0
          ${isReversed ? 'right-0 translate-x-1/4' : 'left-0 -translate-x-1/4'}
        `}
      >
        {project.number}
      </motion.div>

      <div className="container relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className={`space-y-8 flex flex-col justify-center ${isReversed ? 'lg:order-2 lg:text-left' : 'lg:order-1 lg:text-left'} order-2 text-center`}
          >
            <div className="space-y-4">
              <div className={`flex flex-wrap gap-2 justify-center ${isReversed ? 'lg:justify-start' : 'lg:justify-start'}`}>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 border bg-black/50 backdrop-blur-md"
                  style={{ borderColor: `${project.color}40`, color: project.color }}
                >
                  {isMobile ? <Smartphone size={12}/> : <Globe size={12}/>}
                  {isMobile ? "APP NATIVO" : "WEB APP"}
                </span>
                
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-white leading-[0.9]">
                {project.title}
              </h3>
            </div>

            <p className="text-lg text-neutral-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {project.description}
            </p>

            <div className={`flex gap-4 pt-2 justify-center ${isReversed ? 'lg:justify-start' : 'lg:justify-start'}`}>
              <Link href={project.link} target="_blank" className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Ver Projeto
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <Link href={project.repo} target="_blank" className="group flex items-center gap-2 text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
                <Github className="w-4 h-4" />
                Code
              </Link>
            </div>
          </motion.div>

          <motion.div 
             style={{ y: frameY }}
             className={`relative w-full flex items-center justify-center lg:h-[80vh] perspective-1000 ${isReversed ? 'lg:order-1' : 'lg:order-2'} order-1`}
          >
             <div className={`relative transform transition-all duration-700 hover:scale-[1.02] ${isMobile ? 'w-[300px]' : 'w-full max-w-2xl'}`}>
                
                <div 
                  className="absolute inset-0 blur-[100px] opacity-40 rounded-full -z-10"
                  style={{ backgroundColor: project.color }}
                />

                {isMobile ? (
                   <MobileFrame src={project.image} alt={project.title} />
                ) : (
                   <BrowserFrame src={project.image} alt={project.title} />
                )}
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}