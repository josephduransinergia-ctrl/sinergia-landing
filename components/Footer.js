"use client";
export default function Footer() {
  return (
    <footer style={{ background: "#0F1F2E", borderTop: "1px solid var(--line-dark)", padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="/logo-icon.png" alt="" style={{ height: 28, filter: "brightness(2)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--hueso)" }}>Grupo Sinergia Colombia</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(233,224,210,0.55)", lineHeight: 1.6 }}>
              Interventoría de obra pública. Verificación contractual con estándares de contratación estatal colombiana.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(233,224,210,0.45)", marginBottom: 14 }}>Navegación</div>
              {["#nosotros|Nosotros","#servicios|Servicios","#proyectos|Proyectos","#trabaja|Trabaja con nosotros","#contacto|Contacto"].map(s => {
                const [href, label] = s.split("|");
                return <a key={href} href={href} style={{ display: "block", fontSize: 13, color: "rgba(233,224,210,0.55)", padding: "4px 0" }}>{label}</a>;
              })}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(233,224,210,0.45)", marginBottom: 14 }}>Equipo</div>
              <a href="https://plataforma.gruposinergiacolombia.com" style={{ fontSize: 13, color: "var(--verde-soft)" }}>Plataforma interna →</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line-dark)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(233,224,210,0.35)" }}>© {new Date().getFullYear()} Grupo Sinergia Colombia S.A.S.</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(233,224,210,0.35)" }}>NIT: 000.000.000-0</span>
        </div>
      </div>
    </footer>
  );
}
