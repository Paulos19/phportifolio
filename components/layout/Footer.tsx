import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-8 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        
        {/* Topo do Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
            <div>
                <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-zinc-800 select-none">
                    PH.DEV
                </h2>
            </div>
            <div className="flex gap-4">
                 <SocialLink href="https://github.com/Paulos19" icon={Github} />
                 <SocialLink href="https://linkedin.com/in/paulo-henrique" icon={Linkedin} /> {/* Ajuste a URL se necessário */}
                 <SocialLink href="https://instagram.com" icon={Instagram} />
            </div>
        </div>

        {/* Linha Divisória */}
        <div className="h-px w-full bg-zinc-900 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm gap-4">
            <p>© 2026 Paulo Henrique Araújo. All rights reserved.</p>
            <div className="flex gap-6">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <p>Brasília, DF • Brasil</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: any) {
    return (
        <Link 
            href={href} 
            target="_blank"
            className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
            <Icon size={20} />
        </Link>
    )
}