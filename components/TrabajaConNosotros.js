"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Loader2, AlertCircle, X, Briefcase, MapPin, Clock3 } from "lucide-react";
import { createClient } from "../lib/supabaseClient";
import FadeIn from "./FadeIn";

const MAX_SIZE = 5 * 1024 * 1024;
const FALLBACK_CARGOS = ["Residente de Interventoría","Profesional Social","Auxiliar Administrativo","Otro"];

function validateFile(f, a, l) { if (!f) return null; const ext = "."+f.name.split(".").pop().toLowerCase(); if (!a.includes(ext)) return `${l}: formato no permitido`; if (f.size > MAX_SIZE) return `${l}: supera 5 MB`; return null; }

export default function TrabajaConNosotros() {
  const [vacantes, setVacantes] = useState([]);
  const [loadingVacantes, setLoadingVacantes] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", cargo: "", message: "" });
  const [cv, setCv] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [shaking, setShaking] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  // Cargar vacantes activas desde Supabase (las mismas que publica el equipo desde la plataforma)
  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("vacancies")
          .select("id, title, location, type, description")
          .eq("active", true)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          setVacantes(data);
          setForm(f => ({ ...f, cargo: data[0].title }));
        } else {
          // Si no hay vacantes publicadas, mostrar fallback
          setVacantes(FALLBACK_CARGOS.map(c => ({ id: c, title: c, location: null, type: null, description: null })));
          setForm(f => ({ ...f, cargo: FALLBACK_CARGOS[0] }));
        }
      } catch {
        setVacantes(FALLBACK_CARGOS.map(c => ({ id: c, title: c, location: null, type: null, description: null })));
        setForm(f => ({ ...f, cargo: FALLBACK_CARGOS[0] }));
      }
      setLoadingVacantes(false);
    })();
  }, []);

  const selectedVacante = vacantes.find(v => v.title === form.cargo);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Obligatorio";
    if (!form.email.trim()) e.email = "Obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo no válido";
    if (!form.phone.trim()) e.phone = "Obligatorio";
    const cvE = cv ? validateFile(cv, [".pdf"], "Hoja de vida") : null;
    if (cvE) e.cv = cvE;
    const ceE = cedula ? validateFile(cedula, [".pdf",".jpg",".jpeg",".png"], "Cédula") : null;
    if (ceE) e.cedula = ceE;
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) { setShaking(true); setTimeout(() => setShaking(false), 350); return; }
    setStatus("sending");
    try {
      const supabase = createClient();
      let cvP = null, cvN = null;
     if (cv) { cvN = cv.name; cvP = `cv/${Date.now()}-${cv.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`; const { error } = await supabase.storage.from("career-applications").upload(cvP, cv); if (error) throw error; }

      const insertData = {
        vacancy: form.cargo,
        full_name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim() || null,
        resume_storage_path: cvP,
        resume_file_name: cvN,
      };

      // Si la vacante tiene un UUID real, enlazarla
      if (selectedVacante && selectedVacante.id && selectedVacante.id.includes("-")) {
        insertData.vacancy_id = selectedVacante.id;
      }

      const { error } = await supabase.from("job_applications").insert(insertData);
      if (error) throw error;
      setStatus("sent");
    } catch (err) { setStatus("error"); setErrors({ submit: err.message || "Error" }); }
  };

  const FileInput = ({ label, file, setFile, accept, error }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 10, border: `1.5px dashed ${error ? "#C0554A" : "var(--verde)"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", fontSize: 13.5, color: "var(--ink-soft)", background: "rgba(151,175,149,0.06)" }}>
        <Upload size={16} color={error ? "#C0554A" : "var(--verde-deep)"} />
        <span style={{ flex: 1 }}>{file ? file.name : label}</span>
        {file && <X size={14} color="var(--ink-muted)" onClick={(e) => { e.preventDefault(); setFile(null); }} style={{ cursor: "pointer" }} />}
        <input type="file" accept={accept} onChange={e => setFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
      </label>
      {error && <div className="error-text" style={{ color: "#C0554A" }}>{error}</div>}
    </div>
  );

  return (
    <section id="trabaja" style={{ background: "var(--hueso)", color: "var(--ink)", padding: "120px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 40 }} data-trabaja-grid>
          <FadeIn>
            <div className="eyebrow" style={{ color: "var(--verde-deep)" }}>Trabaja con nosotros</div>
            <h2 className="heading" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", color: "var(--ink)", marginBottom: 18 }}>
              Perfiles para <em style={{ color: "var(--verde-deep)" }}>interventoría</em>
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 24, maxWidth: 420 }}>
              Buscamos profesionales con experiencia en contratos estatales, capacidad para documentar hallazgos técnicos y disponibilidad para trabajo en campo.
            </p>

            {/* Vacantes dinámicas desde Supabase */}
            {loadingVacantes ? (
              <div style={{ padding: 20, color: "var(--ink-muted)", fontSize: 13 }}>Cargando vacantes…</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {vacantes.map(v => (
                  <div
                    key={v.id}
                    onClick={() => setForm(f => ({ ...f, cargo: v.title }))}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 12,
                      background: form.cargo === v.title ? "white" : "rgba(255,255,255,0.5)",
                      border: `1.5px solid ${form.cargo === v.title ? "var(--azul, #234B6C)" : "var(--line-light, rgba(35,75,108,0.14))"}`,
                      cursor: "pointer", transition: "all 0.2s ease",
                      transform: form.cargo === v.title ? "translateX(6px)" : "none",
                      boxShadow: form.cargo === v.title ? "0 10px 28px rgba(35,75,108,0.1)" : "none",
                    }}
                  >
                    <Briefcase size={15} color="var(--azul, #234B6C)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink, #1A2230)" }}>{v.title}</span>
                      {(v.location || v.type) && (
                        <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 11.5, color: "var(--ink-soft, #4A5568)" }}>
                          {v.location && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={11} /> {v.location}</span>}
                          {v.type && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock3 size={11} /> {v.type}</span>}
                        </div>
                      )}
                      {v.description && form.cargo === v.title && (
                        <p style={{ fontSize: 12.5, color: "var(--ink-soft, #4A5568)", lineHeight: 1.55, marginTop: 6, marginBottom: 0 }}>{v.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={shaking ? "shake" : ""}>
              {status === "sent" ? (
                <motion.div initial={{ opacity: 0, transform: "scale(0.96)" }} animate={{ opacity: 1, transform: "scale(1)" }} transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }} style={{ background: "white", borderRadius: 18, padding: "52px 32px", textAlign: "center", border: "1px solid var(--line-light, rgba(35,75,108,0.14))" }}>
                  <CheckCircle2 size={42} color="var(--verde-deep, #6B8769)" style={{ margin: "0 auto 16px" }} />
                  <h3 className="heading" style={{ fontSize: 22, color: "var(--ink, #1A2230)", marginBottom: 10 }}>Postulación recibida</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-soft, #4A5568)", maxWidth: 360, margin: "0 auto" }}>Su perfil será revisado por Talento Humano.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: 18, padding: "30px 28px", border: "1px solid var(--line-light, rgba(35,75,108,0.14))", boxShadow: "0 20px 50px rgba(35,75,108,0.08)" }}>
                  {form.cargo && (
                    <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "var(--ink-soft, #4A5568)", marginBottom: 16, letterSpacing: "0.04em" }}>
                      POSTULANDO A: <strong style={{ color: "var(--azul, #234B6C)" }}>{form.cargo.toUpperCase()}</strong>
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} data-form-2col>
                    <div><label className="field-label" style={{ color: "var(--ink-soft, #4A5568)" }}>Nombre completo *</label><input className={`field field--light ${errors.name ? "field-error" : ""}`} value={form.name} onChange={set("name")} />{errors.name && <div className="error-text" style={{ color: "#C0554A" }}>{errors.name}</div>}</div>
                    <div><label className="field-label" style={{ color: "var(--ink-soft, #4A5568)" }}>Correo *</label><input type="email" className={`field field--light ${errors.email ? "field-error" : ""}`} value={form.email} onChange={set("email")} />{errors.email && <div className="error-text" style={{ color: "#C0554A" }}>{errors.email}</div>}</div>
                    <div><label className="field-label" style={{ color: "var(--ink-soft, #4A5568)" }}>Teléfono *</label><input className={`field field--light ${errors.phone ? "field-error" : ""}`} value={form.phone} onChange={set("phone")} />{errors.phone && <div className="error-text" style={{ color: "#C0554A" }}>{errors.phone}</div>}</div>
                    <div><label className="field-label" style={{ color: "var(--ink-soft, #4A5568)" }}>Cargo *</label>
                      <select className="field field--light" value={form.cargo} onChange={set("cargo")} style={{ appearance: "auto" }}>
                        {vacantes.map(v => <option key={v.id} value={v.title}>{v.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}><label className="field-label" style={{ color: "var(--ink-soft, #4A5568)" }}>Mensaje</label><textarea className="field field--light" rows={3} value={form.message} onChange={set("message")} placeholder="Experiencia, disponibilidad…" style={{ resize: "vertical" }} /></div>
                  <FileInput label="Hoja de vida (PDF, máx. 5 MB)" file={cv} setFile={setCv} accept=".pdf" error={errors.cv} />
                  <FileInput label="Cédula (PDF o imagen, máx. 5 MB)" file={cedula} setFile={setCedula} accept=".pdf,.jpg,.jpeg,.png" error={errors.cedula} />
                  {errors.submit && <div style={{ fontSize: 13, color: "#C0554A", background: "#FEF2F0", borderRadius: 8, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={15} />{errors.submit}</div>}
                  <button type="submit" disabled={status === "sending"} className="btn btn--navy" style={{ width: "100%", justifyContent: "center" }}>
                    {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
                    {status === "sending" ? "Enviando…" : "Enviar postulación"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`
        @media(max-width:860px){[data-trabaja-grid]{grid-template-columns:1fr!important}}
        @media(max-width:560px){[data-form-2col]{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
