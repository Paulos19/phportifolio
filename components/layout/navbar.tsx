"use client";

import { motion } from "framer-motion";
import { Terminal, Menu } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none mix-blend-difference text-white"
    >
      {/* Esquerda: Identidade */}
      <div className="pointer-events-auto flex gap-3 items-center group cursor-pointer">
        <div className="relative">
          <Terminal size={28} className="text-white" />
          {/* Pequeno glow no ícone */}
          <div className="absolute inset-0 bg-white blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-lg tracking-tighter">PAULO HENRIQUE</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 group-hover:tracking-[0.3em] transition-all">
            Fullstack Developer
          </span>
        </div>
      </div>

      {/* Direita: Menu e Status */}
      <div className="flex flex-col items-end gap-1 pointer-events-auto">
        <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <span className="text-xs font-mono hidden md:block">[MENU]</span>
          <Menu size={32} strokeWidth={1.5} />
        </button>
        <div className="text-[10px] font-mono opacity-60 mt-1">
          V.2026 // SYSTEM ACTIVE
        </div>
      </div>
    </motion.header>
  );
}