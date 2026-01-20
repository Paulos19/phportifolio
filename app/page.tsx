// app/page.tsx
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { ProjectLumiere } from "@/components/sections/projects/lumiere"; // Importe o novo

export default function Home() {
  return (
    <main className="relative w-full bg-background overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO (Dark) */}
      <Hero />
      
      {/* 2. ABOUT (Light) */}
      <About />

      {/* 3. STACK (Dark - Vertical Parallax) */}
      <Stack />

      {/* 4. PROJETO 01: LUMIERE (Sticky Stacking) */}
      {/* Ele vai aparecer logo após a stack e ficará fixo até o fim da página (por enquanto) */}
      <ProjectLumiere />

      {/* 5. Placeholder para o próximo projeto (para testar o scroll cobrindo) */}
      {/* Remova isso quando formos adicionar o Projeto 02 */}
      <section className="sticky top-0 h-screen bg-zinc-900 flex items-center justify-center z-10 border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <h2 className="text-zinc-500 text-2xl">Próximo Projeto (Breve...)</h2>
      </section>

    </main>
  );
}