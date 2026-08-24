"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "../lib/supabaseClient";
import FadeIn from "./FadeIn";

export default function Contacto() {
  const [form, setForm] = useState({ name: "", email: "", entity: "", message: "" });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const ready = form.name.trim() && form.email.trim() && form.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setStatus("sending");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert({ motive: "Cotización", full_name: form.name.trim(), email: form.email.trim(), entity: form.entity.trim() || null, message: form.message.trim() });
      if (error) throw error;
      setStatus("sent");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contacto" style={{ background: "var(--abyss-2)", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(700px 400px at 15% 30%, rgba(35,75,108,0.3), transparent 65%)" }} />
      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} data-contact-grid>
        <FadeIn>
          <div className="eyebrow">Contacto</div>
          <h2 className="heading" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", color: "var(--hueso)", marginBottom: 18, maxWidth: 440 }}>
            Solicite una <em>cotización</em>
          </h2>
          <p style={{ fontSize: 15.5, color: "var(--mist)", lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>
            Indique el objeto del contrato, la etapa actual y los frentes que requiere. Respondemos con propuesta técnica y económica.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { icon: Mail, text: "contacto@gruposinergiacolombia.com", href: "mailto:contacto@gruposinergiacolombia.com" },
              { icon: Phone, text: "+57 (601) 000 0000", href: "tel:+576010000000" },
              { icon: MapPin, text: "Bogotá D.C., Colombia" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(192,138,46,0.1)", border: "1px solid rgba(192,138,46,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <c.icon size={17} color="var(--ochre-soft)" />
                </div>
                {c.href ? <a href={c.href} style={{ fontSize: 15 }}>{c.text}</a> : <span style={{ fontSize: 15 }}>{c.text}</span>}
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          {status === "sent" ? (
            <motion.div initial={{ opacity: 0, transform: "scale(0.96)" }} animate={{ opacity: 1, transform: "scale(1)" }} transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }} style={{ background: "rgba(233,224,210,0.04)", border: "1px solid var(--line)", borderRadius: 18, padding: "52px 32px", textAlign: "center" }}>
              <CheckCircle2 size={42} color="var(--verde-glow)" style={{ margin: "0 auto 16px" }} />
              <h3 className="heading" style={{ fontSize: 22, marginBottom: 10 }}>Mensaje recibido</h3>
              <p style={{ fontSize: 14, color: "var(--mist)" }}>Revisaremos su solicitud y responderemos al correo registrado.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "rgba(233,224,210,0.03)", border: "1px solid var(--line)", borderRadius: 18, padding: "30px 28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} data-c2col>
                <div><label className="field-label">Nombre *</label><input required className="field" value={form.name} onChange={set("name")} /></div>
                <div><label className="field-label">Correo *</label><input required type="email" className="field" value={form.email} onChange={set("email")} /></div>
              </div>
              <div style={{ marginBottom: 14 }}><label className="field-label">Entidad</label><input className="field" placeholder="Nombre de la entidad contratante" value={form.entity} onChange={set("entity")} /></div>
              <div style={{ marginBottom: 20 }}><label className="field-label">Requerimiento *</label><textarea required className="field" rows={4} placeholder="Objeto del contrato, etapa, frentes de interventoría…" value={form.message} onChange={set("message")} style={{ resize: "vertical" }} /></div>
              {status === "error" && <div style={{ fontSize: 12.5, color: "#E8A79C", marginBottom: 12 }}>Error al enviar. Intente de nuevo.</div>}
              <button type="submit" disabled={!ready || status === "sending"} className="btn btn--ochre" style={{ width: "100%", justifyContent: "center", opacity: ready ? 1 : 0.5 }}>
                {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
                {status === "sending" ? "Enviando…" : "Enviar solicitud"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
      <style>{`
        @media(max-width:860px){[data-contact-grid]{grid-template-columns:1fr!important}}
        @media(max-width:560px){[data-c2col]{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
