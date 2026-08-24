"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stagger = (i) => ({ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.23, 1, 0.32, 1] });

export default function Hero() {
  return (
    <section className="grid-bg" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 90, background: "var(--hueso-light)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 50%, rgba(243,239,231,0.98) 0%, rgba(243,239,231,0.7) 50%, rgba(243,239,231,0.3) 100%)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", padding: "60px 24px 80px", width: "100%" }}>
        <motion.div initial={{ opacity: 0, transform: "translateY(10px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={stagger(0)} className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ width: 32, height: 1.5, background: "var(--verde)", display: "inline-block" }} />
          INTERVENTORÍA DE OBRA PÚBLICA
        </motion.div>

        <motion.h1 initial={{ opacity: 0, transform: "translateY(16px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={stagger(2)} className="heading" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", color: "var(--azul-deep)", margin: "0 0 22px", maxWidth: 780 }}>
          Verificación técnica, administrativa y financiera de contratos públicos en Colombia
        </motion.h1>

        <motion.p initial={{ opacity: 0, transform: "translateY(16px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={stagger(4)} style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: "var(--ink-soft)", maxWidth: 580, lineHeight: 1.7, marginBottom: 36 }}>
          Grupo Sinergia ejerce interventoría integral sobre contratos de infraestructura del sector público.
          Supervisamos el cumplimiento contractual, técnico y normativo con trazabilidad documental completa.
        </motion.p>

        <motion.div initial={{ opacity: 0, transform: "translateY(16px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={stagger(6)} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#servicios" className="btn btn--primary"><ArrowRight size={16} /> Ver servicios</a>
          <a href="#contacto" className="btn btn--outline">Solicitar cotización</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} style={{ marginTop: 64, display: "flex", gap: 40, flexWrap: "wrap" }}>
          {[
            { n: "Ley 80/1993", d: "Estatuto General de Contratación" },
            { n: "Ley 1474/2011", d: "Anticorrupción" },
            { n: "Decreto 1082/2015", d: "Reglamentario del sector" },
          ].map(r => (
            <div key={r.n} style={{ borderLeft: "2px solid var(--verde)", paddingLeft: 14 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 500, color: "var(--azul)", letterSpacing: "0.06em" }}>{r.n}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-muted)", marginTop: 2 }}>{r.d}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
