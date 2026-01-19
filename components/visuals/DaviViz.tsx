"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Users, Filter, Bot, MessageSquare, Calendar } from "lucide-react";

export function DaviViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Variáveis de movimento (Tilt Effect)
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [10, -10]); // Menos rotação para parecer mais "sólido/corporativo"
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }
  }
  
  function handleMouseLeave() {
    x.set(200);
    y.set(200);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }} 
      className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-visible cursor-pointer group"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-[85%] h-[65%]"
      >
        
        {/* --- LAYER 1 (Fundo): DATALAKE / RAG CONTEXT (Menor translateZ) --- */}
        <motion.div
          style={{ transform: "translateZ(20px)" }}
          className="absolute inset-0 bg-neutral-900/50 border border-blue-500/10 rounded-xl p-4 flex flex-wrap gap-2 content-center justify-center opacity-40 group-hover:opacity-80 transition-opacity duration-500"
        >
          {/* Representação de Dados Dispersos */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-blue-900/40 border border-blue-500/20 flex items-center justify-center animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-1 h-1 bg-blue-400 rounded-full" />
            </div>
          ))}
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-blue-300/50">RAG_KNOWLEDGE_BASE</div>
        </motion.div>

        {/* --- Conexões (Linhas verticais) --- */}
        <motion.div style={{ transform: "translateZ(40px)" }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[80%] h-[1px] bg-blue-500/30 blur-[1px]" />
             <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full blur-xl" />
        </motion.div>

        {/* --- LAYER 2 (Meio): AI CLASSIFIER (O Cérebro) --- */}
        <motion.div
          style={{ transform: "translateZ(60px)" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="flex gap-8">
            <div className="relative bg-neutral-950 border border-blue-400/50 p-3 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-400" />
              <span className="text-[10px] font-mono text-blue-200">AUTO_CLASSIFY</span>
            </div>
          </div>
        </motion.div>

         {/* --- LAYER 3 (Topo): CRM INTERFACE / KANBAN (Maior translateZ) --- */}
        <motion.div
          style={{ transform: "translateZ(100px) scale(0.95)" }}
          className="absolute inset-0 bg-neutral-900 border border-neutral-700/50 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
           {/* Header CRM */}
           <div className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-blue-500" />
               <span className="text-xs font-bold text-neutral-300">Davi CRM</span>
             </div>
             <div className="flex gap-2">
                <div className="w-20 h-2 bg-white/10 rounded-full" />
                <div className="w-6 h-6 rounded-full bg-white/10" />
             </div>
           </div>

           {/* Kanban Board UI */}
           <div className="p-4 grid grid-cols-3 gap-3 h-full items-start">
             
             {/* Coluna 1: Leads */}
             <div className="bg-white/5 rounded-lg p-2 space-y-2 h-[80%]">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] uppercase font-bold text-neutral-500">Novos</span>
                 <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 rounded">4</span>
               </div>
               <div className="bg-neutral-800 p-2 rounded border border-white/5 shadow-sm">
                 <div className="w-16 h-1.5 bg-neutral-600 rounded mb-1" />
                 <div className="w-full h-1 bg-neutral-700 rounded" />
               </div>
               <div className="bg-neutral-800 p-2 rounded border border-white/5 shadow-sm opacity-60">
                 <div className="w-12 h-1.5 bg-neutral-600 rounded mb-1" />
                 <div className="w-full h-1 bg-neutral-700 rounded" />
               </div>
             </div>

             {/* Coluna 2: Em Negociação (Active) */}
             <div className="bg-white/5 rounded-lg p-2 space-y-2 h-full border-t-2 border-blue-500/50">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] uppercase font-bold text-blue-400">Qualificados</span>
                 <Filter className="w-3 h-3 text-blue-400" />
               </div>
               {/* Card Ativo */}
               <motion.div 
                 animate={{ y: [0, 5, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="bg-blue-900/20 p-2 rounded border border-blue-500/30 shadow-lg relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 p-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 </div>
                 <div className="flex items-center gap-2 mb-2">
                   <div className="w-5 h-5 rounded-full bg-blue-500/50 flex items-center justify-center text-[8px]">PH</div>
                   <div className="w-16 h-1.5 bg-blue-200/50 rounded" />
                 </div>
                 <div className="flex gap-1 mt-2">
                    <span className="text-[8px] px-1 bg-blue-500/10 rounded border border-blue-500/20 text-blue-300">High Ticket</span>
                    <span className="text-[8px] px-1 bg-blue-500/10 rounded border border-blue-500/20 text-blue-300">Hot</span>
                 </div>
               </motion.div>
             </div>

             {/* Coluna 3: Agenda */}
             <div className="bg-white/5 rounded-lg p-2 space-y-2 h-[70%]">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] uppercase font-bold text-neutral-500">Agenda</span>
                 <Calendar className="w-3 h-3 text-neutral-500" />
               </div>
               <div className="bg-neutral-800 p-2 rounded border border-white/5 flex gap-2 items-center">
                 <div className="text-[8px] font-bold text-center leading-tight text-neutral-400">
                    14<br/>OUT
                 </div>
                 <div className="flex-1 h-1 bg-neutral-600 rounded" />
               </div>
             </div>

           </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}