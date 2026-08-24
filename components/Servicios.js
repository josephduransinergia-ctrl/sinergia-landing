"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HardHat, FileSpreadsheet, Wallet, Leaf, Users, FolderArchive } from "lucide-react";
import FadeIn from "./FadeIn";

const SERVICIOS = [
  { icon: HardHat, title: "Interventoría técnica", desc: "Especificaciones, calidad de materiales, ensayos de laboratorio, avance físico y cumplimiento de diseños aprobados." },
  { icon: FileSpreadsheet, title: "Interventoría administrativa", desc: "Actas de comité, informes periódicos, correspondencia oficial, garantías vigentes y personal autorizado." },
  { icon: Wallet, title: "Interventoría financiera", desc: "Actas de pago, precios unitarios, amortización del anticipo y balance financiero permanente." },
  { icon: Leaf, title: "Interventoría ambiental y social", desc: "Plan de manejo ambiental, licencias, permisos, socializaciones con la comunidad y atención de PQRS." },
  { icon: Users, title: "Consultoría contractual", desc: "Acompañamiento jurídico y técnico: modificaciones, adiciones, suspensiones y procesos sancionatorios." },
  { icon: FolderArchive, title: "Gestión documental", desc: "Organización, custodia y digitalización del expediente contractual completo por etapas." },
];

const PASOS = [
  { num: "01", name: "Revisión precontractual" },
  { num: "02", name: "Inicio y empalme" },
  { num: "03", name: "Ejecución y seguimiento" },
  { num: "04", name: "Modificaciones" },
  { num: "05", name: "Cierre y liquidación" },
];

export default function Servicios() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 80%", "end 70%"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="servicios" className="grid-bg" style={{ background: "var(--abyss)", padding: "120px 0" }}>
      <div className="container">
        <FadeIn>
          <div className="eyebrow">Servicios</div>
          <h2 className="heading" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", color: "var(--hueso)", marginBottom: 14, maxWidth: 640 }}>
            Alcance de la <em>interventoría</em>
          </h2>
          <p style={{ fontSize: 16, color: "var(--mist)", lineHeight: 1.7, maxWidth: 580, marginBottom: 52 }}>
            Seis frentes de verificación integrados en un solo equipo, con un expediente unificado y una línea de responsabilidad directa ante la entidad contratante.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 80 }}>
          {SERVICIOS.map((s, i) => (
            <FadeIn key={s.title} delay={(i % 3) * 0.06}>
              <div className="svc-card" onMouseMove={handleMove} style={{ height: "100%" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(151,175,149,0.1)", border: "1px solid rgba(151,175,149,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <s.icon size={22} color="var(--verde-glow)" strokeWidth={1.6} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "var(--hueso)", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13.8, color: "var(--mist)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Proceso numerado con línea animada */}
        <FadeIn>
          <div className="eyebrow">Proceso</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", color: "var(--hueso)", marginBottom: 48 }}>
            Ciclo de interventoría
          </h2>
        </FadeIn>
        <div ref={lineRef} style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 32, left: "5%", right: "5%", height: 2, background: "rgba(233,224,210,0.08)", display: "none" }} data-proc-line>
            <motion.div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: lineWidth, background: "linear-gradient(90deg, var(--ochre), var(--verde))" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }} data-proc-grid>
            {PASOS.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.08} y={0} x={-16}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--abyss-2)", border: "2px solid var(--verde)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "var(--verde-glow)", position: "relative", zIndex: 1 }}>{p.num}</div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--hueso)" }}>{p.name}</h4>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(min-width:900px){[data-proc-line]{display:block!important}}
        @media(max-width:900px){[data-proc-grid]{grid-template-columns:repeat(2,1fr)!important;gap:32px!important}}
        @media(max-width:480px){[data-proc-grid]{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
