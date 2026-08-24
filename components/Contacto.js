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
      const { error } = await supabase.from("contact_messages").insert({
        motive: "Solicitud de cotización",
        full_name: form.name.trim(),
        email: form.email.trim(),
        entity: form.entity.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="section" style={{ background: "var(--azul-deep)", color: "var(--hueso)" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} data-contacto-grid>
        <FadeIn>
          <div className="eyebrow eyebrow--light">Contacto</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "var(--hueso)", marginBottom: 18, maxWidth: 440 }}>
            Solicite una cotización de interventoría
          </h2>
          <p style={{ fontSize: 15.5, color: "rgba(233,224,210,0.7)", lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>
            Indique el objeto del contrato, la etapa actual y los frentes de supervisión que requiere.
            Respondemos con propuesta técnica y económica dentro de los plazos acordados.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { icon: Mail, text: "contacto@gruposinergiacolombia.com", href: "mailto:contacto@gruposinergiacolombia.com" },
              { icon: Phone, text: "+57 (601) 000 0000", href: "tel:+576010000000" },
              { icon: MapPin, text: "Bogotá D.C., Colombia" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(151,175,149,0.12)", border: "1px solid rgba(151,175,149,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <c.icon size={17} color="var(--verde-soft)" />
                </div>
                {c.href ? <a href={c.href} style={{ fontSize: 15, color: "var(--hueso)" }}>{c.text}</a> : <span style={{ fontSize: 15 }}>{c.text}</span>}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {status === "sent" ? (
            <motion.div initial={{ opacity: 0, transform: "scale(0.96)" }} animate={{ opacity: 1, transform: "scale(1)" }} transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }} style={{ background: "rgba(233,224,210,0.05)", border: "1px solid var(--line-dark)", borderRadius: 14, padding: "48px 32px", textAlign: "center" }}>
              <CheckCircle2 size={40} color="var(--verde-soft)" style={{ margin: "0 auto 16px" }} />
              <h3 className="heading" style={{ fontSize: 22, color: "var(--hueso)", marginBottom: 10 }}>Mensaje recibido</h3>
              <p style={{ fontSize: 14, color: "rgba(233,224,210,0.65)", lineHeight: 1.6 }}>Revisaremos su solicitud y responderemos al correo registrado.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "rgba(233,224,210,0.04)", border: "1px solid var(--line-dark)", borderRadius: 14, padding: "28px 26px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} data-contact-2col>
                <div>
                  <label className="field-label field-label--light">Nombre completo *</label>
                  <input required className="field field--dark" value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label className="field-label field-label--light">Correo *</label>
                  <input required type="email" className="field field--dark" value={form.email} onChange={set("email")} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label className="field-label field-label--light">Entidad o empresa</label>
                <input className="field field--dark" placeholder="Nombre de la entidad contratante" value={form.entity} onChange={set("entity")} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label className="field-label field-label--light">Descripción del requerimiento *</label>
                <textarea required className="field field--dark" rows={4} placeholder="Objeto del contrato, etapa, frentes de interventoría requeridos…" value={form.message} onChange={set("message")} style={{ resize: "vertical" }} />
              </div>
              {status === "error" && <div style={{ fontSize: 12.5, color: "#E8A79C", marginBottom: 12 }}>Error al enviar. Intente de nuevo o escríbanos directamente al correo.</div>}
              <button type="submit" disabled={!ready || status === "sending"} className="btn btn--primary" style={{ width: "100%", justifyContent: "center", opacity: ready ? 1 : 0.55, background: "var(--verde-deep)", boxShadow: "0 2px 12px rgba(107,135,105,0.3)" }}>
                {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
                {status === "sending" ? "Enviando…" : "Enviar solicitud"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
      <style>{`
        @media(max-width:860px){[data-contacto-grid]{grid-template-columns:1fr!important}}
        @media(max-width:560px){[data-contact-2col]{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
