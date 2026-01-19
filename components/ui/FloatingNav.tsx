"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function FloatingNav() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl">
        <span className="font-serif font-bold text-xl tracking-tighter">PH.</span>
        
        <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
          {["Sobre", "Projetos", "Skills", "Contato"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors">
          Let's Talk
        </button>
      </div>
    </motion.nav>
  );
}