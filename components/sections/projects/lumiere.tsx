"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Sparkles, Workflow, ChefHat } from "lucide-react";
import Link from "next/link";

export function ProjectLumiere() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax interno
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    /* FIX ESTRUTURAL: 
       - Adicionado 'relative h-full' para ocupar 100% do card pai.
       - Mantido bg-[#0A1410] (Dark Theme).
    */
    <section className="relative w-full h-full overflow-hidden bg-[#0A1410]">
      
      <div ref={containerRef} className="relative h-full w-full flex items-center">
        
        {/* === LAYER 1: BANNER === */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]"
        >
          <Image
            src="/project-lumiere.png"
            alt="Lumiere Project Banner"
            fill
            /* Mantive opacity-50 pois o fundo é escuro, garantindo 
               que a imagem apareça sem brigar com o texto branco */
            className="object-cover object-center opacity-50"
            priority
          />
        </motion.div>

        {/* === LAYER 2: GRADIENTES === */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A1410] via-[#0A1410]/80 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A1410] via-[#0A1410]/90 to-transparent md:w-[70%]" />

        {/* === LAYER 3: CONTEÚDO === */}
        <motion.div 
          style={{ y: yContent }}
          className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-24 md:justify-center md:pb-0"
        >
          <div className="max-w-4xl">
            
            {/* Tag / Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] text-xs font-mono tracking-widest uppercase backdrop-blur-md">
                Case Study 001
              </span>
              <div className="h-[1px] w-12 md:w-24 bg-[#C5A059]/30" />
            </div>

            {/* Título */}
            <h2 className="text-5xl md:text-8xl font-black text-[#E5E5E5] tracking-tighter leading-none mb-6">
              LUMIERE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5E5E5]">
                GASTRONOMY.
              </span>
            </h2>

            {/* Grid Descrição + Botões */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              
              {/* Texto e Tags */}
              <div className="max-w-xl">
                <p className="text-lg md:text-xl text-[#E5E5E5]/80 font-light leading-relaxed mb-8">
                  Uma plataforma de <strong className="text-[#C5A059]">arquitetura culinária</strong> potencializada por IA. 
                  O Lumiere utiliza fluxos complexos de <strong>N8N</strong> para orquestrar a geração de receitas e imagens gastronômicas personalizadas em tempo real.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { name: "N8N Workflow", icon: Workflow },
                    { name: "Generative AI", icon: Sparkles },
                    { name: "Next.js 15", icon: Sparkles },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#C5A059]/20 rounded-lg text-[#E5E5E5] text-xs md:text-sm hover:border-[#C5A059] transition-colors cursor-default">
                      <tech.icon size={14} className="text-[#C5A059]" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
                <Link 
                  href="https://lumieres-mu.vercel.app/" 
                  target="_blank"
                  className="group relative px-6 py-4 bg-[#C5A059] text-[#0A1410] font-bold text-lg rounded-lg overflow-hidden flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                >
                  <span className="relative z-10">Live Demo</span>
                  <ArrowUpRight size={20} className="relative z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                <Link 
                  href="https://github.com/Paulos19/lumieres" 
                  target="_blank"
                  className="group px-6 py-4 bg-[#1A1A1A] border border-[#C5A059]/30 text-[#E5E5E5] font-medium rounded-lg flex items-center justify-center gap-3 hover:bg-[#1A1A1A]/80 hover:border-[#C5A059] transition-colors"
                >
                  <Github size={20} className="text-[#C5A059]" />
                  <span>Source Code</span>
                </Link>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Decoração Fundo */}
        <div className="absolute bottom-10 right-6 md:right-10 opacity-20 pointer-events-none">
           <ChefHat size={120} strokeWidth={0.5} className="text-[#C5A059]" />
        </div>

      </div>
    </section> 
  );
}