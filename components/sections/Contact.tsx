"use client";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, Smartphone, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
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

      if (!response.ok) throw new Error("Erro ao enviar");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reseta o status após 5 segundos para permitir novo envio
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="py-32 bg-neutral-950 border-t border-white/5 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LADO ESQUERDO: INFOS */}
          <div className="space-y-8">
            <div>
              <span className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-2 block">
                Vamos Conversar
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                Tem uma ideia? <br/>
                <span className="text-neutral-500">Vamos construí-la.</span>
              </h2>
            </div>
            
            <p className="text-lg text-neutral-400 max-w-md">
              Estou disponível para projetos freelance e oportunidades full-time. 
              Especialista em transformar requisitos complexos em interfaces fluidas.
            </p>

            <div className="space-y-4 pt-4">
              <ContactItem icon={<Mail />} text="paulohenrique.012araujo@gmail.com" href="mailto:paulohenrique.012araujo@gmail.com" />
              <ContactItem icon={<Smartphone />} text="+55 (61) 986446934" href="tel:+5561986446934" />
              <ContactItem icon={<MapPin />} text="Brasília, Brasil" />
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm h-fit">
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Mensagem Enviada!</h3>
                  <p className="text-neutral-400">Obrigado pelo contato. Responderei em breve.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                  >
                    Enviar outra mensagem
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400 ml-1">Seu Nome</label>
                    <input 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Ex: João Silva"
                      className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400 ml-1">Seu Email</label>
                    <input 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="joao@empresa.com"
                      className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400 ml-1">Sobre o Projeto</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Me conte um pouco sobre sua ideia..."
                      className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full bg-white text-black font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle className="w-4 h-4" /> Tente Novamente
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
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

function ContactItem({ icon, text, href }: { icon: any, text: string, href?: string }) {
  const content = (
    <div className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
        {icon}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  if (href) return <a href={href}>{content}</a>;
  return content;
}