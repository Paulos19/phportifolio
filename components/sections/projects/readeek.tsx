"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Smartphone, Users, PenTool } from "lucide-react";
import Link from "next/link";

export function ProjectReadeek() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax interno
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Movimento vertical suave (sem rotação)
  const yPhone = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section className="relative w-full h-full overflow-hidden bg-[#09090b] text-white">
      
      <div ref={containerRef} className="relative h-full w-full flex items-center justify-center py-12 md:py-0">
        
        {/* === LAYER 1: BACKGROUND AURORA EFFECT === */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 z-0 h-[120%] w-full -top-[10%] pointer-events-none"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[#09090b]">
                <div className="absolute top-[15%] right-[10%] w-[30vw] h-[40vw] bg-[#10b981]/15 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[50vw] bg-[#818cf8]/15 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow delay-700" />
            </div>
        </motion.div>

        {/* === LAYER 2: CONTEÚDO PRINCIPAL === */}
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-16">
            
            {/* --- COLUNA DA ESQUERDA: TEXTO --- */}
            <div className="max-w-xl order-2 md:order-1 flex flex-col justify-center">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full border border-[#10b981]/40 bg-[#10b981]/10 text-[#10b981] text-xs font-mono tracking-widest uppercase font-bold backdrop-blur-md">
                      Mobile App
                  </span>
                  <div className="h-[1px] w-12 md:w-24 bg-[#10b981]/40" />
                </div>

                {/* Título */}
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                  READEEK <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#818cf8]">
                      MOBILE.
                  </span>
                </h2>

                {/* Descrição */}
                <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8">
                    Um <strong className="text-[#10b981]">Ecossistema Literário</strong> de bolso. Desenvolvido com React Native e Reanimated para máxima fluidez, conecta leitores através de comunidades e um estúdio de escrita com IA.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                      { name: "React Native", icon: Smartphone },
                      { name: "Social Reader", icon: Users },
                      { name: "Writer Studio", icon: PenTool },
                  ].map((tech, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-[#18181b]/50 backdrop-blur-sm border border-[#10b981]/20 rounded-lg text-zinc-300 text-xs md:text-sm hover:border-[#10b981] transition-colors cursor-default">
                        <tech.icon size={14} className="text-[#10b981]" />
                        {tech.name}
                      </div>
                  ))}
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <Link 
                        href="#" 
                        className="group relative px-6 py-4 bg-[#10b981] text-[#09090b] font-bold text-lg rounded-lg overflow-hidden flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                    >
                        <span className="relative z-10">Ver App</span>
                        <ArrowUpRight size={20} className="relative z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                    <Link 
                        href="https://github.com/Paulos19/readeek-mobile" 
                        target="_blank"
                        className="group px-6 py-4 bg-[#18181b]/50 backdrop-blur-sm border border-zinc-700 text-zinc-300 font-medium rounded-lg flex items-center justify-center gap-3 hover:border-[#10b981] hover:text-[#10b981] transition-all"
                    >
                        <Github size={20} className="group-hover:text-[#10b981] transition-colors" />
                        <span>Source Code</span>
                    </Link>
                </div>
            </div>

            {/* --- COLUNA DA DIREITA: MOCKUP STYLE GALAXY NOTE ULTRA (RETO) --- */}
            <motion.div 
                style={{ y: yPhone }}
                // GARANTIA DE POSIÇÃO RETA: rotate: 0
                initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative order-1 md:order-2 z-30 perspective-1000 w-[300px] md:w-[380px] aspect-[9/19.5] flex-shrink-0 max-h-[85vh]"
            >
                {/* CHASSIS (Visual Boxy/Quadrado do Note Ultra) */}
                <div className="relative w-full h-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2b] to-[#1a1a1c] rounded-[8px] p-[2px] shadow-[0_0_60px_rgba(16,185,129,0.15),0_30px_70px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-transform hover:scale-[1.01] duration-500">
                    
                    {/* HOLE-PUNCH CAMERA (Furo discreto central) */}
                    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-50 w-4 h-4 bg-black rounded-full grid place-items-center ring-1 ring-zinc-800/50">
                         <div className="w-1.5 h-1.5 bg-[#1a1a1c] rounded-full ring-1 ring-white/20" />
                    </div>

                    {/* A TELA */}
                    <div className="relative w-full h-full bg-black rounded-[6px] overflow-hidden">
                        <Image
                            src="/readeek-print.jpeg"
                            alt="Readeek Mobile App Interface"
                            fill
                            className="object-cover"
                            priority
                        />
                        
                        {/* Reflexos Premium */}
                        {/* Brilho nas bordas curvas (Edge display effect) */}
                        <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-r from-white/30 to-transparent pointer-events-none mix-blend-overlay"></div>
                        <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-l from-white/30 to-transparent pointer-events-none mix-blend-overlay"></div>
                        {/* Reflexo de luz superior */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay rounded-[6px]"></div>
                    </div>

                    {/* Botões Laterais Físicos */}
                    <div className="absolute top-[140px] -right-[3px] w-[3px] h-[35px] bg-[#2a2a2b] rounded-r-[1px] shadow-sm border-l border-black/50" /> {/* Power */}
                    <div className="absolute top-[190px] -right-[3px] w-[3px] h-[60px] bg-[#2a2a2b] rounded-r-[1px] shadow-sm border-l border-black/50" /> {/* Volume */}
                </div>
            </motion.div>

        </div>
      </div>
    </section> 
  );
}