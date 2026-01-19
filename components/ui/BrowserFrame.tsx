import Image from "next/image";

interface BrowserFrameProps {
  src: string;
  alt: string;
}

export function BrowserFrame({ src, alt }: BrowserFrameProps) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/50 backdrop-blur-sm group">
      {/* Header do Navegador Fake */}
      <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" /> {/* Close */}
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" /> {/* Minimize */}
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" /> {/* Maximize */}
        </div>
        {/* Barra de URL Fake - Opcional */}
        <div className="flex-1 text-center text-[10px] font-mono text-neutral-500 opacity-50 truncate mx-4">
            https://{alt.toLowerCase().replace(" ", "")}.app
        </div>
      </div>
      
      {/* Container da Imagem */}
      <div className="relative aspect-video w-full bg-neutral-950">
         {/* Overlay de brilho ao passar o mouse */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
        
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}