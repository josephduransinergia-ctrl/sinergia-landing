"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CubeField from "./CubeField";

const NORMAS = ["LEY 80/1993","LEY 1150/2007","LEY 1474/2011","DECRETO 1082/2015","SECOP II","MANUAL DE INTERVENTORÍA","CONTRATACIÓN ESTATAL"];

const s = (i) => ({ duration: 0.65, delay: 0.2 + i * 0.08, ease: [0.23, 1, 0.32, 1] });

export default function Hero() {
  return (
    <section className="grid-bg" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--abyss)" }}>
      {/* Resplandores de fondo */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(900px 500px at 70% 25%, rgba(35,75,108,0.3), transparent 65%), radial-gradient(600px 400px at 10% 80%, rgba(151,175,149,0.15), transparent 60%)" }} />

      {/* Campo de cubos interactivos */}
      <CubeField count={30} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 120, paddingBottom: 120, width: "100%" }}>
        {/* Logo grande */}
        <motion.div initial={{ opacity: 0, transform: "scale(0.85)" }} animate={{ opacity: 1, transform: "scale(1)" }} transition={{ duration: 0.8, ease: [0.23,1,0.32,1] }} style={{ marginBottom: 40 }}>
          <img src="/logo-full.png" alt="Grupo Sinergia" style={{ height: 64, filter: "brightness(1.8) contrast(0.9)" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, transform: "translateY(12px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={s(0)} className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ width: 36, height: 2, background: "var(--ochre)", display: "inline-block" }} />
          INTERVENTORÍA DE OBRA PÚBLICA
        </motion.div>

        <motion.h1 initial={{ opacity: 0, transform: "translateY(24px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={s(2)} className="heading" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "var(--hueso)", margin: "0 0 26px", maxWidth: 860 }}>
          Verificación técnica de contratos públicos <em>en Colombia</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, transform: "translateY(20px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={s(4)} style={{ fontSize: "clamp(1.02rem, 1.6vw, 1.2rem)", color: "var(--mist)", maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>
          Grupo Sinergia ejerce interventoría integral sobre contratos de infraestructura del sector público.
          Supervisamos el cumplimiento contractual, técnico y normativo con trazabilidad documental completa
          en cada etapa del contrato.
        </motion.p>

        <motion.div initial={{ opacity: 0, transform: "translateY(20px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={s(6)} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#servicios" className="btn btn--ochre"><ArrowRight size={16} /> Conocer servicios</a>
          <a href="#contacto" className="btn btn--ghost">Solicitar cotización</a>
        </motion.div>
      </div>

      {/* Marquesina normativa */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid var(--line)", padding: "16px 0", background: "rgba(10,20,32,0.7)", backdropFilter: "blur(8px)", zIndex: 2 }}>
        <div className="marquee">
          <div className="marquee__track">
            {[...NORMAS,...NORMAS].map((n, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: "rgba(233,224,210,0.35)", whiteSpace: "nowrap" }}>
                {n}
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ochre)", opacity: 0.5 }} />
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Imagen decorativa */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 0.5, duration: 1.2 }} style={{ position: "absolute", right: -80, top: "15%", width: 500, height: 500, borderRadius: "50%", background: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=70') center/cover", filter: "grayscale(0.6)", display: "none" }} data-hero-img />

      <style>{`@media(min-width:1000px){[data-hero-img]{display:block!important}}`}</style>
    </section>
  );
}
