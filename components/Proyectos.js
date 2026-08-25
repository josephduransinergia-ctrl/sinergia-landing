"use client";
import { Zap, Building, Droplets } from "lucide-react";
import FadeIn from "./FadeIn";

const CASOS = [
  { icon: Zap, img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600photo-1509391366360-2e959784a276?w=600&q=70q=75photo-1509391366360-2e959784a276?w=600&q=70fit=crop", sector: "Sector energético", title: "Electrificación rural — Soluciones fotovoltaicas", cliente: "Entidad contratante del sector energético", status: "En ejecución", tags: ["7 frentes","Zona rural","FAZNI"] },
  { icon: Building, img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600photo-1590644365607-1c5e64809b0c?w=600&q=70q=75photo-1590644365607-1c5e64809b0c?w=600&q=70fit=crop", sector: "Infraestructura vial", title: "Mejoramiento vial — Vías terciarias", cliente: "Cliente institucional — sector transporte", status: "Finalizado", tags: ["Liquidado","Sin hallazgos","Expediente auditado"] },
  { icon: Droplets, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600photo-1581092160562-40aa08e78837?w=600&q=70q=75photo-1581092160562-40aa08e78837?w=600&q=70fit=crop", sector: "Agua y saneamiento", title: "Acueducto rural — Sistema de agua potable", cliente: "Cliente institucional — sector agua", status: "Finalizado", tags: ["5 frentes","Componente social","Entrega OK"] },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="grid-bg" style={{ background: "var(--abyss)", padding: "120px 0" }}>
      <div className="container">
        <FadeIn>
          <div className="eyebrow">Proyectos</div>
          <h2 className="heading" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", color: "var(--hueso)", marginBottom: 14, maxWidth: 600 }}>
            Contratos <em>supervisados</em>
          </h2>
          <p style={{ fontSize: 16, color: "var(--mist)", lineHeight: 1.7, maxWidth: 560, marginBottom: 52 }}>
            Historial de interventorías ejecutadas bajo estándares de contratación pública colombiana.
            Datos actualizados conforme a acuerdos de confidencialidad.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
          {CASOS.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div style={{ background: "var(--abyss-2)", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", transition: "transform 300ms var(--ease-out), border-color 300ms ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(151,175,149,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--line)"; }}
              >
                <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                  <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(0.8)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, var(--abyss-2))" }} />
                  <span style={{ position: "absolute", top: 14, right: 14, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: c.status === "En ejecución" ? "rgba(151,175,149,0.25)" : "rgba(233,224,210,0.1)", color: c.status === "En ejecución" ? "var(--verde-glow)" : "var(--mist)" }}>{c.status}</span>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ochre-soft)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{c.sector}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--hueso)", marginBottom: 8 }}>{c.title}</h3>
                  <div style={{ fontSize: 13.5, color: "var(--verde-glow)", fontWeight: 600, marginBottom: 14 }}>{c.cliente}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {c.tags.map(t => <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(233,224,210,0.05)", border: "1px solid var(--line)", color: "var(--mist)" }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
