import Image from "next/image";

interface MobileFrameProps {
  src: string;
  alt: string;
}

export function MobileFrame({ src, alt }: MobileFrameProps) {
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl flex flex-col justify-center overflow-hidden group">
      {/* Notch / Dynamic Island */}
      <div className="w-32 h-7 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem] z-20" />
      
      {/* Botões Laterais (Fake) */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
      
      {/* Tela */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-neutral-900 relative">
        {/* Overlay de Brilho */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
        
        {/* Imagem do App */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}