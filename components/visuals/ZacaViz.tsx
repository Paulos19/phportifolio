"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShoppingBag, Tag, Globe, Star, CreditCard } from "lucide-react";

export function ZacaViz() {
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
        
        {/* --- LAYER 1 (Fundo): GLOBAL NETWORK --- */}
        <motion.div
          style={{ transform: "translateZ(20px)" }}
          className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity"
        >
           <Globe className="w-64 h-64 text-orange-500 animate-pulse" strokeWidth={0.5} />
        </motion.div>

        {/* --- LAYER 2 (Meio): CATEGORIAS FLUTUANTES --- */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="absolute inset-0 pointer-events-none"
        >
           <div className="absolute top-0 left-0 bg-neutral-900 border border-orange-500/30 text-orange-400 text-[10px] px-2 py-1 rounded-full shadow-lg">
              Eletrônicos
           </div>
           <div className="absolute bottom-10 right-0 bg-neutral-900 border border-purple-500/30 text-purple-400 text-[10px] px-2 py-1 rounded-full shadow-lg">
              Moda
           </div>
           <div className="absolute top-1/2 right-10 bg-neutral-900 border border-green-500/30 text-green-400 text-[10px] px-2 py-1 rounded-full shadow-lg">
              Casa
           </div>
        </motion.div>

         {/* --- LAYER 3 (Topo): PRODUCT CARD --- */}
        <motion.div
          style={{ transform: "translateZ(100px) scale(0.95)" }}
          className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
           {/* Header App */}
           <div className="h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-4">
             <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">
               Zacaplace
             </span>
             <ShoppingBag className="w-5 h-5 text-neutral-400" />
           </div>

           {/* Content */}
           <div className="p-5 flex-1 flex flex-col justify-between relative">
             
             {/* Product Image Placeholder */}
             <div className="w-full h-32 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-orange-500/30 transition-colors">
                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src="/zacalogo.png" alt="Zaca" className="w-12 h-12 opacity-50 grayscale group-hover:grayscale-0 transition-all" />
             </div>

             {/* Info */}
             <div className="space-y-2 mt-4">
               <div className="flex justify-between items-start">
                 <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                 <div className="flex gap-0.5">
                   <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                   <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                   <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                 </div>
               </div>
               <div className="h-3 w-1/2 bg-neutral-800 rounded animate-pulse opacity-60" />
             </div>

             {/* Action Bar */}
             <div className="mt-auto flex gap-3 pt-4">
               <div className="flex-1 bg-orange-500 text-black font-bold text-xs rounded py-2 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                 <CreditCard className="w-3 h-3" />
                 Comprar Agora
               </div>
               <div className="w-10 bg-neutral-800 rounded flex items-center justify-center border border-white/5">
                 <Tag className="w-4 h-4 text-neutral-500" />
               </div>
             </div>

           </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}