"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Mail, MessageCircle, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ajusta apenas o padding/tamanho ao scrollar, sem mudar cor de fundo
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        // NAVBAR TOTALMENTE TRANSPARENTE
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "py-4" : "py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="group relative z-50">
            <span className="text-2xl font-black text-white tracking-tighter">
              PH
              <span className="text-violet-500 group-hover:text-white transition-colors duration-300">.</span>
            </span>
            {/* Glow sutil atrás do logo */}
            <div className="absolute -inset-4 bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </Link>

          {/* DESKTOP NAV & ACTIONS */}
          <div className="hidden md:flex items-center gap-8">
            
            {/* Links de Navegação (Dentro de uma cápsula de vidro sutil "Range Effect") */}
            <div className={`
                flex items-center gap-1 px-2 py-1.5 rounded-full border transition-all duration-500
                ${isScrolled 
                    ? "bg-[#09090b]/40 border-white/10 backdrop-blur-md shadow-lg" 
                    : "bg-transparent border-transparent"
                }
            `}>
               <NavLink href="#about">Sobre</NavLink>
               <NavLink href="#projects">Projetos</NavLink>
               <NavLink href="#contact">Contato</NavLink>
            </div>

            {/* Separador Invisível */}
            <div className="w-[1px] h-6 bg-white/10" />

            {/* Ícones Sociais (Ganham cor ao hover) */}
            <div className="flex items-center gap-2">
              <SocialIcon 
                href="https://wa.me/5561986446934" 
                icon={MessageCircle} 
                label="WhatsApp"
                hoverColor="text-green-400"
                glowColor="bg-green-500"
              />
              <SocialIcon 
                href="mailto:paulohenrique.012araujo@gmail.com" 
                icon={Mail} 
                label="Email"
                hoverColor="text-blue-400"
                glowColor="bg-blue-500"
              />
              
              {/* Botão CV (Destaque) */}
              <Link 
                href="/curriculo.pdf" 
                target="_blank"
                download="Curriculo_Paulo_Henrique.pdf"
                className="group relative flex items-center gap-2 px-5 py-2.5 ml-2 bg-white text-black text-xs font-bold rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileText size={14} className="relative z-10 group-hover:text-violet-700 transition-colors" />
                <span className="relative z-10 group-hover:text-violet-700 transition-colors">CV</span>
              </Link>
            </div>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY (Full Screen) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#09090b] flex flex-col justify-center px-8"
          >
             {/* Textura de fundo do mobile */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-wrap content-center justify-center gap-8 -rotate-12 scale-150">
                {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className="font-[family-name:var(--font-signature)] text-6xl text-white whitespace-nowrap">Paulo Henrique</span>
                ))}
             </div>

             <div className="relative z-10 flex flex-col gap-8">
                <MobileLink onClick={() => setMobileMenuOpen(false)} href="#about">Sobre</MobileLink>
                <MobileLink onClick={() => setMobileMenuOpen(false)} href="#projects">Projetos</MobileLink>
                <MobileLink onClick={() => setMobileMenuOpen(false)} href="#contact">Contato</MobileLink>
                
                <div className="h-[1px] w-24 bg-white/10 my-4" />
                
                <div className="flex gap-6">
                    <Link href="https://wa.me/5561986446934" className="p-4 rounded-full bg-zinc-900 text-green-400 border border-zinc-800">
                        <MessageCircle size={24} />
                    </Link>
                    <Link href="mailto:paulohenrique.012araujo@gmail.com" className="p-4 rounded-full bg-zinc-900 text-blue-400 border border-zinc-800">
                        <Mail size={24} />
                    </Link>
                    <Link href="/curriculo.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold rounded-full">
                        <FileText size={20} /> CV
                    </Link>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// === COMPONENTES AUXILIARES ===

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300"
    >
      {children}
    </Link>
  )
}

function SocialIcon({ href, icon: Icon, label, hoverColor, glowColor }: any) {
  return (
    <Link 
      href={href} 
      target="_blank"
      className={`group relative p-2.5 rounded-full transition-all duration-300 hover:bg-white/5 text-zinc-400 ${hoverColor}`}
      title={label}
    >
      <Icon size={20} className="relative z-10" />
      
      {/* Efeito "Range"/Glow ao passar o mouse */}
      <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 ${glowColor}`} />
    </Link>
  )
}

function MobileLink({ href, children, onClick }: any) {
    return (
        <Link 
            href={href} 
            onClick={onClick}
            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700 hover:to-white transition-all duration-500"
        >
            {children}
        </Link>
    )
}