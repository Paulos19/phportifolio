"use client";

import { useRef } from "react";
import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue,
  useSpring
} from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Rastreia o scroll APENAS dentro desta section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // === SINCRONIA FINA ===
  // O texto termina de animar (separar e sumir) em 70% do scroll (0.7)
  // Os 30% restantes são um respiro para o usuário ver a imagem antes da próxima seção subir.
  
  // Movimento: "Explosão" para as laterais
  const xLeft = useTransform(scrollYProgress, [0, 0.7], ["0%", "-100%"]); 
  const xRight = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);
  
  // Opacidade: O texto some um pouco antes de chegar na borda
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]); 
  
  // Zoom suave na imagem de fundo para dar sensação de profundidade
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // === EFEITO FLASHLIGHT (MOUSE) ===
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  function handleMouseMove(e: React.MouseEvent) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${smoothX}px ${smoothY}px, black, transparent)`;

  return (
    // Altura de 150vh: Garante tempo de scroll para animação acontecer antes da próxima seção chegar
    <section 
      ref={containerRef} 
      className="relative h-[150vh] w-full bg-background" 
    >
      {/* O conteúdo visual é STICKY e ocupa exatamente 100vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* === LAYER 1: BASE GRAYSCALE === */}
        <motion.div 
          style={{ scale: scaleImage }}
          className="absolute inset-0 z-0 opacity-40 grayscale contrast-125 origin-center"
        >
           <Image
            src="/heroImage.png"
            alt="Paulo Henrique Grayscale"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* === LAYER 2: TEXTURA DIGITAL === */}
        <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        {/* === LAYER 3: COLOR REVEAL (MASK) === */}
        <motion.div 
          className="absolute inset-0 z-20 hidden md:block"
          style={{ 
            scale: scaleImage, // Sincroniza o zoom com a layer de baixo
            maskImage, 
            WebkitMaskImage: maskImage,
          }}
          onMouseMove={handleMouseMove}
        >
          <Image
            src="/heroImage.png"
            alt="Paulo Henrique Color"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* === LAYER 4: TIPOGRAFIA (PARALLAX) === */}
        <div className="relative z-30 w-full px-4 mix-blend-difference text-white pointer-events-none">
          <motion.div 
            style={{ opacity: opacityText }}
            className="flex flex-col items-center justify-center"
          >
            {/* PAULO (Vai para esquerda) */}
            <motion.h1 
              style={{ x: xLeft }}
              className="text-[12vw] md:text-[14vw] font-black leading-[0.8] tracking-tighter"
            >
              PAULO
            </motion.h1>
            
            {/* HENRIQUE (Vai para direita) */}
            <motion.h1 
              style={{ x: xRight }}
              className="text-[12vw] md:text-[14vw] font-black leading-[0.8] tracking-tighter text-outline-transparent"
            >
              HENRIQUE
            </motion.h1>

            {/* Informações Extras */}
            <div className="mt-12 flex gap-8 text-sm md:text-base font-mono tracking-widest uppercase opacity-80">
              <span>Dev. Frontend</span>
              <span>•</span>
              <span>26 Anos</span>
              <span>•</span>
              <span>Brasil</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator (Desaparece logo no início do scroll) */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-pulse"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}