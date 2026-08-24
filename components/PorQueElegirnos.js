"use client";
import { Shield, FileCheck2, Users, MapPin, Monitor, MessageSquare } from "lucide-react";
import FadeIn from "./FadeIn";

const ITEMS = [
  { icon: Shield, title: "Cumplimiento normativo", desc: "Ley 80/1993, Ley 1150/2007, Ley 1474/2011 y Decreto 1082/2015. Cada actuación respaldada." },
  { icon: FileCheck2, title: "Trazabilidad documental", desc: "61 documentos verificados por contrato, organizados en 7 etapas del ciclo contractual." },
  { icon: Users, title: "Equipo multidisciplinario", desc: "Ingenieros, abogados, contadores, ambientales y sociales en un solo equipo." },
  { icon: MapPin, title: "Presencia en campo", desc: "Residentes de interventoría en el sitio de la obra. Supervisión en el terreno." },
  { icon: Monitor, title: "Plataforma propia", desc: "Sistema digital para seguimiento de hitos, documentos, alertas y reportes en tiempo real." },
  { icon: MessageSquare, title: "Comunicación directa", desc: "Informes periódicos con hallazgos, avance y recomendaciones. Sin ambigüedades." },
];

export default function PorQueElegirnos() {
  return (
    <section style={{ background: "var(--hueso)", color: "var(--ink)", padding: "120px 0" }}>
      <div className="container">
        <FadeIn>
          <div className="eyebrow" style={{ color: "var(--verde-deep)" }}>Diferencial</div>
          <h2 className="heading" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", color: "var(--ink)", marginBottom: 52 }}>
            Por qué <em style={{ color: "var(--verde-deep)" }}>Grupo Sinergia</em>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
          {ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 3) * 0.05}>
              <div style={{ display: "flex", gap: 16, padding: "24px 22px", borderRadius: 16, background: "white", border: "1px solid var(--line-light)", transition: "transform 200ms var(--ease-out), box-shadow 200ms ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(35,75,108,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--hueso-light)", border: "1px solid var(--line-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.icon size={20} color="var(--azul)" strokeWidth={1.7} />
                </div>
                <div>
                  <h4 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--ink)", marginBottom: 6, fontFamily: "var(--font-display)" }}>{item.title}</h4>
                  <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
