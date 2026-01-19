"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Roberto Almeida",
    role: "CTO @ TechFlow",
    text: "O Paulo não apenas entregou o código, ele redefiniu a arquitetura do nosso sistema. A performance do N8N integrada ao Next.js foi um game changer.",
    image: "https://i.pravatar.cc/150?u=roberto" // Placeholder
  },
  {
    name: "Juliana Mendes",
    role: "Founder @ ZacaPlace",
    text: "A sensibilidade visual combinada com a lógica de backend é rara. O marketplace ficou incrivelmente rápido e a gestão de pagamentos impecável.",
    image: "https://i.pravatar.cc/150?u=juliana"
  },
  {
    name: "Carlos Eduardo",
    role: "Product Owner",
    text: "Trabalhar com o Paulo é ter a certeza de que o prazo será cumprido com uma qualidade superior ao esperado. O Readeek Mobile é a prova disso.",
    image: "https://i.pravatar.cc/150?u=carlos"
  },
  {
    name: "Fernanda Costa",
    role: "Marketing Lead",
    text: "As automações criadas no Lumiere economizaram horas da nossa equipe criativa. Uma visão de engenharia que impulsiona o negócio.",
    image: "https://i.pravatar.cc/150?u=fernanda"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-neutral-950 overflow-hidden relative border-t border-white/5">
      
      <div className="container px-4 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
          Impacto Real
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Não é apenas sobre código. É sobre resolver problemas complexos e entregar valor mensurável.
        </p>
      </div>

      {/* GRADIENTES LATERAIS PARA SUAVIZAR O SCROLL */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      {/* TRACK DO MARQUEE */}
      <div className="flex">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-6 pl-6 w-max"
        >
          {/* DUPLICAMOS A LISTA PARA O LOOP INFINITO PERFEITO */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <div 
              key={idx} 
              className="w-[350px] md:w-[450px] bg-white/5 border border-white/10 p-8 rounded-2xl relative flex flex-col justify-between hover:bg-white/[0.07] transition-colors"
            >
              <Quote className="absolute top-6 right-6 text-white/10 w-8 h-8" />
              
              <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                "{item.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 relative">
                   {/* Em produção, use imagens reais */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-500 opacity-50" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-neutral-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}