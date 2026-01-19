"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

interface ProjectSceneProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string; // Agora é obrigatório o print
  number: string;
  direction: "from-left" | "from-right"; // Simplificamos as direções
  repoLink?: string;
  liveLink?: string;
  bgColors: string; // Nova prop para gradiente de fundo sutil
}

export function ProjectScene({ 
  title, 
  description, 
  tags, 
  imageSrc,
  number,
  direction,
  repoLink = "#",
  liveLink = "#",
  bgColors
}: ProjectSceneProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  // Usamos um scroll longo (200vh) para dar tempo da animação acontecer suavemente
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"], 
  });

  // LÓGICA CORE: Painel desliza e cobre o anterior.
  // Se vem da direita: começa em 100% (fora da tela) e vai a 0% (centro).
  // Se vem da esquerda: começa em -100% e vai a 0%.
  const xRange = direction === "from-right" ? ["100%", "0%"] : ["-100%", "0%"];
  
  // O painel entra rapidamente (entre 5% e 35% do scroll da seção) e depois fica fixo.
  const panelX = useTransform(scrollYProgress, [0.05, 0.35], xRange);
  
  // Fade in sutil para acompanhar o deslize
  const opacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  
  // Um leve parallax no conteúdo interno para dar profundidade quando o painel já está fixo
  const contentY = useTransform(scrollYProgress, [0.35, 1], ["0%", "-10%"]);

  // Define se o layout interno é normal ou invertido baseado na direção de entrada
  const isReversed = direction === "from-left";

  return (
    // A seção tem 250vh de altura para criar o "tempo" de scroll, mas o conteúdo é sticky
    <section ref={targetRef} className="relative h-[250vh]">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* O PAINEL DESLIZANTE PRINCIPAL.
          Ele cobre toda a tela e traz o conteúdo do projeto.
        */}
        <motion.div 
          style={{ x: panelX, opacity }}
          className={`absolute inset-0 h-full w-full bg-neutral-950 flex items-center justify-center border-y border-white/5
            // Adiciona uma sombra massiva na direção oposta ao movimento para dar sensação de sobreposição
            ${direction === 'from-right' ? 'shadow-[-50px_0_100px_rgba(0,0,0,0.5)] border-l' : 'shadow-[50px_0_100px_rgba(0,0,0,0.5)] border-r'}
          `}
        >
          {/* Gradiente de fundo sutil baseado na cor do projeto */}
          <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${bgColors}_0%,transparent_70%)] opacity-20 pointer-events-none`} />
          
          {/* Número Gigante de Fundo */}
          <div className={`absolute top-1/2 -translate-y-1/2 text-[25vw] font-serif font-bold text-white/5 select-none z-0 leading-none
             ${isReversed ? 'right-10 text-right' : 'left-10 text-left'}
          `}>
            {number}
          </div>

          {/* Container do Conteúdo (com parallax interno suave) */}
          <motion.div 
            style={{ y: contentY }}
            className="container relative z-10 px-4 md:px-12 h-full flex items-center"
          >
            <div className={`flex flex-col gap-12 md:gap-20 items-center w-full ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              
              {/* TEXT CONTENT */}
              <div className="flex-1 space-y-8 text-center md:text-left">
                <div className="space-y-4">
                   <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-emerald-400 tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-4xl md:text-7xl font-bold font-serif tracking-tight text-white leading-none">
                    {title}
                  </h3>
                </div>

                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                  {description}
                </p>

                <div className="flex gap-6 pt-4 justify-center md:justify-start">
                  <Link href={liveLink} target="_blank" className="group flex items-center gap-2 text-white font-medium bg-white/10 px-6 py-3 rounded-full hover:bg-emerald-500/20 hover:text-emerald-300 transition-all">
                    Ver Online
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                  <Link href={repoLink} target="_blank" className="group flex items-center gap-2 text-neutral-400 px-6 py-3 rounded-full border border-white/5 hover:border-white/20 hover:text-white transition-all">
                    <Github className="w-5 h-5" />
                    GitHub
                  </Link>
                </div>
              </div>

              {/* IMAGE BROWSER FRAME */}
              <div className="flex-1 w-full max-w-2xl perspective-1000">
                 <BrowserFrame src={imageSrc} alt={title} />
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}