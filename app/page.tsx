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
      
      {/* Barra de Navegação Flutuante */}
      <FloatingNav />
      
      {/* ARQUITETURA DE STACKING (CAMADAS)
        Para o efeito de "cartas empilhadas", usamos z-index crescente.
      */}

      {/* 1. HERO 
          Posição: Relative (Fica na base).
          Altura: Definida internamente no componente (250vh) para animação de scroll.
      */}
      <div className="relative z-0 w-full">
        <Hero />
      </div>

      {/* 2. SOBRE MIM 
          Posição: Sticky (Cobre a Hero).
          Sombra superior: Cria a profundidade visual ao subir.
      */}
      <div className="sticky top-0 z-10 min-h-screen w-full bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <About />
      </div>
      
      {/* 3. SHOWCASE DE PROJETOS
          Posição: Relative (Sobe cobrindo o Sobre Mim).
          Contém seu próprio sistema de sticky interno para os slides dos projetos.
      */}
      <div className="relative z-20 w-full bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <ProjectShowcase />
      </div>
      
      {/* 4. BLOCO FINAL (Prova Social + Contato + Footer)
          Posição: Relative (Segue o fluxo após os projetos).
          Agrupamos tudo aqui para garantir que este bloco inteiro cubra os projetos ao rolar.
      */}
      <div className="relative z-30 bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        
        {/* Carrossel Infinito de Depoimentos */}
        <Testimonials />
        
        {/* Formulário de Contato com Nodemailer */}
        <Contact />
        
        {/* Rodapé com Assinatura */}
        <Footer />
        
      </div>

    </main>
  );
}