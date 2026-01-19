"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Cpu, 
  Code2, 
  Zap, 
  Database, 
  Layout, 
  Terminal,
  GraduationCap
} from "lucide-react";

export function About() {
  const targetRef = useRef<HTMLDivElement>(null);

  // 1. Controla o pin da seção inteira (300vh de scroll para ler tudo com calma)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"], 
  });

  // 2. Animação de Entrada do Painel (Vem da Direita e cobre a Hero)
  // De 10% a 30% do scroll, o painel desliza da direita (100%) para o centro (0%)
  const x = useTransform(scrollYProgress, [0.05, 0.3], ["100%", "0%"]);
  
  // 3. Controle de Opacidade para focar a atenção
  const opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  // 4. Parallax interno dos elementos (Texto sobe mais rápido que o fundo)
  const contentY = useTransform(scrollYProgress, [0.3, 1], ["0%", "-20%"]);

  return (
    <section ref={targetRef} id="sobre" className="relative h-[250vh] bg-neutral-900/50">
      
      {/* Container Sticky: Onde a mágica acontece */}
      <div className="sticky top-0 flex h-screen w-full overflow-hidden">
        
        {/* Lado Esquerdo (Fundo/Contexto) - Fica estático ou com leve parallax */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-20 relative">
          <h2 className="text-[10vw] font-serif font-bold text-white/5 leading-none absolute left-0 top-1/2 -translate-y-1/2 select-none">
            DEV<br/>2023
          </h2>
        </div>

        {/* Lado Direito (Painel de Conteúdo) - Entra deslizando */}
        <motion.div 
          style={{ x, opacity }}
          className="absolute right-0 top-0 h-full w-full lg:w-[60%] bg-neutral-950 border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.5)] flex items-center"
        >
          {/* Scrollable Content Container dentro do Painel */}
          <div className="w-full h-full overflow-y-auto no-scrollbar p-8 md:p-16 flex flex-col justify-center">
            
            <motion.div style={{ y: contentY }} className="max-w-2xl mx-auto space-y-12">
              
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                    STATUS: OPEN TO WORK
                  </span>
                  <span className="text-neutral-500 text-xs font-mono">
                    SÃO PAULO • 26 ANOS
                  </span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight font-serif">
                  Analista de Sistemas & <br/>
                  <span className="text-neutral-500">Arquiteto de Automação.</span>
                </h3>
              </div>

              {/* Bio / Storytelling */}
              <div className="space-y-6 text-lg text-neutral-400 leading-relaxed border-l-2 border-white/10 pl-6">
                <p>
                  Minha trajetória técnica começou oficialmente em <strong className="text-white">2023</strong>. 
                  Desde então, mergulhei fundo na intersecção entre desenvolvimento de interfaces modernas e lógica de backend complexa.
                </p>
                <p>
                  Não sou apenas um programador de telas. Como estudante de <strong className="text-white">Análise e Desenvolvimento de Sistemas (ADS)</strong>, 
                  trago uma visão estrutural para cada linha de código. Meu foco é criar aplicações que não apenas pareçam incríveis, 
                  mas que funcionem com performance de elite.
                </p>
              </div>

              {/* Timeline / Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  icon={<GraduationCap className="w-5 h-5 text-purple-400" />}
                  title="Formação"
                  desc="Cursando ADS. Foco em Engenharia de Software e Algoritmos."
                />
                <Card 
                  icon={<Zap className="w-5 h-5 text-yellow-400" />}
                  title="Evolução Rápida"
                  desc="De 0 a Full Stack em 2 anos. Aprendizado contínuo e agressivo."
                />
              </div>

              {/* Tech Stack Grid */}
              <div className="space-y-4 pt-8 border-t border-white/5">
                <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Arsenal Técnico</h4>
                <div className="grid grid-cols-3 gap-4">
                  <TechBadge icon={<Layout />} label="Next.js 15" />
                  <TechBadge icon={<Code2 />} label="Tailwind v4" />
                  <TechBadge icon={<Terminal />} label="TypeScript" />
                  <TechBadge icon={<Database />} label="Prisma ORM" />
                  <TechBadge icon={<Cpu />} label="N8N Auto" />
                  <TechBadge icon={<Zap />} label="Motion" />
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// Componentes auxiliares para manter o código limpo
function Card({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
      <div className="mb-3">{icon}</div>
      <h4 className="font-bold text-white text-sm">{title}</h4>
      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}

function TechBadge({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white hover:border-emerald-500/30 transition-all group">
      <span className="group-hover:text-emerald-400 transition-colors [&>svg]:w-4 [&>svg]:h-4">
        {icon}
      </span>
      <span className="text-xs font-mono font-medium">{label}</span>
    </div>
  );
}