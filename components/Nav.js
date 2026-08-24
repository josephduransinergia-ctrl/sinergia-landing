"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#trabaja", label: "Únete al equipo" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,20,32,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "background 250ms ease, border-color 250ms ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo-icon.png" alt="" style={{ height: 30, filter: "brightness(1.6)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--hueso)" }}>Grupo Sinergia</span>
        </a>
        <nav style={{ display: "none", alignItems: "center", gap: 4 }} data-desktop-nav>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.05em", color: "var(--mist)", padding: "8px 12px", borderRadius: 8, transition: "color 200ms ease, background 200ms ease" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--hueso)"; e.currentTarget.style.background = "rgba(233,224,210,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--mist)"; e.currentTarget.style.background = "transparent"; }}
            >{l.label}</a>
          ))}
          <a href="#contacto" className="btn btn--ochre" style={{ padding: "10px 22px", fontSize: 13, marginLeft: 10 }}>Hablemos</a>
        </nav>
        <button onClick={() => setOpen(v => !v)} aria-label="Menú" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex" }} data-mobile-toggle>
          {open ? <X size={22} color="var(--hueso)" /> : <Menu size={22} color="var(--hueso)" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }} style={{ background: "var(--abyss)", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
            <div style={{ padding: "8px 24px 20px" }}>
              {LINKS.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04 }} style={{ display: "block", padding: "14px 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--hueso)", borderBottom: "1px solid var(--line)" }}>{l.label}</motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(min-width:920px){[data-desktop-nav]{display:flex!important}[data-mobile-toggle]{display:none!important}}`}</style>
    </header>
  );
}
