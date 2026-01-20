"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax suave para a textura de fundo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const yTexture = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <section 
      ref={containerRef} 
      id="contact" 
      className="relative w-full py-32 bg-[#09090b] text-white overflow-hidden"
    >
      
      {/* === BACKGROUND TEXTURE (ASSINATURA) === */}
      <motion.div 
        style={{ y: yTexture }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden"
      >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] flex flex-wrap gap-12 rotate-[-12deg] justify-center content-center">
            {Array.from({ length: 40 }).map((_, i) => (
                <span key={i} className="font-[family-name:var(--font-signature)] text-8xl whitespace-nowrap text-white">
                  Paulo Henrique
                </span>
            ))}
        </div>
      </motion.div>

      {/* === AURORA GRADIENTS === */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      {/* === CONTEÚDO === */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ESQUERDA: Texto e Infos */}
          <div className="space-y-10">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                    Open to work
                </div>

                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
                  Let's create <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
                      something epic.
                  </span>
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-md border-l-2 border-zinc-800 pl-6">
                  Do design à performance. Se você tem um desafio técnico ou uma ideia visionária, estou pronto para codar a solução.
                </p>
            </motion.div>

            <div className="flex flex-col gap-6">
                <ContactCard 
                    icon={MapPin} 
                    title="Base" 
                    value="Brasília, DF - Brasil" 
                    delay={0.1}
                />
                <ContactCard 
                    icon={Phone} 
                    title="Whatsapp" 
                    value="+55 (61) 98644-6934" 
                    link="https://wa.me/5561986446934"
                    delay={0.2}
                />
                <ContactCard 
                    icon={Mail} 
                    title="Email" 
                    value="paulohenrique.012araujo@gmail.com" 
                    link="mailto:paulohenrique.012araujo@gmail.com"
                    delay={0.3}
                />
            </div>
          </div>

          {/* DIREITA: Formulário Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect atrás do form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur opacity-20" />
            
            <div className="relative bg-zinc-900/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Envie uma mensagem</h3>
                    <p className="text-zinc-500 text-sm">Responderei em até 24 horas.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Nome</label>
                        <input 
                            type="text" 
                            name="name" 
                            required 
                            className="w-full px-4 py-3 rounded-lg bg-zinc-950/50 border border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all" 
                            placeholder="Como devo te chamar?" 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            className="w-full px-4 py-3 rounded-lg bg-zinc-950/50 border border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all" 
                            placeholder="seu@email.com" 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Projeto / Ideia</label>
                        <textarea 
                            name="message" 
                            required 
                            rows={4} 
                            className="w-full px-4 py-3 rounded-lg bg-zinc-950/50 border border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all resize-none" 
                            placeholder="Me conte sobre o que precisamos construir..." 
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="group w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                        {loading ? "Enviando..." : "Start Project"}
                        {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>

                    {status === "success" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20"
                        >
                            <span>🚀 Mensagem recebida! Entrarei em contato em breve.</span>
                        </motion.div>
                    )}
                    {status === "error" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                        >
                            <span>⚠️ Algo deu errado. Tente me chamar no WhatsApp.</span>
                        </motion.div>
                    )}
                </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Componente visual para os itens de contato
function ContactCard({ icon: Icon, title, value, link, delay }: any) {
    const content = (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-center gap-5 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group"
        >
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 group-hover:border-violet-500/50 group-hover:text-violet-400 transition-colors shadow-lg">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">{title}</p>
                <p className="text-lg text-white font-medium group-hover:text-violet-100 transition-colors">{value}</p>
            </div>
        </motion.div>
    );

    if (link) {
        return <Link href={link} target="_blank" className="block">{content}</Link>;
    }
    return content;
}