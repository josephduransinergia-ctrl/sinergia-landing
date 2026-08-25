"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  { num: "01", name: "Revisión precontractual", desc: "Análisis de pliegos, estudios previos, presupuesto oficial y matriz de riesgos antes de la firma del contrato.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=75&fit=crop" },
  { num: "02", name: "Inicio y empalme", desc: "Acta de inicio, verificación de garantías, aprobación de personal y establecimiento de la línea base del contrato.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75&fit=crop" },
  { num: "03", name: "Ejecución y seguimiento", desc: "Comités de obra, informes periódicos, bitácora, ensayos de laboratorio, actas parciales y seguimiento fotográfico.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75&fit=crop" },
  { num: "04", name: "Modificaciones", desc: "Concepto técnico sobre adiciones, prórrogas, suspensiones y mayores cantidades. Cada cambio documentado.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=75&fit=crop" },
  { num: "05", name: "Cierre y liquidación", desc: "Acta de terminación, recibo a satisfacción, balance financiero final, paz y salvos y acta de liquidación.", img: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&q=75&fit=crop" },
];

function ProcessStep({ paso, index, active, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ textAlign: "center", cursor: "pointer", position: "relative", zIndex: active ? 10 : 1 }}
    >
      <motion.div
        animate={{
          width: active ? 110 : 64,
          height: active ? 110 : 64,
          borderWidth: active ? 3 : 2,
        }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{
          borderRadius: "50%",
          background: "var(--abyss-2)",
          borderStyle: "solid",
          borderColor: active ? "var(--ochre-soft)" : "var(--verde)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Número — se oculta al activarse */}
        <motion.span
          animate={{ opacity: active ? 0 : 1, scale: active ? 0.6 : 1 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800,
            color: "var(--verde-glow)", position: "absolute",
          }}
        >
          {paso.num}
        </motion.span>

        {/* Imagen — aparece al activarse */}
        <motion.div
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.7 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${paso.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,20,32,0.3)", borderRadius: "50%" }} />
        </motion.div>
      </motion.div>

      <h4 style={{
        fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600,
        color: active ? "var(--ochre-soft)" : "var(--hueso)",
        transition: "color 250ms ease",
        marginBottom: 6,
      }}>
        {paso.name}
      </h4>

      {/* Descripción — aparece al hover */}
      <AnimatePresence>
        {active && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontSize: 12.5, color: "var(--mist)", lineHeight: 1.55,
              maxWidth: 200, margin: "0 auto", overflow: "hidden",
            }}
          >
            {paso.desc}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Servicios() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 80%", "end 70%"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [activeStep, setActiveStep] = useState(null);

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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 100 }}>
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

        {/* Ciclo de interventoría interactivo */}
        <FadeIn>
          <div className="eyebrow">Proceso</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", color: "var(--hueso)", marginBottom: 14 }}>
            Ciclo de <em>interventoría</em>
          </h2>
          <p style={{ fontSize: 14, color: "var(--mist)", marginBottom: 52, maxWidth: 480 }}>
            Pase el cursor sobre cada etapa para ver el detalle.
          </p>
        </FadeIn>

        <div ref={lineRef} style={{ position: "relative" }}>
          {/* Línea horizontal animada con scroll */}
          <div style={{ position: "absolute", top: 54, left: "5%", right: "5%", height: 2, background: "rgba(233,224,210,0.06)", display: "none" }} data-proc-line>
            <motion.div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: lineWidth, background: "linear-gradient(90deg, var(--ochre), var(--verde))" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} data-proc-grid>
            {PASOS.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.08} y={0} x={-16}>
                <ProcessStep
                  paso={p}
                  index={i}
                  active={activeStep === i}
                  onEnter={() => setActiveStep(i)}
                  onLeave={() => setActiveStep(null)}
                />
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
