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
import { ArrowRight, Terminal, Zap, Database } from "lucide-react";

export function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Rastreia quando este componente entra na tela (viewport)
  // offset: ["start end"] -> Começa quando o topo do About toca o fundo da tela
  // ["end start"] -> Termina quando o fundo do About toca o topo da tela
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"], 
  });

  // === A MÁGICA DO SLIDE LATERAL ===
  // Convertemos o movimento vertical natural (o elemento subindo) em horizontal.
  // Quando o scrollProgress é 0 (topo do elemento no fundo da tela), x é 100% (fora à direita).
  // Quando o scrollProgress é 1 (elemento ocupa toda a tela), x é 0% (centralizado).
  const x = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  
  // Pequena escala para dar profundidade (efeito 3D sutil ao entrar)
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  
  // Controle do Mouse (Manteve-se a lógica da "Lanterna")
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 250, damping: 25 });

  function handleMouseMove(e: React.MouseEvent) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black, transparent)`;

  return (
    // O Container agora é exatamente 100vh (h-screen). 
    // Usamos 'overflow-hidden' no layout pai para esconder o scroll horizontal.
    <section ref={targetRef} className="relative h-screen w-full overflow-hidden pointer-events-none">
      
      {/* O Conteúdo Animado */}
      <motion.div 
        style={{ x, scale }}
        className="relative w-full h-full bg-white pointer-events-auto shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
        onMouseMove={handleMouseMove}
      >
        
        {/* === LAYER 1: BASE (B&W) === */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/profileHero.png"
            alt="Background"
            fill
            className="object-cover object-center grayscale contrast-125 opacity-20 md:opacity-100" 
            priority
          />
          {/* Gradiente de Leitura (Esquerda -> Direita) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-[80%] z-10" />
        </div>

        {/* === LAYER 2: REVEAL (Color + Signature) === */}
        <motion.div 
          className="absolute inset-0 z-10 bg-white"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          {/* Textura de Fundo (Assinaturas) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap content-center justify-center gap-32 rotate-[-5deg]">
             {Array.from({ length: 40 }).map((_, i) => (
                <span key={i} className="font-[family-name:var(--font-signature)] text-7xl text-violet-600 whitespace-nowrap select-none">
                  Paulo Henrique
                </span>
             ))}
          </div>
          {/* Imagem Colorida */}
          <Image src="/profileHero.png" alt="Color Reveal" fill className="object-cover object-center" />
        </motion.div>

        {/* === LAYER 3: CONTEÚDO (Texto) === */}
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-8 pl-4 md:pl-0">
            
            {/* Header */}
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <span className="w-12 h-[2px] bg-zinc-900" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                        Quem sou eu
                    </span>
                </motion.div>
                
                <h2 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter leading-[0.85]">
                TECH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                    ALCHEMIST.
                </span>
                </h2>
            </div>

            {/* Copy */}
            <p className="text-xl text-zinc-600 font-light leading-relaxed max-w-lg">
                Combinando a precisão da engenharia de software com a fluidez do design. Focado em <strong className="text-zinc-900">Next.js</strong> e automação inteligente.
            </p>

            {/* Grid de Specs */}
            <div className="grid grid-cols-2 gap-6 py-4 border-t border-zinc-200">
                <div>
                    <h4 className="flex items-center gap-2 font-bold text-zinc-900 mb-1">
                        <Terminal size={16} className="text-violet-600"/> Stack
                    </h4>
                    <p className="text-sm text-zinc-500">React, Next.js 15, Tailwind</p>
                </div>
                <div>
                    <h4 className="flex items-center gap-2 font-bold text-zinc-900 mb-1">
                        <Zap size={16} className="text-violet-600"/> Automação
                    </h4>
                    <p className="text-sm text-zinc-500">N8N, Webhooks, AI Agents</p>
                </div>
            </div>

            <button className="flex items-center gap-3 text-zinc-900 font-bold border-b-2 border-zinc-900 pb-1 hover:text-violet-600 hover:border-violet-600 transition-colors">
                Explorar Projetos <ArrowRight size={18} />
            </button>

          </div>
        </div>

      </motion.div>
    </section>
  );
}