"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

interface ProjectCardProps {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  children: React.ReactNode;
  color: string;
  direction: 'left' | 'right' | 'none'; // Nova prop para controlar o lado
}

export const ProjectCard = ({ i, progress, range, children, color, direction }: ProjectCardProps) => {
  
  // Define o valor inicial baseado na direção (fora da tela)
  const xStart = direction === 'right' ? '100%' : direction === 'left' ? '-100%' : '0%';
  
  // Transforma o scroll vertical em movimento horizontal (X)
  // Quando o scroll está no início do range, o card está fora (xStart).
  // Quando o scroll chega no fim do range, o card está centralizado (0%).
  const x = useTransform(progress, range, [xStart, '0%']);
  
  // Sombra dinâmica: Só aparece quando o card está entrando para dar profundidade
  // const shadow = useTransform(progress, range, ["0px 0px 0px rgba(0,0,0,0)", "-50px 0px 100px rgba(0,0,0,0.5)"]);

  return (
    <div 
      className="h-screen flex items-center justify-center sticky top-0"
      style={{ 
        // Z-Index crescente garante que o próximo projeto sempre cubra o anterior
        zIndex: i 
      }} 
    >
      <motion.div 
        style={{ 
          x, // Aplica o movimento lateral
          backgroundColor: color,
        }} 
        // Adicionamos uma sombra forte na lateral para destacar a sobreposição
        className={`relative w-full h-full flex flex-col justify-center overflow-hidden border-l border-white/10 ${direction !== 'none' ? 'shadow-[0_0_100px_rgba(0,0,0,0.3)]' : ''}`}
      >
        {children}
      </motion.div>
    </div>
  );
};