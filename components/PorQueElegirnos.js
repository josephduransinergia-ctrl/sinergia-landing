"use client";
import { Shield, FileCheck2, Users, MapPin, Monitor, MessageSquare } from "lucide-react";
import FadeIn from "./FadeIn";

const ITEMS = [
  { icon: Shield, title: "Cumplimiento normativo", desc: "Operamos bajo Ley 80/1993, Ley 1150/2007, Ley 1474/2011 y Decreto 1082/2015. Cada actuación tiene respaldo legal verificable." },
  { icon: FileCheck2, title: "Trazabilidad documental", desc: "61 documentos verificados por contrato, organizados en 7 etapas. El expediente está completo en cualquier momento del ciclo." },
  { icon: Users, title: "Equipo multidisciplinario", desc: "Ingenieros, abogados, contadores, ambientales y sociales integrados en un solo equipo con responsabilidad directa." },
  { icon: MapPin, title: "Presencia en campo", desc: "Residentes de interventoría en el sitio de la obra. La supervisión técnica se hace en el terreno, no desde escritorio." },
  { icon: Monitor, title: "Plataforma de gestión propia", desc: "Sistema digital interno para seguimiento de hitos, gestión documental, alertas de vencimiento y reportes en tiempo real." },
  { icon: MessageSquare, title: "Comunicación transparente", desc: "Informes periódicos a la entidad contratante con hallazgos, avance y recomendaciones. Sin ambigüedades ni demoras." },
];

export default function PorQueElegirnos() {
  return (
    <section className="section section--white">
      <div className="container">
        <FadeIn>
          <div className="eyebrow">Diferencial</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "var(--azul-deep)", marginBottom: 48, maxWidth: 540 }}>
            Por qué trabajar con Grupo Sinergia
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 3) * 0.05}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "24px 20px", borderRadius: 12, border: "1px solid var(--line)", background: "var(--hueso-light)", transition: "transform 200ms var(--ease-out)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--white)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.icon size={19} color="var(--verde-deep)" strokeWidth={1.7} />
                </div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--azul-deep)", marginBottom: 6 }}>{item.title}</h4>
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
