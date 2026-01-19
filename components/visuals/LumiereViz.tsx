"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChefHat, Wand2, Sparkles, Image as ImageIcon, Share2 } from "lucide-react";

export function LumiereViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [15, -15]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

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
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-[80%] h-[60%]"
      >
        
        {/* --- LAYER 1 (Fundo): N8N WORKFLOW NODES --- */}
        <motion.div
          style={{ transform: "translateZ(20px)" }}
          className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none"
        >
           {/* SVG abstrato de nós conectados */}
           <svg className="w-full h-full absolute" viewBox="0 0 200 100">
             <path d="M20,50 Q100,10 180,50" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse"/>
             <circle cx="20" cy="50" r="4" fill="#f59e0b" />
             <circle cx="100" cy="30" r="4" fill="#f59e0b" />
             <circle cx="180" cy="50" r="4" fill="#f59e0b" />
           </svg>
           <div className="absolute top-4 right-4 bg-neutral-900 border border-amber-500/20 text-amber-500 text-[10px] font-mono px-2 py-1 rounded">
             n8n_webhook_active
           </div>
        </motion.div>

        {/* --- LAYER 2 (Meio): O INGREDIENTE MÁGICO --- */}
        <motion.div
          style={{ transform: "translateZ(60px)" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="bg-neutral-900 border border-amber-500/50 p-4 rounded-full shadow-[0_0_40px_rgba(245,158,11,0.3)]">
              <Wand2 className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </motion.div>

         {/* --- LAYER 3 (Topo): RECIPE CARD --- */}
        <motion.div
          style={{ transform: "translateZ(100px) rotateZ(2deg)" }}
          className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
           {/* Image Generation Area */}
           <div className="h-32 bg-neutral-800 relative group-hover:h-40 transition-all duration-500 overflow-hidden">
             {/* Placeholder para a imagem gerada */}
             <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-neutral-900 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-amber-500/50" />
             </div>
             <div className="absolute bottom-2 left-2 flex gap-1">
               <span className="bg-black/50 backdrop-blur text-white text-[8px] px-1.5 py-0.5 rounded border border-white/10">DALL-E 3</span>
             </div>
           </div>

           {/* Content */}
           <div className="p-4 flex-1 flex flex-col">
             <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-serif font-bold text-lg leading-tight">
                  Risoto de Açafrão <br/>
                  <span className="text-amber-500/80 text-sm font-sans font-normal">& Vieiras Grelhadas</span>
                </h4>
                <div className="bg-amber-500/10 p-1.5 rounded-lg">
                  <ChefHat className="w-4 h-4 text-amber-500" />
                </div>
             </div>

             {/* Steps Skeleton */}
             <div className="space-y-1.5 mt-2 opacity-60">
               <div className="h-1.5 bg-neutral-700 w-full rounded-full" />
               <div className="h-1.5 bg-neutral-700 w-[90%] rounded-full" />
               <div className="h-1.5 bg-neutral-700 w-[60%] rounded-full" />
             </div>

             <div className="mt-auto pt-4 flex items-center justify-between text-xs text-neutral-400">
               <div className="flex items-center gap-1">
                 <Sparkles className="w-3 h-3 text-amber-400" />
                 <span>AI Generated</span>
               </div>
               <Share2 className="w-3 h-3 hover:text-white transition-colors" />
             </div>
           </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}