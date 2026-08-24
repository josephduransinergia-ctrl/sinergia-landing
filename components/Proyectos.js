"use client";
import { Zap, Building, Droplets } from "lucide-react";
import FadeIn from "./FadeIn";

const CASOS = [
  {
    icon: Zap,
    sector: "Sector energético",
    title: "Interventoría a contrato de obra — electrificación rural",
    cliente: "Entidad contratante del sector energético",
    alcance: "Interventoría técnica, administrativa, financiera, ambiental y social sobre contrato de obra para instalación de soluciones fotovoltaicas en zonas no interconectadas.",
    status: "En ejecución",
    metricas: ["7 frentes de interventoría", "Cobertura en zona rural", "Seguimiento documental completo"],
  },
  {
    icon: Building,
    sector: "Infraestructura pública",
    title: "Consultoría en gestión contractual — proyecto de infraestructura vial",
    cliente: "Cliente institucional — sector transporte",
    alcance: "Acompañamiento en la supervisión contractual de obra de mejoramiento vial, incluyendo revisión de actas, control financiero y verificación de cumplimiento de cronograma.",
    status: "Finalizado",
    metricas: ["Liquidación completada", "Expediente auditado", "Sin hallazgos fiscales"],
  },
  {
    icon: Droplets,
    sector: "Agua y saneamiento",
    title: "Interventoría a contrato de obra — acueducto rural",
    cliente: "Cliente institucional — sector agua potable",
    alcance: "Supervisión integral de obra de construcción de sistema de acueducto en zona rural, con componente ambiental y social reforzado.",
    status: "Finalizado",
    metricas: ["5 frentes de interventoría", "Componente social activo", "Entrega a satisfacción"],
  },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="section" style={{ background: "var(--azul-deep)", color: "var(--hueso)" }}>
      <div className="container">
        <FadeIn>
          <div className="eyebrow eyebrow--light">Proyectos</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "var(--hueso)", marginBottom: 14, maxWidth: 600 }}>
            Contratos supervisados
          </h2>
          <p style={{ fontSize: 16, color: "rgba(233,224,210,0.7)", lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
            Historial de interventorías y consultorías ejecutadas bajo estándares de contratación pública colombiana.
            Los datos específicos de cada contrato se actualizan conforme a los acuerdos de confidencialidad vigentes.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {CASOS.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.08}>
              <div style={{
                background: "rgba(233,224,210,0.04)", border: "1px solid var(--line-dark)", borderRadius: 14,
                padding: "28px 24px", height: "100%", display: "flex", flexDirection: "column",
                transition: "border-color 200ms ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(151,175,149,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line-dark)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: c.status === "En ejecución" ? "rgba(151,175,149,0.2)" : "rgba(233,224,210,0.1)", color: c.status === "En ejecución" ? "var(--verde-soft)" : "rgba(233,224,210,0.6)" }}>
                    {c.status}
                  </span>
                  <c.icon size={18} color="var(--verde-soft)" strokeWidth={1.5} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--verde-soft)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{c.sector}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "var(--hueso)", marginBottom: 8 }}>{c.title}</h3>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--verde-soft)", marginBottom: 12 }}>{c.cliente}</div>
                <p style={{ fontSize: 13.5, color: "rgba(233,224,210,0.65)", lineHeight: 1.65, marginBottom: 18, flex: 1 }}>{c.alcance}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {c.metricas.map(m => (
                    <span key={m} style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(233,224,210,0.06)", border: "1px solid var(--line-dark)", color: "rgba(233,224,210,0.55)" }}>{m}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
