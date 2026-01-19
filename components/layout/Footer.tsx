import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-950 pt-20 pb-10 border-t border-white/5">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        
        {/* BIG NAME */}
        <h1 className="text-[12vw] md:text-[10vw] leading-none font-serif font-bold text-white/10 select-none tracking-tighter hover:text-white/20 transition-colors cursor-default text-center">
          PAULO HENRIQUE
        </h1>

        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/5 gap-6 md:gap-0">
          
          <div className="text-neutral-500 text-sm font-mono">
            © 2026 Paulo Henrique. <br className="hidden md:block"/> Todos os direitos reservados.
          </div>

          <div className="flex gap-8">
            <FooterLink href="https://github.com/paulos19" label="Github" />
            <FooterLink href="https://linkedin.com" label="LinkedIn" />
            <FooterLink href="https://instagram.com" label="Instagram" />
          </div>

          <div className="text-neutral-500 text-sm font-mono text-right hidden md:block">
            Desenvolvido com <br/>
            Next.js 15 & Tailwind v4
          </div>

        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string, label: string }) {
  return (
    <Link 
      href={href} 
      target="_blank"
      className="text-neutral-400 hover:text-emerald-400 uppercase text-xs font-bold tracking-widest transition-colors relative group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-400 transition-all group-hover:w-full" />
    </Link>
  );
}