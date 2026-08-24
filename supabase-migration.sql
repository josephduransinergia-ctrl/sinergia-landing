-- =====================================================================
-- MIGRACIÓN LANDING V2 — Grupo Sinergia
-- Pégala completa en el SQL Editor de Supabase (el mismo proyecto de la
-- plataforma: ngxtfdvbnhjnaalntswd) y dale "Run".
-- Es segura de correr aunque ya hayas corrido la migración anterior:
-- solo crea lo que falte.
-- =====================================================================

-- 0) Tabla base de postulaciones (por si la migración anterior no se corrió)
create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  vacancy text not null,
  full_name text not null,
  email text not null,
  phone text,
  message text,
  resume_storage_path text,
  resume_file_name text,
  created_at timestamptz default now()
);

alter table job_applications enable row level security;

drop policy if exists "cualquiera puede postularse" on job_applications;
create policy "cualquiera puede postularse" on job_applications
  for insert to anon with check (true);

drop policy if exists "solo el equipo puede ver postulaciones" on job_applications;
create policy "solo el equipo puede ver postulaciones" on job_applications
  for select using (auth.uid() is not null);

-- 1) Campos nuevos del formulario "Trabaja con nosotros"
alter table job_applications add column if not exists city text;
alter table job_applications add column if not exists profession text;
alter table job_applications add column if not exists experience_years text;
alter table job_applications add column if not exists professional_license text;
alter table job_applications add column if not exists linkedin text;

-- 2) Nueva tabla para los mensajes del formulario de contacto
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  motive text not null,
  full_name text not null,
  email text not null,
  entity text,
  message text not null,
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;

drop policy if exists "cualquiera puede escribirnos" on contact_messages;
create policy "cualquiera puede escribirnos" on contact_messages
  for insert to anon with check (true);

drop policy if exists "solo el equipo lee los mensajes" on contact_messages;
create policy "solo el equipo lee los mensajes" on contact_messages
  for select using (auth.uid() is not null);

-- 3) Políticas de la bodega de hojas de vida.
-- IMPORTANTE: si aún no existe, crea el bucket manualmente primero:
-- Storage → New bucket → nombre exacto "career-applications" → privado.
drop policy if exists "cualquiera puede subir su hoja de vida" on storage.objects;
create policy "cualquiera puede subir su hoja de vida" on storage.objects
  for insert to anon with check (bucket_id = 'career-applications');

drop policy if exists "equipo puede ver hojas de vida" on storage.objects;
create policy "equipo puede ver hojas de vida" on storage.objects
  for select using (bucket_id = 'career-applications' and auth.uid() is not null);
