"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FileText, Cpu, CheckCircle, BarChart3 } from "lucide-react";

export function StudyPlanViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Variáveis de movimento para o efeito tilt 3D
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  // Transforma a posição do mouse em graus de rotação
  // Ajuste os valores de saída ([15, -15]) para mais ou menos intensidade
  const rotateX = useTransform(y, [0, 400], [15, -15]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }
  }
  
  // Reseta a posição quando o mouse sai
  function handleMouseLeave() {
    x.set(200);
    y.set(200);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: 1000, // Define a profundidade da cena 3D
      }} 
      className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-visible cursor-pointer group"
    >
      {/* Container que realmente rotaciona */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // Crucial para o efeito 3D funcionar nos filhos
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-[80%] h-[60%]"
      >
        
        {/* --- LAYER 1 (Fundo): INPUT / EDITAL (Menor translateZ) --- */}
        <motion.div
          style={{ transform: "translateZ(20px) rotateZ(-5deg)" }}
          className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg p-6 shadow-xl backdrop-blur-sm flex flex-col items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity"
        >
          <FileText className="w-12 h-12 text-neutral-500 mb-4" />
          <div className="w-full space-y-2 opacity-50">
            <div className="h-2 bg-neutral-500 rounded w-3/4 mx-auto animate-pulse" />
            <div className="h-2 bg-neutral-500 rounded w-full animate-pulse delay-75" />
            <div className="h-2 bg-neutral-500 rounded w-5/6 mx-auto animate-pulse delay-100" />
            <p className="text-xs font-mono text-center mt-2 text-neutral-400">Edital_Bruto.pdf</p>
          </div>
        </motion.div>

        {/* --- Conector Visual (Linhas de fluxo) --- */}
        <motion.div style={{ transform: "translateZ(40px)" }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
        </motion.div>

        {/* --- LAYER 2 (Meio): PROCESSAMENTO / AI (Médio translateZ) --- */}
        <motion.div
          style={{ transform: "translateZ(60px)" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="relative z-10 bg-neutral-900/80 border border-emerald-500/30 p-4 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_80px_rgba(16,185,129,0.4)] transition-shadow">
            <Cpu className="w-10 h-10 text-emerald-400 animate-spin-slow" />
             {/* Efeito de "Glow" atrás do chip */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full -z-10" />
          </div>
        </motion.div>

         {/* --- LAYER 3 (Topo): OUTPUT / DASHBOARD (Maior translateZ) --- */}
        <motion.div
          style={{ transform: "translateZ(100px) rotateZ(2deg) scale(1.05)" }}
          className="absolute inset-0 bg-neutral-900/90 border border-white/20 rounded-lg shadow-2xl overflow-hidden flex flex-col"
        >
           {/* Fake Browser Header */}
           <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
             <span className="ml-2 text-[10px] font-mono text-neutral-500">studyplan.app/dashboard</span>
           </div>

           {/* Fake Dashboard Content */}
           <div className="p-4 grid grid-cols-2 gap-3 flex-1 relative">
             
             {/* Card 1: Progresso */}
             <div className="bg-white/5 rounded p-3 border border-white/10 flex flex-col justify-between">
               <div>
                 <BarChart3 className="w-5 h-5 text-emerald-400 mb-2" />
                 <h4 className="text-xs text-neutral-400 font-bold">Progresso Semanal</h4>
               </div>
               <div className="flex items-end gap-1 h-12 mt-2">
                 <div className="flex-1 bg-emerald-500/20 h-[60%] rounded-t"></div>
                 <div className="flex-1 bg-emerald-500/50 h-[90%] rounded-t animate-pulse"></div>
                 <div className="flex-1 bg-emerald-500/30 h-[40%] rounded-t"></div>
               </div>
             </div>

             {/* Card 2: Próximas Tarefas */}
             <div className="bg-white/5 rounded p-3 border border-white/10 space-y-2">
                <h4 className="text-xs text-neutral-400 font-bold mb-2">Hoje</h4>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="text-white">Matemática: Funções</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-60">
                  <div className="w-3 h-3 rounded-full border border-neutral-500" />
                  <span>Português: Crase</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-60">
                  <div className="w-3 h-3 rounded-full border border-neutral-500" />
                  <span>Quiz: Lógica</span>
                </div>
             </div>

             {/* Efeito de scanline sutil */}
             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
           </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}