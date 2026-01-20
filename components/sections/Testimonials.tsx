"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Roberto Almeida",
    role: "CTO @ TechFlow",
    text: "O Paulo não apenas entregou o código, ele redefiniu a arquitetura do nosso sistema. A performance do N8N integrada ao Next.js foi um game changer.",
    image: "https://i.pravatar.cc/150?u=roberto" 
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
    // h-full e w-full para preencher o container sticky do page.tsx
    // flex-col justify-center para garantir que o conteúdo esteja sempre no meio da tela
    <section className="relative h-full w-full flex flex-col justify-center bg-neutral-950 overflow-hidden border-t border-white/5">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(16,185,129,0.05)_0%,transparent_40%)] pointer-events-none" />

      <div className="container px-4 mb-16 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
          Impacto Real
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-lg">
          Resultados que falam por si. Parcerias estratégicas que transformaram negócios.
        </p>
      </div>

      {/* Marquee Track */}
      <div className="w-full relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden">
            <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 pl-8 w-max"
            >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
                <div 
                key={idx} 
                className="w-[400px] bg-white/[0.03] border border-white/5 p-10 rounded-2xl relative flex flex-col justify-between hover:bg-white/[0.05] transition-colors"
                >
                <Quote className="text-emerald-500/50 w-8 h-8 mb-6" />
                
                <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                    "{item.text}"
                </p>
                
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 opacity-80" />
                    <div>
                    <h4 className="text-white font-bold">{item.name}</h4>
                    <p className="text-neutral-500 text-sm">{item.role}</p>
                    </div>
                </div>
                </div>
            ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}