"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Cpu, 
  Globe, 
  Workflow, 
  Sparkles, 
  Layers, 
  Database,
  Code2,
  Server,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  { id: "01", name: "Next.js 15", role: "Framework", icon: Globe, accent: "text-white", border: "group-hover:border-white/40", bg: "bg-zinc-900/50", desc: "SSR, Server Actions & High Performance." },
  { id: "02", name: "N8N", role: "Automation", icon: Workflow, accent: "text-red-500", border: "group-hover:border-red-500/50", bg: "bg-red-950/10", desc: "Workflows complexos sem overhead." },
  { id: "03", name: "Gemini AI", role: "Intelligence", icon: Sparkles, accent: "text-blue-400", border: "group-hover:border-blue-500/50", bg: "bg-blue-950/10", desc: "Integração de LLMs e análise generativa." },
  { id: "04", name: "Tailwind v4", role: "Style", icon: Layers, accent: "text-cyan-400", border: "group-hover:border-cyan-500/50", bg: "bg-cyan-950/10", desc: "Design System atômico e leve." },
  { id: "05", name: "React Native", role: "Mobile", icon: Cpu, accent: "text-violet-400", border: "group-hover:border-violet-500/50", bg: "bg-violet-950/10", desc: "Apps nativos com codebase unificada." },
  { id: "06", name: "Prisma", role: "Data", icon: Database, accent: "text-emerald-400", border: "group-hover:border-emerald-500/50", bg: "bg-emerald-950/10", desc: "Type-safe ORM para PostgreSQL." },
  { id: "07", name: "TypeScript", role: "Safety", icon: Code2, accent: "text-blue-600", border: "group-hover:border-blue-600/50", bg: "bg-blue-900/10", desc: "Código escalável e livre de bugs." },
  { id: "08", name: "Node.js", role: "Runtime", icon: Server, accent: "text-green-500", border: "group-hover:border-green-500/50", bg: "bg-green-900/10", desc: "Backend robusto e microsserviços." },
];

export function Stack() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Rastreia o scroll relativo a esta sessão
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // === A DANÇA VERTICAL (PARALLAX) ===
  // Coluna 1 (Esquerda): Move-se levemente para cima (-50px) conforme scrolla
  // Coluna 2 (Direita): Move-se levemente para baixo (+50px) ou inverso
  // Isso cria o desencontro visual "agradável" sem esconder conteúdo.
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Divide as skills em duas colunas para o layout desktop
  const col1 = skills.filter((_, i) => i % 2 === 0);
  const col2 = skills.filter((_, i) => i % 2 !== 0);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-zinc-950 py-32 overflow-hidden"
    >
      {/* Background Grid & Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#3b076440,transparent)]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header da Sessão (Sticky na esquerda ou Topo) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-24 gap-8">
          <div className="max-w-xl">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-3 mb-4"
             >
                <div className="p-2 bg-violet-500/10 rounded-lg">
                  <Zap size={20} className="text-violet-400" />
                </div>
                <span className="text-sm font-mono text-violet-400 uppercase tracking-widest">
                  Tech Ecosystem
                </span>
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]"
             >
               POWER <span className="text-zinc-600">STACK.</span>
             </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-sm text-lg leading-relaxed text-right md:text-left hidden md:block"
          >
            A combinação exata de ferramentas para criar interfaces imersivas e backends escaláveis.
          </motion.p>
        </div>

        {/* O GRID (Mobile: 1 Coluna | Desktop: 2 Colunas com Parallax) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* === COLUNA 01 (ÍMPARES) === */}
          <motion.div style={{ y: yColumn1 }} className="space-y-8 md:space-y-12">
            {col1.map((skill, idx) => (
              <SkillCard key={skill.id} skill={skill} index={idx} />
            ))}
          </motion.div>

          {/* === COLUNA 02 (PARES) === */}
          {/* Adicionamos margem no topo (pt-24) para desalinhamento visual inicial */}
          <motion.div style={{ y: yColumn2 }} className="space-y-8 md:space-y-12 md:pt-24">
            {col2.map((skill, idx) => (
              <SkillCard key={skill.id} skill={skill} index={idx} />
            ))}
          </motion.div>

        </div>

      </div>
      
      {/* Footer Fade (Transição Suave para a próxima sessão) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

// Sub-componente do Card para limpar o código principal
function SkillCard({ skill, index }: { skill: typeof skills[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={cn(
        "relative overflow-hidden rounded-3xl p-8 border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2",
        skill.border
      )}>
        
        {/* Glow de Fundo no Hover */}
        <div className={cn("absolute -right-20 -top-20 w-64 h-64 bg-opacity-20 blur-[80px] rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100", skill.bg.replace('/10', '/30'))} />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
             <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-950 border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-300", skill.accent)}>
                <skill.icon size={28} />
             </div>
             <span className="font-mono text-zinc-600 text-xs border border-zinc-800 px-2 py-1 rounded">
               {skill.id}
             </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
            {skill.name}
          </h3>
          
          <p className="text-zinc-400 leading-relaxed mb-6">
            {skill.desc}
          </p>

          <div className="flex items-center gap-2">
            <div className={cn("h-1 w-8 rounded-full", skill.bg.replace('/10', ''))} />
            <span className={cn("text-xs font-bold uppercase tracking-wider", skill.accent)}>
              {skill.role}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}