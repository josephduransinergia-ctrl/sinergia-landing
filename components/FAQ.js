"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "./FadeIn";

const ITEMS = [
  { q: "¿Qué es la interventoría de obra pública?", a: "Es la supervisión técnica, administrativa, financiera, ambiental y social que un tercero independiente ejerce sobre un contrato estatal, conforme a la Ley 80/1993 y el Decreto 1082/2015." },
  { q: "¿En qué etapa del contrato pueden iniciar?", a: "Desde la revisión precontractual hasta la liquidación. Entre más temprano se contrate la interventoría, mayor la capacidad de prevención de hallazgos." },
  { q: "¿Con qué entidades trabajan?", a: "Municipios, gobernaciones, empresas de servicios públicos domiciliarios y entidades del orden nacional. Todos los niveles de contratación pública." },
  { q: "¿Qué tipo de contratos supervisan?", a: "Contratos de obra pública, consultoría y prestación de servicios, principalmente en los sectores de energía, agua, saneamiento e infraestructura vial." },
  { q: "¿Cómo garantizan la trazabilidad?", a: "Con una plataforma digital propia donde cada documento se registra con fecha, responsable y estado. El expediente se organiza en 7 etapas y está disponible para auditoría en cualquier momento." },
];

function Item({ item, open, onClick }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "var(--hueso)", paddingRight: 16, fontFamily: "var(--font-display)" }}>{item.q}</span>
        <ChevronDown size={18} color="var(--verde)" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms var(--ease-out)", flexShrink: 0 }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.23,1,0.32,1] }} style={{ overflow: "hidden" }}>
            <p style={{ fontSize: 14.5, color: "var(--mist)", lineHeight: 1.7, paddingBottom: 20 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="grid-bg" style={{ background: "var(--abyss)", padding: "120px 0" }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <FadeIn>
          <div className="eyebrow" style={{ textAlign: "center" }}>FAQ</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--hueso)", textAlign: "center", marginBottom: 48 }}>
            Preguntas <em>frecuentes</em>
          </h2>
        </FadeIn>
        {ITEMS.map((item, i) => <Item key={i} item={item} open={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />)}
      </div>
    </section>
  );
}
