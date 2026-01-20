"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, BarChart3, Users, Bot, Target } from "lucide-react";
import Link from "next/link";

export function ProjectDavi() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax interno
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    /* INICIO DA SECTION - Fundo Gelo Neutro (#F8FAFC) */
    <section className="w-full overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      
      <div ref={containerRef} className="relative h-full w-full flex items-center">
        
        {/* === LAYER 1: BANNER (Imagem de fundo) === */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]"
        >
          <Image
            src="/davi-print.png"
            alt="Davi CRM Dashboard"
            fill
            // AJUSTE 1: Aumentei a opacidade (opacity-60) para o banner aparecer mais
            // Mantive um blur leve para não brigar com o texto
            className="object-cover object-left md:object-center opacity-60 blur-[2px]"
            priority
          />
          {/* AJUSTE 2: Overlay Escuro (Linear Gradient) para dar contraste ("Blur mais escuro") */}
          {/* Isso escurece a imagem para que ela não suma no fundo branco */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent mix-blend-multiply" />
        </motion.div>

        {/* === LAYER 2: GRADIENTES DE TRANSIÇÃO (Para o Fundo Gelo) === */}
        
        {/* Gradiente inferior: Começa transparente e vai para o Gelo Sólido na base */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent" />
        
        {/* Gradiente lateral: Garante a leitura do texto à direita/esquerda */}
        {/* Ajustado para cobrir menos a imagem (via mais suave) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent md:w-[80%]" />

        {/* === LAYER 3: CONTEÚDO === */}
        <motion.div 
          style={{ y: yContent }}
          className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-24 md:justify-center md:pb-0"
        >
          <div className="max-w-4xl">
            
            {/* Tag / Header */}
            <div className="flex items-center gap-4 mb-6">
              {/* Roxo Violeta para a Tag de destaque (Davi Pro) */}
              <span className="px-3 py-1 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-mono tracking-widest uppercase font-bold backdrop-blur-md">
                Case Study 004
              </span>
              <div className="h-[1px] w-12 md:w-24 bg-[#7C3AED]/40" />
            </div>

            {/* Título */}
            <h2 className="text-5xl md:text-8xl font-black text-[#0F172A] tracking-tighter leading-none mb-6">
              DAVI <br />
              {/* Gradiente do Azul Marinho para o Azul Sky */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#7C3AED] to-[#38BDF8]">
                INTELLIGENCE.
              </span>
            </h2>

            {/* Grid Descrição + Botões */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              
              {/* Texto e Tags */}
              <div className="max-w-xl">
                <p className="text-lg md:text-xl text-[#0F172A]/80 font-medium leading-relaxed mb-8">
                  Plataforma avançada de <strong className="text-[#7C3AED]">Gestão de Leads</strong> e prospecção. Utiliza IA para classificar oportunidades, gerar relatórios de performance e otimizar a ocupação da agenda com indicadores de <span className="text-[#22C55E] font-bold">alta precisão</span>.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { name: "Lead Scoring", icon: Target },
                    { name: "AI Reports", icon: Bot },
                    { name: "Analytics", icon: BarChart3 },
                    { name: "CRM Flow", icon: Users },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#0F172A]/10 rounded-lg text-[#0F172A] text-xs md:text-sm hover:border-[#7C3AED] transition-colors cursor-default shadow-sm group">
                      <tech.icon size={14} className="text-[#0F172A] group-hover:text-[#7C3AED] transition-colors" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
                {/* Botão Principal: Azul Marinho Profundo */}
                <Link 
                  href="https://davi-chi.vercel.app/dashboard" 
                  target="_blank"
                  className="group relative px-6 py-4 bg-[#0F172A] text-white font-bold text-lg rounded-lg overflow-hidden flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg shadow-slate-900/20"
                >
                  <span className="relative z-10">Acessar Plataforma</span>
                  <ArrowUpRight size={20} className="relative z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 text-[#38BDF8]" />
                  {/* Efeito Hover com Roxo Violeta */}
                  <div className="absolute inset-0 bg-[#7C3AED] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                {/* Botão Secundário */}
                <Link 
                  href="https://github.com/Paulos19/davi" 
                  target="_blank"
                  className="group px-6 py-4 bg-transparent border-2 border-[#0F172A]/10 text-[#0F172A] font-medium rounded-lg flex items-center justify-center gap-3 hover:bg-[#0F172A] hover:text-white transition-all"
                >
                  <Github size={20} className="group-hover:text-[#38BDF8] transition-colors" />
                  <span>Source Code</span>
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section> 
  );
}