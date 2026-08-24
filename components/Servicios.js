"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HardHat, FileSpreadsheet, Wallet, Leaf, Users, FolderArchive } from "lucide-react";
import FadeIn from "./FadeIn";

const SERVICIOS = [
  { icon: HardHat, title: "Interventoría técnica", desc: "Verificación de especificaciones, calidad de materiales, ensayos de laboratorio, avance físico contra cronograma y cumplimiento de los diseños aprobados." },
  { icon: FileSpreadsheet, title: "Interventoría administrativa", desc: "Seguimiento documental del contrato: actas de comité, informes periódicos, correspondencia oficial, garantías vigentes y personal autorizado." },
  { icon: Wallet, title: "Interventoría financiera y contable", desc: "Control de ejecución presupuestal: revisión de actas de pago, precios unitarios, amortización del anticipo y balance financiero permanente." },
  { icon: Leaf, title: "Interventoría ambiental y social", desc: "Verificación del plan de manejo ambiental, licencias, permisos, manejo de residuos, socializaciones con la comunidad y atención de PQRS." },
  { icon: Users, title: "Consultoría en gestión contractual", desc: "Acompañamiento jurídico y técnico en todas las etapas del contrato: modificaciones, adiciones, suspensiones y procesos sancionatorios." },
  { icon: FolderArchive, title: "Gestión documental", desc: "Organización, custodia y digitalización del expediente contractual completo. Archivo estructurado por etapas para facilitar auditorías y rendición de cuentas." },
];

const PASOS = [
  { num: "01", name: "Revisión precontractual", desc: "Análisis de pliegos, estudios previos, presupuesto oficial y matriz de riesgos antes de la firma del contrato." },
  { num: "02", name: "Inicio y empalme", desc: "Acta de inicio, verificación de garantías, aprobación de personal y establecimiento de la línea base." },
  { num: "03", name: "Ejecución y seguimiento", desc: "Comités de obra, informes periódicos, bitácora, ensayos, actas parciales de pago y seguimiento fotográfico." },
  { num: "04", name: "Modificaciones contractuales", desc: "Concepto técnico sobre adiciones, prórrogas, suspensiones y mayores cantidades. Cada cambio documentado y justificado." },
  { num: "05", name: "Cierre y liquidación", desc: "Acta de terminación, recibo a satisfacción, balance financiero final, paz y salvos y acta de liquidación." },
];

export default function Servicios() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 75%", "end 80%"] });
  const clipRight = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <section id="servicios" className="section section--hueso">
      <div className="container">
        <FadeIn>
          <div className="eyebrow">Servicios</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "var(--azul-deep)", marginBottom: 14, maxWidth: 640 }}>
            Alcance de la interventoría
          </h2>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
            Integramos los frentes de verificación en un solo equipo, con un expediente unificado y una línea de responsabilidad directa ante la entidad contratante.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 80 }}>
          {SERVICIOS.map((s, i) => (
            <FadeIn key={s.title} delay={(i % 3) * 0.06}>
              <div className="card" style={{ height: "100%" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--hueso)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <s.icon size={21} color="var(--azul)" strokeWidth={1.7} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "var(--azul-deep)", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13.8, color: "var(--ink-soft)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Proceso numerado */}
        <FadeIn>
          <div className="eyebrow">Proceso</div>
          <h2 className="heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", color: "var(--azul-deep)", marginBottom: 48, maxWidth: 540 }}>
            Ciclo de interventoría contractual
          </h2>
        </FadeIn>

        <div ref={lineRef} style={{ position: "relative" }}>
          {/* Línea horizontal de conexión — se revela con scroll */}
          <div style={{ position: "absolute", top: 28, left: 0, right: 0, height: 2, background: "var(--line)", display: "none" }} data-process-line>
            <motion.div style={{ position: "absolute", inset: 0, background: "var(--azul)", clipPath: `inset(0 ${clipRight} 0 0)` }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, position: "relative" }} data-process-grid>
            {PASOS.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.08} y={0} x={-16}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: "var(--white)", border: "2px solid var(--azul)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
                    fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, color: "var(--azul)", position: "relative", zIndex: 1,
                  }}>{p.num}</div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--azul-deep)", marginBottom: 8 }}>{p.name}</h4>
                  <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(min-width:900px){[data-process-line]{display:block!important}}
        @media(max-width:900px){[data-process-grid]{grid-template-columns:1fr!important;gap:32px!important}}
      `}</style>
    </section>
  );
}
