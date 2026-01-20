import { FloatingNav } from "@/components/ui/FloatingNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-neutral-950 text-neutral-200 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <FloatingNav />
      
      {/* ESTRATÉGIA DE PARALLAX:
          1. Hero tem 300vh.
          2. A animação interna da Hero acaba aos 60% (~180vh).
          3. A próxima secção tem -mt-[100vh], ou seja, ela começa a cobrir a Hero 
             quando o scroll atinge 200vh.
          4. Isso garante que entre 0vh e 200vh o utilizador vê a animação da Hero completa.
      */}

      {/* === 1. HERO (Base) === */}
      <div className="relative z-0 h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Hero />
        </div>
      </div>

      {/* === 2. SOBRE MIM (Overlay) === */}
      <div className="relative z-10 w-full -mt-[100vh]">
        <div className="sticky top-0 h-screen bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <About />
        </div>
        {/* Espaçador para manter o scroll vivo */}
        <div className="h-[50vh]" /> 
      </div>
      
      {/* === 3. PROJETOS === */}
      {/* ProjectShowcase gere o seu próprio sticky e altura interna */}
      <div className="relative z-20 w-full -mt-[50vh] bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <ProjectShowcase />
      </div>
      
      {/* === 4. BLOCO FINAL (Testemunhos + Contacto + Footer) === */}
      {/* Agrupamos num container sticky único para garantir transição suave após projetos */}
      <div className="relative z-30 w-full bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        
        <div className="sticky top-0 h-screen w-full bg-neutral-950 overflow-hidden">
           <Testimonials />
        </div>
        
        {/* Espaço para rolar Testemunhos antes do Contato */}
        <div className="h-[50vh]" />

        <div className="sticky top-0 h-screen w-full bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
           <Contact />
        </div>

        {/* Espaço para rolar Contato antes do Footer */}
        <div className="h-[50vh]" />

        <div className="sticky top-0 h-screen w-full bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
           <Footer />
        </div>

      </div>

    </main>
  );
}