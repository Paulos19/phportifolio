"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, BrainCircuit, GraduationCap, FileText } from "lucide-react";
import Link from "next/link";

export function ProjectStudyPlan() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax interno
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    /* INICIO DA SECTION - Tema Claro (#F0F2F5) */
    <section className="w-full overflow-hidden bg-[#F0F2F5] text-[#1A1A1A]">
      
      <div ref={containerRef} className="relative h-full w-full flex items-center">
        
        {/* === LAYER 1: BANNER (Imagem de fundo) === */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]"
        >
          <Image
            src="/studyplan-print.png"
            alt="Study Plan Dashboard"
            fill
            className="object-cover object-left md:object-center opacity-40 blur-[2px] md:blur-0"
            priority
          />
        </motion.div>

        {/* === LAYER 2: GRADIENTES (Fade para o fundo Gelo) === */}
        {/* Gradiente inferior para mobile */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#F0F2F5] via-[#F0F2F5]/80 to-transparent" />
        {/* Gradiente lateral para desktop (cobrindo o texto) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#F0F2F5] via-[#F0F2F5]/95 to-transparent md:w-[75%]" />

        {/* === LAYER 3: CONTEÚDO === */}
        <motion.div 
          style={{ y: yContent }}
          className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-24 md:justify-center md:pb-0"
        >
          <div className="max-w-4xl">
            
            {/* Tag / Header */}
            <div className="flex items-center gap-4 mb-6">
              {/* Dourado para a Tag de destaque */}
              <span className="px-3 py-1 rounded-full border border-[#E5A23F]/40 bg-[#E5A23F]/10 text-[#E5A23F] text-xs font-mono tracking-widest uppercase">
                Case Study 002
              </span>
              <div className="h-[1px] w-12 md:w-24 bg-[#E5A23F]/40" />
            </div>

            {/* Título */}
            <h2 className="text-5xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-none mb-6">
              STUDY <br />
              {/* Roxo Principal no gradiente */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6332D1] to-[#1D74D4]">
                PLAN AI.
              </span>
            </h2>

            {/* Grid Descrição + Botões */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              
              {/* Texto e Tags */}
              <div className="max-w-xl">
                <p className="text-lg md:text-xl text-[#1A1A1A]/70 font-medium leading-relaxed mb-8">
                  Gerenciador de estudos inteligente. O usuário importa seu edital (PDF) e a <strong className="text-[#6332D1]">IA Gemini</strong> analisa o conteúdo para construir um cronograma personalizado, transformando burocracia em um plano de ação claro.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { name: "Google Gemini", icon: BrainCircuit },
                    { name: "Edital Parser", icon: FileText },
                    { name: "Gamification", icon: GraduationCap },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#1A1A1A]/10 rounded-lg text-[#1A1A1A] text-xs md:text-sm hover:border-[#6332D1]/50 transition-colors cursor-default shadow-sm">
                      <tech.icon size={14} className="text-[#6332D1]" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
                {/* Botão Principal: Azul Royal */}
                <Link 
                  href="https://studyplanbr.vercel.app/dashboard" 
                  target="_blank"
                  className="group relative px-6 py-4 bg-[#1D74D4] text-white font-bold text-lg rounded-lg overflow-hidden flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg shadow-blue-500/20"
                >
                  <span className="relative z-10">Ver Dashboard</span>
                  <ArrowUpRight size={20} className="relative z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                {/* Botão Secundário */}
                <Link 
                  href="https://github.com/Paulos19/studyplanbr" 
                  target="_blank"
                  className="group px-6 py-4 bg-transparent border-2 border-[#1A1A1A]/10 text-[#1A1A1A] font-medium rounded-lg flex items-center justify-center gap-3 hover:bg-[#1A1A1A] hover:text-white transition-all"
                >
                  <Github size={20} className="group-hover:text-white transition-colors" />
                  <span>Código Fonte</span>
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section> 
  );
}