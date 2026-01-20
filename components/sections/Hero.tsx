"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hook para capturar o progresso do scroll apenas dentro desta div gigante
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Começa no topo, termina quando o topo da div sair da tela
  });

  // Transformações baseadas no scroll (0 a 1)
  
  // 1. A imagem P&B vai sumindo (revelando a colorida por trás)
  const grayscaleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // 2. O texto se move levemente e muda de escala
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 4.5]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]); // Texto some ao dar zoom excessivo
  
  // 3. Efeito de textura/mask no texto (O texto começa sólido e vira vazado/máscara)
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="h-[250vh] relative bg-neutral-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* === LAYER 1: Imagem Colorida (Base) === */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/heroImage.png"
            alt="Paulo Henrique Color"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay gradiente para garantir leitura do footer da imagem se necessário */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        </div>

        {/* === LAYER 2: Imagem P&B (Cobre a colorida e some com scroll) === */}
        <motion.div 
          style={{ opacity: grayscaleOpacity }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <Image
            src="/heroImage.png"
            alt="Paulo Henrique BW"
            fill
            className="object-cover object-center grayscale brightness-90 contrast-125"
            priority
          />
        </motion.div>

        {/* === LAYER 3: Texto Tipográfico === */}
        <motion.div 
          style={{ scale: textScale, opacity: textOpacity, y: textY }}
          className="relative z-20 text-center mix-blend-overlay"
        >
          <h1 className="text-[12vw] leading-none font-serif font-bold text-white tracking-tighter uppercase opacity-90">
            Paulo
            <br />
            Henrique
          </h1>
        </motion.div>

        {/* === LAYER 4: Detalhes Técnicos (Overlay fixo que não dá zoom) === */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-12 left-12 z-30 text-neutral-200 hidden md:block"
        >
          <p className="font-mono text-xs mb-1">LOCALIZAÇÃO</p>
          <p className="font-bold">BRASIL</p>
        </motion.div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-12 right-12 z-30 text-right text-neutral-200 hidden md:block"
        >
          <p className="font-mono text-xs mb-1">STACK PRINCIPAL</p>
          <p className="font-bold">NEXT.JS / N8N / TAILWIND</p>
        </motion.div>

      </div>
    </section>
  );
}