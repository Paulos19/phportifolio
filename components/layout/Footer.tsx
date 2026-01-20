import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative min-h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-[80vw] h-[80vw] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container px-4 relative z-10 flex flex-col items-center">
        
        <p className="text-neutral-500 font-mono text-sm mb-8 tracking-widest uppercase">
            Designed & Engineered by
        </p>

        {/* BIG NAME REVEAL */}
        <h1 className="text-[12vw] leading-[0.8] font-serif font-bold text-white tracking-tighter text-center mix-blend-overlay hover:mix-blend-normal hover:text-white transition-all duration-700 cursor-default">
          PAULO<br/>HENRIQUE
        </h1>

        <div className="flex gap-8 mt-16">
            {["Github", "LinkedIn", "Instagram", "Email"].map((social) => (
                <Link key={social} href="#" className="text-neutral-400 hover:text-emerald-400 text-sm font-bold uppercase tracking-widest transition-colors">
                    {social}
                </Link>
            ))}
        </div>

        <div className="absolute bottom-10 text-neutral-600 text-xs font-mono">
            © 2026. SÃO PAULO, BRASIL.
        </div>

      </div>
    </footer>
  );
}