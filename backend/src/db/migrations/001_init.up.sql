BEGIN;

CREATE TYPE tipo_item AS ENUM ('servicio', 'producto');

CREATE TABLE usuarios (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        varchar(100) NOT NULL,
  apellidos     varchar(100) NOT NULL,
  email         varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  created_at    timestamptz  NOT NULL DEFAULT now(),
  updated_at    timestamptz  NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ux_usuarios_email ON usuarios (email);

CREATE TABLE items_catalogo (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre     varchar(150)   NOT NULL,
  tipo       tipo_item      NOT NULL,
  precio     numeric(10,2)  NOT NULL CHECK (precio >= 0),
  created_at timestamptz    NOT NULL DEFAULT now(),
  updated_at timestamptz    NOT NULL DEFAULT now()
);
CREATE INDEX ix_items_catalogo_tipo ON items_catalogo (tipo);

CREATE TABLE asistencias (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id             uuid        NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha_hora_asistencia  timestamptz NOT NULL,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ux_asistencias_usuario ON asistencias (usuario_id);

CREATE TABLE asistencia_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asistencia_id uuid        NOT NULL REFERENCES asistencias(id) ON DELETE CASCADE,
  item_id       uuid        NOT NULL REFERENCES items_catalogo(id) ON DELETE RESTRICT,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ux_asistencia_items ON asistencia_items (asistencia_id, item_id);

CREATE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_usuarios_updated_at BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_items_catalogo_updated_at BEFORE UPDATE ON items_catalogo
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_asistencias_updated_at BEFORE UPDATE ON asistencias
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_asistencia_items_updated_at BEFORE UPDATE ON asistencia_items
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
