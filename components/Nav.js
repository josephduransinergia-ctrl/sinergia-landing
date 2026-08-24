"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#trabaja", label: "Trabaja con nosotros" },
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
      background: scrolled ? "rgba(243,239,231,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "background 200ms ease, border-color 200ms ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo-icon.png" alt="" style={{ height: 32 }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--azul-deep)" }}>Grupo Sinergia</span>
        </a>
        <nav style={{ display: "none", alignItems: "center", gap: 6 }} data-desktop-nav>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink-soft)", padding: "8px 10px", borderRadius: 6, transition: "color 200ms ease" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--azul)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-soft)"; }}
            >{l.label}</a>
          ))}
          <a href="#contacto" className="btn btn--primary" style={{ padding: "10px 20px", fontSize: 13, marginLeft: 8 }}>Solicitar cotización</a>
        </nav>
        <button onClick={() => setOpen(v => !v)} aria-label={open ? "Cerrar" : "Menú"} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex" }} data-mobile-toggle>
          {open ? <X size={22} color="var(--azul)" /> : <Menu size={22} color="var(--azul)" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }} style={{ background: "var(--hueso-light)", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
            <div style={{ padding: "8px 24px 20px" }}>
              {LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", padding: "13px 0", fontSize: 17, fontWeight: 600, color: "var(--ink)", borderBottom: "1px solid var(--line)" }}>{l.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(min-width:900px){[data-desktop-nav]{display:flex!important}[data-mobile-toggle]{display:none!important}}`}</style>
    </header>
  );
}
