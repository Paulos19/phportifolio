"use client";
import { motion } from "framer-motion";
import { 
  Cpu, Code2, Zap, Database, Layout, Terminal, GraduationCap
} from "lucide-react";

export function About() {
  // Removemos o useScroll complexo aqui. Deixamos o CSS sticky do page.tsx fazer o trabalho de empilhar.
  
  return (
    <section id="sobre" className="relative min-h-screen bg-neutral-950 flex items-center justify-center py-20">
      
      <div className="container px-4 md:px-6 relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Coluna Esquerda: Título/Impacto */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                  STATUS: OPEN TO WORK
                </span>
                <span className="text-neutral-500 text-xs font-mono">
                  SÃO PAULO • 26 ANOS
                </span>
              </div>
              
              <h3 className="text-5xl md:text-7xl font-bold text-white leading-tight font-serif">
                Analista & <br/>
                <span className="text-neutral-600">Arquiteto.</span>
              </h3>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="grid grid-cols-2 gap-4"
            >
              <Card 
                icon={<GraduationCap className="w-5 h-5 text-purple-400" />}
                title="Formação"
                desc="Cursando ADS. Engenharia de Software."
              />
              <Card 
                icon={<Zap className="w-5 h-5 text-yellow-400" />}
                title="Evolução"
                desc="De 0 a Full Stack em 2 anos."
              />
            </motion.div>
          </div>

          {/* Coluna Direita: Bio & Stack */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4, duration: 0.8 }}
             className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/5"
          >
             <p className="text-lg text-neutral-400 leading-relaxed">
              Minha trajetória técnica começou oficialmente em <strong className="text-white">2023</strong>. 
              Desde então, mergulhei fundo na intersecção entre interfaces modernas e lógica de backend complexa.
              Não sou apenas um programador de telas; trago uma visão estrutural para cada linha de código.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Arsenal Técnico</h4>
              <div className="grid grid-cols-3 gap-3">
                <TechBadge icon={<Layout />} label="Next.js 15" />
                <TechBadge icon={<Code2 />} label="Tailwind v4" />
                <TechBadge icon={<Terminal />} label="TypeScript" />
                <TechBadge icon={<Database />} label="Prisma" />
                <TechBadge icon={<Cpu />} label="N8N Auto" />
                <TechBadge icon={<Zap />} label="Motion" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Componentes Auxiliares (Mantidos)
function Card({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
      <div className="mb-3">{icon}</div>
      <h4 className="font-bold text-white text-sm">{title}</h4>
      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}

function TechBadge({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white hover:border-emerald-500/30 transition-all group text-center">
      <span className="group-hover:text-emerald-400 transition-colors [&>svg]:w-5 [&>svg]:h-5">
        {icon}
      </span>
      <span className="text-[10px] font-mono font-medium">{label}</span>
    </div>
  );
}