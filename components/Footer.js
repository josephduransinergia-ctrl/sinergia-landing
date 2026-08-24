"use client";
export default function Footer() {
  return (
    <footer style={{ background: "#060E17", borderTop: "1px solid var(--line)", padding: "48px 24px 24px" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="/logo-full.png" alt="Grupo Sinergia" style={{ height: 28, filter: "brightness(1.6)" }} />
            </div>
            <p style={{ fontSize: 13, color: "rgba(233,224,210,0.5)", lineHeight: 1.6 }}>
              Interventoría de obra pública en Colombia. Verificación contractual con estándares de contratación estatal.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(233,224,210,0.4)", marginBottom: 14 }}>Navegación</div>
              {["#nosotros|Nosotros","#servicios|Servicios","#proyectos|Proyectos","#trabaja|Trabaja con nosotros","#contacto|Contacto"].map(s => {
                const [h, l] = s.split("|");
                return <a key={h} href={h} style={{ display: "block", fontSize: 13, color: "rgba(233,224,210,0.5)", padding: "4px 0" }}>{l}</a>;
              })}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(233,224,210,0.4)", marginBottom: 14 }}>Equipo</div>
              <a href="https://plataforma.gruposinergiacolombia.com" style={{ fontSize: 13, color: "var(--verde-glow)" }}>Plataforma interna →</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(233,224,210,0.3)" }}>© {new Date().getFullYear()} Grupo Sinergia Colombia S.A.S.</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(233,224,210,0.3)" }}>LEY 80/1993 · DECRETO 1082/2015</span>
        </div>
      </div>
    </footer>
  );
}
