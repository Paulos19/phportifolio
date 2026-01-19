"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. O container tem 250vh. Isso define o "tempo" da animação.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // === ANIMAÇÕES ===
  
  // A imagem P&B (Grayscale) some gradualmente até 50% do scroll
  const grayscaleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // O Texto aumenta de tamanho (Zoom In)
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  
  // AQUI O AJUSTE: O texto NÃO SOME mais no meio (0.6). 
  // Ele fica visível até quase o final (0.9), quando a próxima seção já estará cobrindo.
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  
  // Movimento vertical leve do texto para dar dinamismo
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  return (
    // Esta div define a altura física no DOM. Empurra o próximo conteúdo para baixo.
    <section ref={containerRef} className="h-[250vh] relative bg-neutral-950 z-0">
      
      {/* Esta div interna é quem TRAVA na tela enquanto o pai (250vh) scrolla */}
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
          {/* Overlay gradiente para garantir leitura */}
          <div className="absolute inset-0 bg-neutral-950/30" />
        </div>

        {/* === LAYER 2: Imagem P&B (Cobre a colorida e some) === */}
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

        {/* === LAYER 3: Texto (Agora fica visível junto com a cor) === */}
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

        {/* Info Extra (Só para decorar) */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-12 left-12 z-30 text-neutral-200 hidden md:block"
        >
          <p className="font-mono text-xs mb-1">LOCALIZAÇÃO</p>
          <p className="font-bold">BRASIL</p>
        </motion.div>

      </div>
    </section>
  );
}