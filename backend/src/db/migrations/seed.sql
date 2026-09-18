
INSERT INTO items_catalogo (nombre, tipo, precio)
SELECT v.nombre, v.tipo::tipo_item, v.precio
FROM (VALUES
  -- Servicios
  ('Análisis de suelo',                                  'servicio', 850.00),
  ('Diagnóstico fitosanitario',                          'servicio', 700.00),
  ('Asesoría técnica en fertilización',                  'servicio', 650.00),
  ('Capacitación en manejo integrado de plagas',         'servicio', 450.00),
  ('Diseño de plan de riego',                            'servicio', 900.00),

  -- Productos
  ('Fertilizante NPK 15-15-15 (saco 50kg)',              'producto', 285.50),
  ('Semilla certificada de maíz híbrido (bolsa 20kg)',   'producto', 950.00),
  ('Herbicida selectivo post-emergente (litro)',         'producto', 180.75),
  ('Fungicida sistémico (litro)',                        'producto', 220.00),
  ('Insecticida biológico (litro)',                      'producto', 165.25),
  ('Abono orgánico compostado (saco 40kg)',              'producto',  95.00),
  ('Bioestimulante foliar (litro)',                      'producto', 210.00),
  ('Cal agrícola dolomítica (quintal)',                  'producto',  60.00)
) AS v(nombre, tipo, precio)
WHERE NOT EXISTS (
  SELECT 1 FROM items_catalogo WHERE items_catalogo.nombre = v.nombre
);
