"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Carlos Eduardo",
    role: "CTO @ TechFlow",
    text: "O Paulo tem uma capacidade rara de traduzir requisitos complexos de negócio em interfaces fluidas e performáticas. O projeto Davi revolucionou nosso CRM.",
    avatar: "https://i.pravatar.cc/150?u=carlos" // Mock avatar
  },
  {
    name: "Mariana Costa",
    role: "Product Designer",
    text: "A atenção aos detalhes nas animações e na experiência do usuário é o diferencial do Paulo. Trabalhar com ele no Readeek foi uma aula de colaboração.",
    avatar: "https://i.pravatar.cc/150?u=mariana"
  },
  {
    name: "Ricardo Silva",
    role: "Founder @ ZacaLocal",
    text: "Precisávamos de um marketplace robusto e rápido. O Paulo entregou o Zacaplace com uma qualidade de código e arquitetura que superou nossas expectativas.",
    avatar: "https://i.pravatar.cc/150?u=ricardo"
  }
];

export function Testimonials() {
  return (
    <section className="relative w-full py-24 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            O que dizem sobre mim
          </motion.h2>
          <p className="text-zinc-400">Feedback de parceiros e clientes recentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-colors relative group"
            >
              <Quote className="absolute top-8 right-8 text-zinc-800 group-hover:text-emerald-500/20 transition-colors" size={40} />
              
              <p className="text-zinc-300 leading-relaxed mb-8 relative z-10">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                    <Image 
                        src={t.avatar} 
                        alt={t.name} 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                  <span className="text-zinc-500 text-xs">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}