"use client";
import FadeIn from "./FadeIn";
import CountUp from "./CountUp";

const STATS = [
  { to: 8, suffix: "+", label: "Años de operación en el sector público" },
  { to: 12, suffix: "", label: "Contratos supervisados en interventoría" },
  { to: 6, suffix: "", label: "Departamentos con presencia activa" },
  { to: 25, suffix: "+", label: "Profesionales en campo y sede" },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="section section--white">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 64 }} data-nosotros-grid>
          <FadeIn>
            <div className="eyebrow">Quiénes somos</div>
            <h2 className="heading" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "var(--azul-deep)", marginBottom: 22, maxWidth: 540 }}>
              Interventoría especializada en contratos de infraestructura pública
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: 16, maxWidth: 540 }}>
              Grupo Sinergia Colombia S.A.S. es una firma dedicada a la verificación y control de ejecución
              de contratos estatales. Actuamos como tercero independiente entre la entidad contratante y el
              ejecutor, supervisando el cumplimiento técnico, administrativo, financiero, ambiental y social
              conforme a la normativa de contratación pública colombiana.
            </p>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.75, maxWidth: 540 }}>
              Operamos con un sistema de gestión documental propio que permite trazabilidad completa del
              expediente contractual en todas las etapas: desde la revisión precontractual hasta la liquidación.
              Cada acta, informe y hallazgo queda registrado con fecha, responsable y soporte verificable.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignContent: "center" }} data-stats-grid>
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08} style={{
                background: "var(--hueso-light)", border: "1px solid var(--line)", borderRadius: 12,
                padding: "24px 20px",
              }}>
                <div className="heading" style={{ fontSize: 40, color: "var(--azul)", lineHeight: 1 }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.45, marginTop: 8 }}>{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:860px){[data-nosotros-grid]{grid-template-columns:1fr!important}}
        @media(max-width:480px){[data-stats-grid]{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
