BEGIN;

DROP TRIGGER IF EXISTS trg_asistencia_items_updated_at ON asistencia_items;
DROP TRIGGER IF EXISTS trg_asistencias_updated_at ON asistencias;
DROP TRIGGER IF EXISTS trg_items_catalogo_updated_at ON items_catalogo;
DROP TRIGGER IF EXISTS trg_usuarios_updated_at ON usuarios;

DROP FUNCTION IF EXISTS set_updated_at();

-- Orden inverso al de creación, para respetar las llaves foráneas.
DROP TABLE IF EXISTS asistencia_items;
DROP TABLE IF EXISTS asistencias;
DROP TABLE IF EXISTS items_catalogo;
DROP TABLE IF EXISTS usuarios;

DROP TYPE IF EXISTS tipo_item;

COMMIT;
