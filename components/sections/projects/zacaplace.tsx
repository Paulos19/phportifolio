"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ShoppingBag, Store, CreditCard } from "lucide-react";
import Link from "next/link";

export function ProjectZacaplace() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax interno
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    /* FIX ESTRUTURAL: 'relative h-full' para o card do baralho */
    <section className="relative w-full h-full overflow-hidden bg-[#F3F4F6] text-[#1A1A1A]">
      
      <div ref={containerRef} className="relative h-full w-full flex items-center">
        
        {/* === LAYER 1: BANNER (Imagem de fundo) === */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]"
        >
          <Image
            src="/zaca-print.png"
            alt="Zacaplace Marketplace"
            fill
            /* FIX CONTRASTE 1: Opacidade 70% e Blur reduzido para destacar o print */
            className="object-cover object-left md:object-center opacity-70 blur-[1px]"
            priority
          />
          
          /* FIX CONTRASTE 2: Overlay Escuro.
             Essencial para garantir que o texto branco/escuro tenha leitura
             sobre qualquer imagem colorida do marketplace. */
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent mix-blend-multiply" />
        </motion.div>

        {/* === LAYER 2: GRADIENTES (Fade para o fundo Gelo) === */}
        
        {/* Gradiente Verde Lima sutil na base (identidade do projeto) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#F3F4F6] via-[#F3F4F6]/85 to-transparent" />
        
        {/* Gradiente lateral para legibilidade do texto à esquerda */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#F3F4F6] via-[#F3F4F6]/95 to-transparent md:w-[75%]" />

        {/* === LAYER 3: CONTEÚDO === */}
        <motion.div 
          style={{ y: yContent }}
          className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-24 md:justify-center md:pb-0"
        >
          <div className="max-w-4xl">
            
            {/* Tag / Header */}
            <div className="flex items-center gap-4 mb-6">
              {/* Rosa Magenta para destaque e contraste */}
              <span className="px-3 py-1 rounded-full border border-[#D94892]/40 bg-[#D94892]/10 text-[#D94892] text-xs font-mono tracking-widest uppercase backdrop-blur-md">
                Case Study 003
              </span>
              <div className="h-[1px] w-12 md:w-24 bg-[#D94892]/40" />
            </div>

            {/* Título */}
            <h2 className="text-5xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-none mb-6">
              ZACA <br />
              {/* Verde Lima no gradiente */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76C859] to-[#9333EA]">
                PLACE.
              </span>
            </h2>

            {/* Grid Descrição + Botões */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              
              {/* Texto e Tags */}
              <div className="max-w-xl">
                <p className="text-lg md:text-xl text-[#1A1A1A]/70 font-medium leading-relaxed mb-8">
                  Uma plataforma de <strong className="text-[#D94892]">Marketplace completa</strong> focada no comércio local de Sete Lagoas. Conecta vendedores e compradores com uma interface intuitiva, evocando crescimento e facilidade.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { name: "Multi-vendor", icon: Store },
                    { name: "E-commerce", icon: ShoppingBag },
                    { name: "Payments", icon: CreditCard },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#1A1A1A]/10 rounded-lg text-[#1A1A1A] text-xs md:text-sm hover:border-[#76C859] transition-colors cursor-default shadow-sm">
                      <tech.icon size={14} className="text-[#76C859]" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
                {/* Botão Principal: Verde Lima com texto escuro para contraste */}
                <Link 
                  href="https://zacaplace.vercel.app" 
                  target="_blank"
                  className="group relative px-6 py-4 bg-[#76C859] text-[#1A1A1A] font-bold text-lg rounded-lg overflow-hidden flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg shadow-green-500/20"
                >
                  <span className="relative z-10">Acessar Loja</span>
                  <ArrowUpRight size={20} className="relative z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                {/* Botão Secundário */}
                <Link 
                  href="https://github.com/Paulos19/make-marketplace" 
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