"use client";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, Smartphone, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Erro");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // h-full centraliza verticalmente dentro do sticky container
    <section id="contato" className="relative h-full w-full flex items-center bg-neutral-950 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05)_0%,transparent_40%)] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-8">
            <div>
              <span className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-2 block">
                Contato
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
                Vamos construir <br/>
                <span className="text-neutral-600">o futuro?</span>
              </h2>
            </div>
            
            <p className="text-xl text-neutral-400 max-w-md leading-relaxed">
              Disponível para projetos desafiadores que exijam engenharia de ponta e design refinado.
            </p>

            <div className="space-y-6 pt-4">
              <ContactItem icon={<Mail />} text="paulohenrique.012araujo@gmail.com" />
              <ContactItem icon={<Smartphone />} text="+55 (11) 99999-9999" />
              <ContactItem icon={<MapPin />} text="São Paulo, Brasil" />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Recebido!</h3>
                  <p className="text-neutral-400">Entrarei em contato em breve.</p>
                  <button onClick={() => setStatus("idle")} className="mt-4 text-emerald-400 hover:text-emerald-300 underline underline-offset-4">
                    Nova mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-neutral-500 uppercase">Nome</label>
                        <input name="name" required value={formData.name} onChange={handleChange} type="text" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-neutral-500 uppercase">Email</label>
                        <input name="email" required value={formData.email} onChange={handleChange} type="email" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-500 uppercase">Mensagem</label>
                    <textarea name="message" required value={formData.message} onChange={handleChange} rows={5} className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none transition-colors resize-none" />
                  </div>

                  <button type="submit" disabled={status === "loading"} className="w-full bg-white text-black font-bold rounded-lg py-4 flex items-center justify-center gap-2 hover:bg-emerald-400 hover:scale-[1.01] transition-all shadow-lg disabled:opacity-50">
                    {status === "loading" ? <Loader2 className="animate-spin" /> : <>Enviar <ArrowRight size={18} /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-4 text-neutral-300">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-emerald-400">
        {icon}
      </div>
      <span className="text-lg">{text}</span>
    </div>
  );
}