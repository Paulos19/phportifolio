import { FloatingNav } from "@/components/ui/FloatingNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-neutral-950 text-neutral-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <FloatingNav />
      
      {/* 1. HERO - Z-0 */}
      {/* Altura: 250vh para garantir animação completa */}
      <div className="relative z-0 h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>
      </div>

      {/* 2. SOBRE MIM - Z-10 */}
      {/* Altura: 150vh. Sobe por cima da Hero e trava. */}
      <div className="relative z-10 h-[150vh] bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <About />
        </div>
      </div>
      
      {/* 3. PROJETOS - Z-20 */}
      {/* Altura: 600vh. ProjectShowcase precisa de muito trilho para rodar os 5 projetos. */}
      {/* O componente ProjectShowcase preenche este espaço. */}
      {/* NOTA: Removemos o sticky interno do componente se ele já tiver, ou deixamos o componente ser apenas o conteúdo visual */}
      <div className="relative z-20 bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
         {/* Deixe o ProjectShowcase gerenciar seu próprio sticky/scroll interno ou encapsule aqui se ele for responsivo ao scroll da janela */}
         {/* Assumindo que ProjectShowcase.tsx contém a lógica de ref={container} e h-[600vh], apenas o renderizamos aqui normalmente */}
         <ProjectShowcase />
      </div>
      
      {/* 4. TESTEMUNHOS - Z-30 */}
      {/* Altura: 150vh. Sobe por cima dos Projetos assim que eles acabam. */}
      <div className="relative z-30 h-[150vh] bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <Testimonials />
        </div>
      </div>

      {/* 5. CONTATO - Z-40 */}
      {/* Sobe por cima dos Testemunhos. */}
      <div className="relative z-40 h-[150vh] bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <Contact />
        </div>
      </div>

      {/* 6. FOOTER - Z-50 */}
      {/* O Grand Finale. Sobe por cima de tudo. */}
      <div className="relative z-50 h-screen bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <Footer />
        </div>
      </div>

    </main>
  );
}