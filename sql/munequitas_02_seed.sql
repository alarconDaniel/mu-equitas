-- =========================================================
-- MUÑEQUITAS - 02_seed.sql
-- Datos iniciales del catálogo
-- =========================================================

BEGIN;

-- =========================================================
-- CATEGORÍAS
-- =========================================================

INSERT INTO categories (
  name,
  slug,
  description,
  image_url,
  display_order,
  is_active
)
VALUES
(
  'Colección Premium',
  'coleccion-premium',
  'Piezas de colección con acabados especiales, presencia elegante y detalles de alto impacto.',
  '/images/categories/premium.jpg',
  1,
  TRUE
),
(
  'Muñecas Clásicas',
  'munecas-clasicas',
  'Diseños atemporales, delicados y fáciles de integrar en cualquier colección.',
  '/images/categories/clasicas.jpg',
  2,
  TRUE
),
(
  'Edición Regalo',
  'edicion-regalo',
  'Piezas pensadas para sorprender, con detalles memorables y presentación especial.',
  '/images/categories/regalo.jpg',
  3,
  TRUE
),
(
  'Muñecas Personalizadas',
  'munecas-personalizadas',
  'Muñecas con detalles únicos, accesorios seleccionables y acabados a medida.',
  '/images/categories/personalizadas.jpg',
  4,
  TRUE
),
(
  'Mini Muñecas',
  'mini-munecas',
  'Versiones pequeñas tipo llavero, pensadas para llevar, regalar o coleccionar como detalles especiales.',
  '/images/categories/mini-munecas.jpg',
  5,
  TRUE
),
(
  'Accesorios',
  'accesorios',
  'Complementos decorativos para elevar cada pieza de colección.',
  '/images/categories/accesorios.jpg',
  6,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

-- =========================================================
-- COLECCIONES
-- =========================================================

INSERT INTO collections (
  name,
  slug,
  description,
  image_url,
  display_order,
  is_active
)
VALUES
(
  'Winter Elegance',
  'winter-elegance',
  'Una colección de tonos fríos, energía vibrante y detalles luminosos.',
  '/images/collections/winter-elegance.jpg',
  1,
  TRUE
),
(
  'Essentials',
  'essentials',
  'Piezas esenciales de líneas limpias, elegancia sencilla y carácter reconocible.',
  '/images/collections/essentials.jpg',
  2,
  TRUE
),
(
  'Moments',
  'moments',
  'Diseños pensados para regalar recuerdos, emociones y pequeños gestos inolvidables.',
  '/images/collections/moments.jpg',
  3,
  TRUE
),
(
  'Noir',
  'noir',
  'Sofisticación oscura, acabados metálicos y presencia intensa.',
  '/images/collections/noir.jpg',
  4,
  TRUE
),
(
  'Atelier',
  'atelier',
  'Colección de detalles personalizados, confección cuidada y estilo artesanal.',
  '/images/collections/atelier.jpg',
  5,
  TRUE
),
(
  'Spring Vibe',
  'spring-vibe',
  'Texturas suaves, aire fresco y detalles luminosos de temporada.',
  '/images/collections/spring-vibe.jpg',
  6,
  TRUE
),
(
  'Avant-Garde',
  'avant-garde',
  'Diseños audaces, modernos y expresivos para vitrinas contemporáneas.',
  '/images/collections/avant-garde.jpg',
  7,
  TRUE
),
(
  'Heritage',
  'heritage',
  'Piezas teatrales, elegantes y con espíritu de legado.',
  '/images/collections/heritage.jpg',
  8,
  TRUE
),
(
  'Mini Icons',
  'mini-icons',
  'Una selección de llaveros coleccionables inspirados en piezas icónicas del catálogo.',
  '/images/collections/mini-icons.jpg',
  9,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

-- =========================================================
-- MUÑECAS PRINCIPALES
-- =========================================================

INSERT INTO dolls (
  code,
  name,
  slug,
  description,
  price,
  image_url,
  tag,
  product_type,
  available,
  stock_quantity,
  popularity,
  is_featured,
  category_id,
  collection_id,
  created_at
)
SELECT
  v.code,
  v.name,
  v.slug,
  v.description,
  v.price,
  v.image_url,
  v.tag,
  'doll',
  v.available,
  v.stock_quantity,
  v.popularity,
  v.is_featured,
  c.id,
  col.id,
  v.created_at::timestamptz
FROM (
  VALUES
  (
    'd1',
    'Burnice White',
    'burnice-white',
    'Una pieza elegante, luminosa y explosiva en los detalles. Su diseño mezcla blanco cálido, bordados finos y un pequeño guiño de coctelería brillante para quienes reconocen esa energía que prende cualquier vitrina.',
    185000,
    'https://images.unsplash.com/photo-1544329241-118817478051?auto=format&fit=crop&q=80&w=800',
    'Nuevo',
    TRUE,
    12,
    95,
    TRUE,
    'coleccion-premium',
    'winter-elegance',
    '2026-05-01'
  ),
  (
    'd2',
    'Jane Doe',
    'jane-doe',
    'Diseño clásico, discreto y misterioso. Su expresión tranquila, los tonos sobrios y los detalles afilados transmiten esa sensación de que siempre sabe más de lo que dice.',
    120000,
    'https://images.unsplash.com/photo-1533038590840-1c7987e9ad15?auto=format&fit=crop&q=80&w=800',
    'Más vendido',
    TRUE,
    18,
    98,
    TRUE,
    'munecas-clasicas',
    'essentials',
    '2026-03-15'
  ),
  (
    'd3',
    'Ellen Joe',
    'ellen-joe',
    'Muñeca de aire elegante y actitud serena, con contraste monocromático, detalles rojizos y una silueta marina sutil. Perfecta para vitrinas con personalidad fría y sofisticada.',
    145000,
    'https://images.unsplash.com/photo-1588636733221-da3b7b250de8?auto=format&fit=crop&q=80&w=800',
    'Regalo Ideal',
    TRUE,
    10,
    88,
    TRUE,
    'edicion-regalo',
    'moments',
    '2026-04-20'
  ),
  (
    'd4',
    'Grace Howard',
    'grace-howard',
    'Sofisticación técnica en versión de colección. Incluye acabados metálicos, postura segura y pequeños detalles de taller que evocan precisión, inteligencia y amor por las máquinas.',
    210000,
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    'Edición Limitada',
    FALSE,
    0,
    100,
    TRUE,
    'coleccion-premium',
    'noir',
    '2026-01-10'
  ),
  (
    'd5',
    'Zhu Yuan',
    'zhu-yuan',
    'Diseño firme, pulcro y elegante, con presencia de capitana y detalles de uniforme refinado. Una muñeca que transmite disciplina, calma y una autoridad imposible de ignorar.',
    160000,
    'https://images.unsplash.com/photo-1618691515228-3e440b8a3291?auto=format&fit=crop&q=80&w=800',
    'Personalizable',
    TRUE,
    9,
    85,
    FALSE,
    'munecas-personalizadas',
    'atelier',
    '2026-05-10'
  ),
  (
    'd6',
    'Nicole Demara',
    'nicole-demara',
    'Muñeca carismática, brillante y un poco pícara, con detalles dorados, bolso miniatura y una expresión de quien siempre encuentra una salida elegante a cualquier problema.',
    135000,
    'https://images.unsplash.com/photo-1621509930438-6decd716260a?auto=format&fit=crop&q=80&w=800',
    '',
    TRUE,
    16,
    75,
    FALSE,
    'munecas-clasicas',
    'spring-vibe',
    '2026-02-28'
  ),
  (
    'd7',
    'Amby Demara',
    'amby-demara',
    'Una pieza de líneas limpias, mirada tranquila y energía reservada. Incluye pequeños auriculares decorativos y detalles eléctricos sutiles para una vibra calmada pero letalmente cool.',
    138000,
    'https://images.unsplash.com/photo-1580231649964-b0451cf57b85?auto=format&fit=crop&q=80&w=800',
    'Nuevo',
    TRUE,
    14,
    82,
    TRUE,
    'edicion-regalo',
    'spring-vibe',
    '2026-05-15'
  ),
  (
    'd8',
    'Nekomata',
    'nekomata',
    'Muñeca ágil y juguetona, con detalles felinos, accesorios pequeños y una pose dinámica. Su encanto está en sentirse tierna a primera vista y traviesa cuando la miras mejor.',
    195000,
    'https://images.unsplash.com/photo-1610425712165-27a964a27bc5?auto=format&fit=crop&q=80&w=800',
    'Exclusivo',
    TRUE,
    7,
    91,
    TRUE,
    'coleccion-premium',
    'avant-garde',
    '2026-04-05'
  ),
  (
    'd9',
    'Yidhari Murphy',
    'yidhari-murphy',
    'Detalle artesanal impecable, tonos fríos y una calma de profundidad marina. Cada puntada se siente como una historia antigua guardada bajo cristal.',
    170000,
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
    '',
    TRUE,
    8,
    70,
    FALSE,
    'munecas-personalizadas',
    'atelier',
    '2026-03-22'
  ),
  (
    'd10',
    'TM Opera O',
    'tm-opera-o',
    'La joya teatral de la colección. Su porte escénico, capa majestuosa y acabados dorados hacen que parezca lista para recibir aplausos incluso antes de salir de la caja.',
    240000,
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800',
    'Premium',
    TRUE,
    5,
    99,
    TRUE,
    'coleccion-premium',
    'heritage',
    '2025-11-20'
  ),
  (
    'd11',
    'Agnes Tachyon',
    'agnes-tachyon',
    'Minimalismo excéntrico con detalles de laboratorio, notas diminutas y una sensación de velocidad contenida. Una pieza curiosa, elegante y ligeramente caótica.',
    115000,
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    '',
    TRUE,
    13,
    80,
    FALSE,
    'munecas-clasicas',
    'essentials',
    '2026-01-30'
  ),
  (
    'd12',
    'Jungle Pocket',
    'jungle-pocket',
    'Texturas ricas, tonos tierra y una energía indomable. Tiene expresión intensa, espíritu competitivo y la sensación de estar a punto de correr hacia una nueva era.',
    155000,
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800',
    'Últimas unidades',
    TRUE,
    6,
    89,
    TRUE,
    'edicion-regalo',
    'moments',
    '2026-02-14'
  )
) AS v (
  code,
  name,
  slug,
  description,
  price,
  image_url,
  tag,
  available,
  stock_quantity,
  popularity,
  is_featured,
  category_slug,
  collection_slug,
  created_at
)
INNER JOIN categories c ON c.slug = v.category_slug
INNER JOIN collections col ON col.slug = v.collection_slug
ON CONFLICT (slug) DO UPDATE SET
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  tag = EXCLUDED.tag,
  product_type = EXCLUDED.product_type,
  available = EXCLUDED.available,
  stock_quantity = EXCLUDED.stock_quantity,
  popularity = EXCLUDED.popularity,
  is_featured = EXCLUDED.is_featured,
  category_id = EXCLUDED.category_id,
  collection_id = EXCLUDED.collection_id,
  created_at = EXCLUDED.created_at;

-- =========================================================
-- ACCESORIOS
-- =========================================================

INSERT INTO dolls (
  code,
  name,
  slug,
  description,
  price,
  image_url,
  tag,
  product_type,
  available,
  stock_quantity,
  popularity,
  is_featured,
  category_id,
  collection_id,
  created_at
)
SELECT
  v.code,
  v.name,
  v.slug,
  v.description,
  v.price,
  v.image_url,
  v.tag,
  'accessory',
  v.available,
  v.stock_quantity,
  v.popularity,
  v.is_featured,
  c.id,
  col.id,
  v.created_at::timestamptz
FROM (
  VALUES
  (
    'a1',
    'Capa Escénica TM Opera O',
    'capa-escenica-tm-opera-o',
    'Capa miniatura de acabado teatral, con caída elegante y detalles dorados. Perfecta para darle a cualquier vitrina ese aire de entrada triunfal.',
    45000,
    '/images/accessories/capa-tm-opera-o.jpg',
    'Accesorio Premium',
    TRUE,
    20,
    94,
    TRUE,
    'accesorios',
    'heritage',
    '2026-05-16'
  ),
  (
    'a2',
    'Cóctel Nitro-Fuel Decorativo',
    'coctel-nitro-fuel-decorativo',
    'Mini bebida decorativa con tonos brillantes y energía de barra nocturna. No es consumible; es un accesorio de exhibición para coleccionistas con buen ojo.',
    32000,
    '/images/accessories/nitro-fuel.jpg',
    'Nuevo',
    TRUE,
    25,
    96,
    TRUE,
    'accesorios',
    'winter-elegance',
    '2026-05-16'
  ),
  (
    'a3',
    'Auriculares Amby Demara',
    'auriculares-amby-demara',
    'Auriculares miniatura de líneas limpias y estilo urbano. Un detalle silencioso, reservado y perfecto para completar una composición minimalista.',
    52000,
    '/images/accessories/auriculares-amby.jpg',
    'Más vendido',
    TRUE,
    18,
    90,
    TRUE,
    'accesorios',
    'spring-vibe',
    '2026-05-16'
  ),
  (
    'a4',
    'Tijeras Ornamentales Ellen Joe',
    'tijeras-ornamentales-ellen-joe',
    'Accesorio decorativo de acabado plateado, con diseño elegante y filo visual. Pensado para vitrinas sofisticadas con un toque frío y preciso.',
    48000,
    '/images/accessories/tijeras-ellen.jpg',
    'Exclusivo',
    TRUE,
    11,
    87,
    FALSE,
    'accesorios',
    'moments',
    '2026-05-16'
  ),
  (
    'a5',
    'Bolso Mini Nicole Demara',
    'bolso-mini-nicole-demara',
    'Bolso decorativo con acabado brillante y actitud de negocio cerrado a último minuto. Pequeño, coqueto y con muchísima personalidad.',
    39000,
    '/images/accessories/bolso-nicole.jpg',
    '',
    TRUE,
    17,
    82,
    FALSE,
    'accesorios',
    'spring-vibe',
    '2026-05-16'
  ),
  (
    'a6',
    'Kit de Laboratorio Agnes Tachyon',
    'kit-laboratorio-agnes-tachyon',
    'Set miniatura con libreta, frascos decorativos y detalles científicos. Ideal para una vitrina con vibra experimental, curiosa y ligeramente caótica.',
    58000,
    '/images/accessories/kit-agnes.jpg',
    'Edición limitada',
    TRUE,
    9,
    88,
    FALSE,
    'accesorios',
    'essentials',
    '2026-05-16'
  ),
  (
    'a7',
    'Base de Exhibición Jungle Pocket',
    'base-exhibicion-jungle-pocket',
    'Base decorativa con tonos tierra y textura dinámica. Diseñada para piezas con energía intensa, movimiento y espíritu competitivo.',
    42000,
    '/images/accessories/base-jungle-pocket.jpg',
    '',
    TRUE,
    15,
    79,
    FALSE,
    'accesorios',
    'moments',
    '2026-05-16'
  ),
  (
    'a8',
    'Diario de Cristal Yidhari Murphy',
    'diario-cristal-yidhari-murphy',
    'Diario miniatura de tonos fríos, con acabado translúcido y detalles delicados. Un accesorio para quienes aman las historias guardadas en silencio.',
    36000,
    '/images/accessories/diario-yidhari.jpg',
    'Nuevo',
    TRUE,
    14,
    76,
    FALSE,
    'accesorios',
    'atelier',
    '2026-05-16'
  )
) AS v (
  code,
  name,
  slug,
  description,
  price,
  image_url,
  tag,
  available,
  stock_quantity,
  popularity,
  is_featured,
  category_slug,
  collection_slug,
  created_at
)
INNER JOIN categories c ON c.slug = v.category_slug
INNER JOIN collections col ON col.slug = v.collection_slug
ON CONFLICT (slug) DO UPDATE SET
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  tag = EXCLUDED.tag,
  product_type = EXCLUDED.product_type,
  available = EXCLUDED.available,
  stock_quantity = EXCLUDED.stock_quantity,
  popularity = EXCLUDED.popularity,
  is_featured = EXCLUDED.is_featured,
  category_id = EXCLUDED.category_id,
  collection_id = EXCLUDED.collection_id,
  created_at = EXCLUDED.created_at;

-- =========================================================
-- MINI MUÑECAS / LLAVEROS
-- =========================================================

INSERT INTO dolls (
  code,
  name,
  slug,
  description,
  price,
  image_url,
  tag,
  product_type,
  available,
  stock_quantity,
  popularity,
  is_featured,
  category_id,
  collection_id,
  created_at
)
SELECT
  v.code,
  v.name,
  v.slug,
  v.description,
  v.price,
  v.image_url,
  v.tag,
  'keychain',
  v.available,
  v.stock_quantity,
  v.popularity,
  v.is_featured,
  c.id,
  col.id,
  v.created_at::timestamptz
FROM (
  VALUES
  (
    'k1',
    'Llavero Mini TM Opera O',
    'llavero-mini-tm-opera-o',
    'Mini muñeca tipo llavero con capa escénica, detalles dorados y una pose orgullosa que parece pedir aplausos incluso en tamaño de bolsillo.',
    68000,
    '/images/keychains/mini-tm-opera-o.jpg',
    'Mini Premium',
    TRUE,
    22,
    94,
    TRUE,
    'mini-munecas',
    'mini-icons',
    '2026-05-18'
  ),
  (
    'k2',
    'Llavero Mini Burnice White',
    'llavero-mini-burnice-white',
    'Mini muñeca tipo llavero de energía brillante, sonrisa encendida y un pequeño detalle inspirado en su bebida especial de vitrina.',
    62000,
    '/images/keychains/mini-burnice-white.jpg',
    'Nuevo',
    TRUE,
    24,
    96,
    TRUE,
    'mini-munecas',
    'mini-icons',
    '2026-05-18'
  ),
  (
    'k3',
    'Llavero Mini Ellen Joe',
    'llavero-mini-ellen-joe',
    'Mini muñeca tipo llavero con expresión tranquila, contraste monocromático y un detalle marino sutil que la hace sentirse fría, elegante y adorable.',
    64000,
    '/images/keychains/mini-ellen-joe.jpg',
    'Regalo Ideal',
    TRUE,
    19,
    92,
    TRUE,
    'mini-munecas',
    'mini-icons',
    '2026-05-18'
  )
) AS v (
  code,
  name,
  slug,
  description,
  price,
  image_url,
  tag,
  available,
  stock_quantity,
  popularity,
  is_featured,
  category_slug,
  collection_slug,
  created_at
)
INNER JOIN categories c ON c.slug = v.category_slug
INNER JOIN collections col ON col.slug = v.collection_slug
ON CONFLICT (slug) DO UPDATE SET
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  tag = EXCLUDED.tag,
  product_type = EXCLUDED.product_type,
  available = EXCLUDED.available,
  stock_quantity = EXCLUDED.stock_quantity,
  popularity = EXCLUDED.popularity,
  is_featured = EXCLUDED.is_featured,
  category_id = EXCLUDED.category_id,
  collection_id = EXCLUDED.collection_id,
  created_at = EXCLUDED.created_at;

-- =========================================================
-- COMBOS
-- =========================================================

INSERT INTO combos (
  code,
  name,
  slug,
  description,
  price,
  image_url,
  tag,
  available,
  stock_quantity,
  popularity,
  is_featured,
  created_at
)
VALUES
(
  'c1',
  'Combo Escenario Legendario',
  'combo-escenario-legendario',
  'Paquete de colección con TM Opera O, Agnes Tachyon y Jungle Pocket. Una mezcla de teatro, ciencia inquieta y espíritu competitivo para una vitrina con pura presencia.',
  455000,
  '/images/combos/combo-escenario-legendario.jpg',
  'Combo Premium',
  TRUE,
  6,
  98,
  TRUE,
  '2026-05-18'
),
(
  'c2',
  'Combo Mareas Frías',
  'combo-mareas-frias',
  'Paquete con Ellen Joe y Yidhari Murphy. Dos piezas de energía fría, elegante y marina, perfectas para una colección con misterio, calma y profundidad.',
  285000,
  '/images/combos/combo-mareas-frias.jpg',
  'Dúo Especial',
  TRUE,
  8,
  95,
  TRUE,
  '2026-05-18'
),
(
  'c3',
  'Combo Equipo Travieso',
  'combo-equipo-travieso',
  'Paquete con Nicole Demara, Amby Demara y Nekomata. Un trío carismático, urbano y lleno de personalidad para quienes aman las vitrinas con actitud.',
  430000,
  '/images/combos/combo-equipo-travieso.jpg',
  'Más vendido',
  TRUE,
  7,
  93,
  TRUE,
  '2026-05-18'
),
(
  'c4',
  'Combo Atelier Elegante',
  'combo-atelier-elegante',
  'Paquete con Zhu Yuan, Jane Doe y Grace Howard. Tres piezas de presencia firme, misterio sutil y acabado técnico para una colección sobria y poderosa.',
  465000,
  '/images/combos/combo-atelier-elegante.jpg',
  'Edición Limitada',
  TRUE,
  4,
  91,
  FALSE,
  '2026-05-18'
),
(
  'c5',
  'Combo Mini Icons',
  'combo-mini-icons',
  'Set de tres mini muñecas tipo llavero: TM Opera O, Burnice White y Ellen Joe. Ideal para regalar o llevar pequeños guiños de colección a todas partes.',
  175000,
  '/images/combos/combo-mini-icons.jpg',
  'Mini Set',
  TRUE,
  12,
  97,
  TRUE,
  '2026-05-18'
),
(
  'c6',
  'Combo Nitro White',
  'combo-nitro-white',
  'Paquete con Burnice White y su cóctel Nitro-Fuel decorativo. Una dupla luminosa, energética y perfecta para vitrinas con chispa nocturna.',
  205000,
  '/images/combos/combo-nitro-white.jpg',
  'Nuevo',
  TRUE,
  10,
  94,
  FALSE,
  '2026-05-18'
)
ON CONFLICT (slug) DO UPDATE SET
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  tag = EXCLUDED.tag,
  available = EXCLUDED.available,
  stock_quantity = EXCLUDED.stock_quantity,
  popularity = EXCLUDED.popularity,
  is_featured = EXCLUDED.is_featured,
  created_at = EXCLUDED.created_at;

-- =========================================================
-- ITEMS DE COMBOS
-- =========================================================

INSERT INTO combo_items (combo_id, product_id, quantity)
SELECT combo.id, product.id, 1
FROM combos combo
JOIN dolls product ON product.slug IN ('tm-opera-o', 'agnes-tachyon', 'jungle-pocket')
WHERE combo.slug = 'combo-escenario-legendario'
ON CONFLICT (combo_id, product_id) DO UPDATE SET
  quantity = EXCLUDED.quantity;

INSERT INTO combo_items (combo_id, product_id, quantity)
SELECT combo.id, product.id, 1
FROM combos combo
JOIN dolls product ON product.slug IN ('ellen-joe', 'yidhari-murphy')
WHERE combo.slug = 'combo-mareas-frias'
ON CONFLICT (combo_id, product_id) DO UPDATE SET
  quantity = EXCLUDED.quantity;

INSERT INTO combo_items (combo_id, product_id, quantity)
SELECT combo.id, product.id, 1
FROM combos combo
JOIN dolls product ON product.slug IN ('nicole-demara', 'amby-demara', 'nekomata')
WHERE combo.slug = 'combo-equipo-travieso'
ON CONFLICT (combo_id, product_id) DO UPDATE SET
  quantity = EXCLUDED.quantity;

INSERT INTO combo_items (combo_id, product_id, quantity)
SELECT combo.id, product.id, 1
FROM combos combo
JOIN dolls product ON product.slug IN ('zhu-yuan', 'jane-doe', 'grace-howard')
WHERE combo.slug = 'combo-atelier-elegante'
ON CONFLICT (combo_id, product_id) DO UPDATE SET
  quantity = EXCLUDED.quantity;

INSERT INTO combo_items (combo_id, product_id, quantity)
SELECT combo.id, product.id, 1
FROM combos combo
JOIN dolls product ON product.slug IN (
  'llavero-mini-tm-opera-o',
  'llavero-mini-burnice-white',
  'llavero-mini-ellen-joe'
)
WHERE combo.slug = 'combo-mini-icons'
ON CONFLICT (combo_id, product_id) DO UPDATE SET
  quantity = EXCLUDED.quantity;

INSERT INTO combo_items (combo_id, product_id, quantity)
SELECT combo.id, product.id, 1
FROM combos combo
JOIN dolls product ON product.slug IN ('burnice-white', 'coctel-nitro-fuel-decorativo')
WHERE combo.slug = 'combo-nitro-white'
ON CONFLICT (combo_id, product_id) DO UPDATE SET
  quantity = EXCLUDED.quantity;

COMMIT;
