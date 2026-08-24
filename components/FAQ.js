"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  { q: "¿Qué es la interventoría de obra pública?", a: "Es la supervisión técnica, administrativa, financiera, ambiental y social que un tercero independiente ejerce sobre un contrato estatal. La interventoría verifica que el contratista cumpla lo pactado en plazo, calidad y presupuesto, conforme a la Ley 80 de 1993 y el Decreto 1082 de 2015." },
  { q: "¿En qué etapa del contrato deben contratarnos?", a: "Lo ideal es desde la etapa precontractual, para revisar pliegos y presupuesto. Sin embargo, podemos iniciar en cualquier momento del ciclo: inicio, ejecución, modificaciones o cierre. Entre más temprano, mayor capacidad de prevención." },
  { q: "¿Trabajan con entidades del orden nacional y territorial?", a: "Sí. Prestamos servicios a entidades de todos los niveles: municipios, gobernaciones, empresas de servicios públicos domiciliarios y entidades del orden nacional." },
  { q: "¿Qué tipo de contratos supervisan?", a: "Contratos de obra pública, consultoría, prestación de servicios y contratos derivados de convenios interadministrativos, principalmente en los sectores de energía, agua, saneamiento e infraestructura vial." },
  { q: "¿Cómo garantizan la trazabilidad del expediente?", a: "Operamos con una plataforma digital propia donde cada documento se registra con fecha, responsable y estado. El expediente se organiza por las 7 etapas contractuales y está disponible para auditoría en cualquier momento." },
];

function Item({ item, open, onClick }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={onClick} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ fontSize: 15.5, fontWeight: 600, color: "var(--azul-deep)", paddingRight: 16 }}>{item.q}</span>
        <ChevronDown size={18} color="var(--azul)" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms var(--ease-out)", flexShrink: 0 }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7, paddingBottom: 18 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="section section--white">
      <div className="container" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="eyebrow" style={{ textAlign: "center" }}>Preguntas frecuentes</div>
        <h2 className="heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", color: "var(--azul-deep)", textAlign: "center", marginBottom: 40 }}>
          Sobre la interventoría
        </h2>
        {ITEMS.map((item, i) => (
          <Item key={i} item={item} open={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />
        ))}
      </div>
    </section>
  );
}
