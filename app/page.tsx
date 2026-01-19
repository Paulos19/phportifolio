import { FloatingNav } from "@/components/ui/FloatingNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";

export default function Home() {
  return (
    <main className="relative w-full bg-neutral-950 text-neutral-200 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      
      <FloatingNav />
      <Hero />
      <About />
      
      {/* Seção de Título antes dos Projetos */}
      <div className="relative bg-neutral-950 border-t border-white/5 pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 z-10">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_60%)] pointer-events-none" />
        <span className="text-emerald-500 font-mono text-sm tracking-[0.2em] uppercase mb-4 animate-pulse">
          Selected Works
        </span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white max-w-4xl leading-tight">
          Engenharia de software <br />
          com <span className="text-neutral-500">alma de design.</span>
        </h2>
      </div>

      {/* AQUI ESTÁ A MÁGICA: O SHOWCASE "PINADO" */}
      <ProjectShowcase />
      
      {/* Footer */}
      <footer id="contato" className="relative h-[60vh] bg-neutral-900 flex flex-col items-center justify-center text-center px-4 z-10 border-t border-white/10">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 text-white">
          Pronto para o próximo nível?
        </h2>
        <a 
          href="mailto:contato@paulohenrique.dev" 
          className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-emerald-500/20"
        >
          Iniciar Conversa
        </a>
        <div className="mt-16 flex flex-col gap-2 text-neutral-500 font-mono text-sm">
          <p>© 2026 Paulo Henrique.</p>
          <p>Desenvolvido com Next.js 15, Tailwind v4 & Motion.</p>
        </div>
      </footer>

    </main>
  );
}