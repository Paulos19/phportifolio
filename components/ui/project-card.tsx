// components/ui/project-card.tsx
"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ProjectCardProps {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  children: React.ReactNode;
  color: string;
}

export const ProjectCard = ({ i, progress, range, targetScale, children, color }: ProjectCardProps) => {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Escala: O card diminui (vai para o fundo) conforme o scroll avança e o próximo sobe
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // O Container tem altura definida e é sticky. 
    // O "top" dinâmico (i * 25) cria o efeito de "pilha" visível no topo.
    <div 
      ref={container} 
      className="h-screen flex items-center justify-center sticky"
      style={{ top: 0 }} 
    >
      <motion.div 
        style={{ 
          scale,
          backgroundColor: color, 
          // O último card não precisa descer o top, ele fecha a pilha
          top: `calc(-5vh + ${i * 25}px)` 
        }} 
        className="relative w-full h-full origin-top flex flex-col justify-center rounded-t-[2.5rem] overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.5)] border-t border-white/10"
      >
        {children}
      </motion.div>
    </div>
  );
};