"use client";
import FadeIn from "./FadeIn";
import CountUp from "./CountUp";

const STATS = [
  { to: 8, suffix: "+", label: "Años en el sector público" },
  { to: 12, suffix: "", label: "Contratos supervisados" },
  { to: 6, suffix: "", label: "Departamentos con presencia" },
  { to: 25, suffix: "+", label: "Profesionales en campo" },
];

export default function Nosotros() {
  return (
    <section id="nosotros" style={{ background: "var(--hueso-light)", color: "var(--ink)", padding: "120px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 100, background: "var(--abyss)", clipPath: "polygon(0 0,100% 0,100% 30%,0 100%)" }} />
      <div className="container" style={{ paddingTop: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 64 }} data-nos-grid>
          <FadeIn>
            <div className="eyebrow" style={{ color: "var(--verde-deep)" }}>Quiénes somos</div>
            <h2 className="heading" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", color: "var(--ink)", marginBottom: 22, maxWidth: 540 }}>
              Interventoría especializada en <em style={{ color: "var(--verde-deep)" }}>infraestructura pública</em>
            </h2>
            <p style={{ fontSize: 16.5, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: 16, maxWidth: 540 }}>
              Grupo Sinergia Colombia S.A.S. actúa como tercero independiente entre la entidad contratante y el
              ejecutor. Supervisamos el cumplimiento técnico, administrativo, financiero, ambiental y social
              conforme a la normativa colombiana de contratación pública.
            </p>
            <p style={{ fontSize: 16.5, color: "var(--ink-soft)", lineHeight: 1.75, maxWidth: 540 }}>
              Operamos con una plataforma digital propia que permite trazabilidad completa del expediente contractual:
              cada acta, informe y hallazgo queda registrado con fecha, responsable y soporte verificable.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignContent: "center" }} data-stats-grid>
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08} style={{ background: "white", border: "1px solid var(--line-light)", borderRadius: 16, padding: "28px 22px", boxShadow: "0 8px 24px rgba(35,75,108,0.06)" }}>
                <div className="heading" style={{ fontSize: 46, color: "var(--azul)", lineHeight: 1 }}><CountUp to={s.to} suffix={s.suffix} /></div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.45, marginTop: 10 }}>{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Imagen de obra */}
        <FadeIn delay={0.2} style={{ marginTop: 64, borderRadius: 20, overflow: "hidden", aspectRatio: "21/9", position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1400&q=75" alt="Obra de infraestructura" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(26,34,48,0.6))" }} />
          <div style={{ position: "absolute", bottom: 24, left: 28, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Supervisión activa en campo</div>
        </FadeIn>
      </div>
      <style>{`
        @media(max-width:860px){[data-nos-grid]{grid-template-columns:1fr!important}}
        @media(max-width:480px){[data-stats-grid]{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
