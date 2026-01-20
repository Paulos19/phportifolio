"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // O scroll observa o container pai (definido no page.tsx com 300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // === SINCRONIA DA ANIMAÇÃO ===
  // A animação acontece nos primeiros 60% do scroll (0 a 0.6).
  // Do 0.6 ao 1.0, a Hero fica estática, esperando ser coberta.

  // 1. Reveal da Cor: De P&B (1) para Colorido (0)
  const grayscaleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  
  // 2. Zoom do Nome: Cresce suavemente
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.25]);
  
  // 3. Movimento Vertical do Nome: Sobe um pouco para dar dinamismo
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "10%"]);
  
  // 4. Opacidade do Texto:
  // IMPORTANTE: O texto NUNCA some. Ele fica opacidade 1 até ser coberto.
  // Começa com 0.9 (levemente transparente) e vai para 1 (totalmente nítido).
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  return (
    // h-full preenche o container 'sticky' do pai
    <section ref={containerRef} className="h-full w-full relative bg-neutral-950 overflow-hidden">
        
        {/* === LAYER 1: Imagem Colorida (Base - Fica por baixo) === */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/heroImage.png"
            alt="Paulo Henrique Color"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Vinheta leve para garantir contraste do texto */}
          <div className="absolute inset-0 bg-neutral-950/20" />
        </div>

        {/* === LAYER 2: Imagem P&B (Cobre a colorida e desaparece) === */}
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
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div 
            style={{ scale: textScale, y: textY, opacity: textOpacity }}
            className="text-center mix-blend-overlay"
          >
            <h1 className="text-[13vw] leading-[0.8] font-serif font-bold text-white tracking-tighter uppercase opacity-90">
              Paulo
              <br />
              Henrique
            </h1>
          </motion.div>
        </div>

        {/* Detalhes Técnicos (Rodapé da Hero) */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]) }}
          className="absolute bottom-12 left-12 z-30 text-neutral-200 hidden md:block"
        >
          <p className="font-mono text-xs mb-1 tracking-widest text-emerald-400">LOCALIZAÇÃO</p>
          <p className="font-bold text-xl">SÃO PAULO, BR</p>
        </motion.div>

    </section>
  );
}