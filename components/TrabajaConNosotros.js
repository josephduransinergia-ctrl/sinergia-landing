"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Loader2, AlertCircle, X } from "lucide-react";
import { createClient } from "../lib/supabaseClient";

const CARGOS = [
  "Residente de Interventoría",
  "Director de Interventoría",
  "Profesional Social",
  "Profesional Ambiental",
  "Profesional Jurídico",
  "Ingeniero Eléctrico / Civil",
  "Auxiliar Administrativo de Contratos",
  "Topógrafo / SIG",
  "Otro",
];
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_CV = [".pdf"];
const ALLOWED_DOC = [".pdf", ".jpg", ".jpeg", ".png"];

function validateFile(file, allowed, label) {
  if (!file) return null;
  const ext = "." + file.name.split(".").pop().toLowerCase();
  if (!allowed.includes(ext)) return `${label}: formato no permitido (${allowed.join(", ")})`;
  if (file.size > MAX_SIZE) return `${label}: el archivo supera los 5 MB`;
  return null;
}

export default function TrabajaConNosotros() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", cargo: CARGOS[0], message: "" });
  const [cv, setCv] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [shaking, setShaking] = useState(false);
  const formRef = useRef(null);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Campo obligatorio";
    if (!form.email.trim()) e.email = "Campo obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo no válido";
    if (!form.phone.trim()) e.phone = "Campo obligatorio";
    const cvErr = cv ? validateFile(cv, ALLOWED_CV, "Hoja de vida") : null;
    if (cvErr) e.cv = cvErr;
    const cedErr = cedula ? validateFile(cedula, ALLOWED_DOC, "Cédula") : null;
    if (cedErr) e.cedula = cedErr;
    return e;
  };

  const shake = () => { setShaking(true); setTimeout(() => setShaking(false), 350); };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) { shake(); return; }
    setStatus("sending");

    try {
      const supabase = createClient();
      let cvPath = null, cvName = null, cedPath = null, cedName = null;

      if (cv) {
        cvName = cv.name;
        cvPath = `cv/${Date.now()}-${cv.name}`;
        const { error } = await supabase.storage.from("career-applications").upload(cvPath, cv);
        if (error) throw error;
      }
      if (cedula) {
        cedName = cedula.name;
        cedPath = `cedula/${Date.now()}-${cedula.name}`;
        const { error } = await supabase.storage.from("career-applications").upload(cedPath, cedula);
        if (error) throw error;
      }

      const { error } = await supabase.from("job_applications").insert({
        vacancy: form.cargo,
        full_name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim() || null,
        resume_storage_path: cvPath,
        resume_file_name: cvName,
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrors({ submit: err.message || "Error al enviar. Intente de nuevo." });
    }
  };

  const FileInput = ({ label, file, setFile, accept, error }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: "flex", alignItems: "center", gap: 10, border: `1.5px dashed ${error ? "#C0554A" : "var(--verde)"}`,
        borderRadius: 8, padding: "13px 14px", cursor: "pointer", fontSize: 13.5, color: "var(--ink-soft)", background: "rgba(151,175,149,0.05)",
      }}>
        <Upload size={16} color={error ? "#C0554A" : "var(--verde-deep)"} />
        <span style={{ flex: 1 }}>{file ? file.name : label}</span>
        {file && <X size={14} color="var(--ink-muted)" onClick={(e) => { e.preventDefault(); setFile(null); }} style={{ cursor: "pointer" }} />}
        <input type="file" accept={accept} onChange={e => setFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
      </label>
      {error && <div className="error-text">{error}</div>}
    </div>
  );

  return (
    <section id="trabaja" className="section section--hueso">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: 40 }} data-trabaja-grid>
          <div>
            <div className="eyebrow">Trabaja con nosotros</div>
            <h2 className="heading" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "var(--azul-deep)", marginBottom: 18, maxWidth: 440 }}>
              Perfiles para interventoría
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 20, maxWidth: 440 }}>
              Buscamos profesionales con experiencia en contratos estatales, capacidad para documentar hallazgos
              técnicos y disponibilidad para trabajo en campo. La rigurosidad documental y el criterio técnico
              son condiciones del cargo, no habilidades deseables.
            </p>
            <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.65 }}>
              <strong style={{ color: "var(--azul-deep)" }}>Requisitos de la postulación:</strong>
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                <li style={{ marginBottom: 4 }}>Nombre completo, correo y teléfono de contacto</li>
                <li style={{ marginBottom: 4 }}>Cargo al que aplica</li>
                <li style={{ marginBottom: 4 }}>Hoja de vida en PDF (máximo 5 MB)</li>
                <li>Fotocopia de cédula en PDF o imagen (máximo 5 MB)</li>
              </ul>
            </div>
          </div>

          <div ref={formRef} className={shaking ? "shake" : ""}>
            {status === "sent" ? (
              <motion.div initial={{ opacity: 0, transform: "scale(0.96)" }} animate={{ opacity: 1, transform: "scale(1)" }} transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }} style={{ background: "var(--white)", borderRadius: 14, padding: "48px 32px", textAlign: "center", border: "1px solid var(--line)" }}>
                <CheckCircle2 size={40} color="var(--verde-deep)" style={{ margin: "0 auto 16px" }} />
                <h3 className="heading" style={{ fontSize: 22, color: "var(--azul-deep)", marginBottom: 10 }}>Postulación recibida</h3>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>
                  Su información será revisada por el área de Talento Humano. Si su perfil se ajusta al cargo, lo contactaremos al correo o teléfono registrado.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: "var(--white)", borderRadius: 14, padding: "28px 26px", border: "1px solid var(--line)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} data-form-2col>
                  <div>
                    <label className="field-label">Nombre completo *</label>
                    <input className={`field ${errors.name ? "field-error" : ""}`} value={form.name} onChange={set("name")} />
                    {errors.name && <div className="error-text">{errors.name}</div>}
                  </div>
                  <div>
                    <label className="field-label">Correo electrónico *</label>
                    <input type="email" className={`field ${errors.email ? "field-error" : ""}`} value={form.email} onChange={set("email")} />
                    {errors.email && <div className="error-text">{errors.email}</div>}
                  </div>
                  <div>
                    <label className="field-label">Teléfono *</label>
                    <input className={`field ${errors.phone ? "field-error" : ""}`} value={form.phone} onChange={set("phone")} />
                    {errors.phone && <div className="error-text">{errors.phone}</div>}
                  </div>
                  <div>
                    <label className="field-label">Cargo al que aplica *</label>
                    <select className="field" value={form.cargo} onChange={set("cargo")} style={{ appearance: "auto" }}>
                      {CARGOS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="field-label">Mensaje / carta de presentación</label>
                  <textarea className="field" rows={4} value={form.message} onChange={set("message")} placeholder="Experiencia relevante, disponibilidad, zona de residencia…" style={{ resize: "vertical" }} />
                </div>
                <FileInput label="Adjuntar hoja de vida (PDF, máx. 5 MB)" file={cv} setFile={setCv} accept=".pdf" error={errors.cv} />
                <FileInput label="Adjuntar fotocopia de cédula (PDF o imagen, máx. 5 MB)" file={cedula} setFile={setCedula} accept=".pdf,.jpg,.jpeg,.png" error={errors.cedula} />

                {errors.submit && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#C0554A", background: "#FEF2F0", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                    <AlertCircle size={15} /> {errors.submit}
                  </div>
                )}

                <button type="submit" disabled={status === "sending"} className="btn btn--primary" style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
                  {status === "sending" ? "Enviando…" : "Enviar postulación"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:860px){[data-trabaja-grid]{grid-template-columns:1fr!important}}
        @media(max-width:560px){[data-form-2col]{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
