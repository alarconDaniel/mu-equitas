-- =========================================================
-- MUÑEQUITAS - 01_schema.sql
-- Definición completa de la base de datos PostgreSQL
-- =========================================================
-- Nota:
-- Este script está pensado para entorno de desarrollo.
-- Si quieres reiniciar la base, deja activos los DROP.
-- En producción, manejar cambios mediante migraciones.
-- =========================================================

BEGIN;

-- =========================================================
-- EXTENSIONES
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- =========================================================
-- LIMPIEZA PARA DESARROLLO
-- =========================================================

DROP VIEW IF EXISTS combos_catalog_view;
DROP VIEW IF EXISTS dolls_catalog_view;

DROP TABLE IF EXISTS combo_items CASCADE;
DROP TABLE IF EXISTS combos CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS dolls CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

DROP FUNCTION IF EXISTS set_updated_at();

-- =========================================================
-- FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- =========================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================
-- TABLA: categories
-- Categorías del catálogo
-- =========================================================

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,

  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT categories_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT categories_slug_not_empty CHECK (char_length(trim(slug)) > 0),
  CONSTRAINT categories_display_order_valid CHECK (display_order >= 0)
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_display_order ON categories(display_order);

CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- TABLA: collections
-- Colecciones editoriales/comerciales del catálogo
-- =========================================================

CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,

  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT collections_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT collections_slug_not_empty CHECK (char_length(trim(slug)) > 0),
  CONSTRAINT collections_display_order_valid CHECK (display_order >= 0)
);

CREATE INDEX idx_collections_slug ON collections(slug);
CREATE INDEX idx_collections_active ON collections(is_active);
CREATE INDEX idx_collections_display_order ON collections(display_order);

CREATE TRIGGER trg_collections_updated_at
BEFORE UPDATE ON collections
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- TABLA: dolls
-- Productos principales del catálogo.
-- Se mantiene el nombre "dolls" para compatibilidad con el frontend,
-- pero product_type permite manejar muñecas, accesorios y llaveros.
-- =========================================================

CREATE TABLE dolls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  code VARCHAR(40) UNIQUE,

  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  description TEXT NOT NULL,

  price NUMERIC(12, 2) NOT NULL,
  image_url TEXT NOT NULL,

  tag VARCHAR(80),
  product_type VARCHAR(30) NOT NULL DEFAULT 'doll',

  available BOOLEAN NOT NULL DEFAULT TRUE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,

  popularity INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,

  category_id UUID NOT NULL,
  collection_id UUID NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_dolls_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_dolls_collection
    FOREIGN KEY (collection_id)
    REFERENCES collections(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT dolls_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT dolls_slug_not_empty CHECK (char_length(trim(slug)) > 0),
  CONSTRAINT dolls_description_not_empty CHECK (char_length(trim(description)) > 0),
  CONSTRAINT dolls_price_positive CHECK (price >= 0),
  CONSTRAINT dolls_stock_quantity_valid CHECK (stock_quantity >= 0),
  CONSTRAINT dolls_popularity_positive CHECK (popularity >= 0),
  CONSTRAINT dolls_product_type_valid CHECK (product_type IN ('doll', 'accessory', 'keychain'))
);

CREATE INDEX idx_dolls_code ON dolls(code);
CREATE INDEX idx_dolls_slug ON dolls(slug);
CREATE INDEX idx_dolls_category_id ON dolls(category_id);
CREATE INDEX idx_dolls_collection_id ON dolls(collection_id);
CREATE INDEX idx_dolls_product_type ON dolls(product_type);
CREATE INDEX idx_dolls_available ON dolls(available);
CREATE INDEX idx_dolls_is_featured ON dolls(is_featured);
CREATE INDEX idx_dolls_price ON dolls(price);
CREATE INDEX idx_dolls_popularity ON dolls(popularity);
CREATE INDEX idx_dolls_created_at ON dolls(created_at);

CREATE INDEX idx_dolls_search
ON dolls USING gin (
  to_tsvector(
    'spanish',
    coalesce(name, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(tag, '')
  )
);

CREATE TRIGGER trg_dolls_updated_at
BEFORE UPDATE ON dolls
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- TABLA: combos
-- Paquetes de productos coherentes por temática
-- =========================================================

CREATE TABLE combos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  code VARCHAR(40) UNIQUE,

  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  description TEXT NOT NULL,

  price NUMERIC(12, 2) NOT NULL,
  image_url TEXT NOT NULL,

  tag VARCHAR(80),
  available BOOLEAN NOT NULL DEFAULT TRUE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,

  popularity INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT combos_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT combos_slug_not_empty CHECK (char_length(trim(slug)) > 0),
  CONSTRAINT combos_description_not_empty CHECK (char_length(trim(description)) > 0),
  CONSTRAINT combos_price_positive CHECK (price >= 0),
  CONSTRAINT combos_stock_quantity_valid CHECK (stock_quantity >= 0),
  CONSTRAINT combos_popularity_positive CHECK (popularity >= 0)
);

CREATE INDEX idx_combos_code ON combos(code);
CREATE INDEX idx_combos_slug ON combos(slug);
CREATE INDEX idx_combos_available ON combos(available);
CREATE INDEX idx_combos_is_featured ON combos(is_featured);
CREATE INDEX idx_combos_price ON combos(price);
CREATE INDEX idx_combos_popularity ON combos(popularity);
CREATE INDEX idx_combos_created_at ON combos(created_at);

CREATE INDEX idx_combos_search
ON combos USING gin (
  to_tsvector(
    'spanish',
    coalesce(name, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(tag, '')
  )
);

CREATE TRIGGER trg_combos_updated_at
BEFORE UPDATE ON combos
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- TABLA: combo_items
-- Relación muchos a muchos entre combos y productos
-- =========================================================

CREATE TABLE combo_items (
  combo_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (combo_id, product_id),

  CONSTRAINT fk_combo_items_combo
    FOREIGN KEY (combo_id)
    REFERENCES combos(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_combo_items_product
    FOREIGN KEY (product_id)
    REFERENCES dolls(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT combo_items_quantity_positive CHECK (quantity > 0)
);

CREATE INDEX idx_combo_items_combo_id ON combo_items(combo_id);
CREATE INDEX idx_combo_items_product_id ON combo_items(product_id);

-- =========================================================
-- TABLA: newsletter_subscribers
-- Personas suscritas al newsletter
-- =========================================================

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  email CITEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT newsletter_email_not_empty CHECK (char_length(trim(email::TEXT)) > 0),
  CONSTRAINT newsletter_email_format CHECK (
    email::TEXT ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active);

-- =========================================================
-- TABLA: contact_messages
-- Mensajes enviados desde contacto
-- =========================================================

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(120) NOT NULL,
  email CITEXT NOT NULL,
  subject VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,

  status VARCHAR(40) NOT NULL DEFAULT 'pending',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT contact_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT contact_subject_not_empty CHECK (char_length(trim(subject)) > 0),
  CONSTRAINT contact_message_not_empty CHECK (char_length(trim(message)) > 0),
  CONSTRAINT contact_email_format CHECK (
    email::TEXT ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  ),
  CONSTRAINT contact_status_valid CHECK (
    status IN ('pending', 'read', 'answered', 'archived')
  )
);

CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- =========================================================
-- VISTA: dolls_catalog_view
-- Consulta lista para catálogo de productos
-- =========================================================

CREATE OR REPLACE VIEW dolls_catalog_view AS
SELECT
  d.id,
  d.code,
  d.name,
  d.slug,
  d.description,
  d.price,
  d.image_url,
  d.tag,
  d.product_type,
  d.available,
  d.stock_quantity,
  d.popularity,
  d.is_featured,
  d.created_at,
  d.updated_at,

  c.id AS category_id,
  c.name AS category_name,
  c.slug AS category_slug,

  col.id AS collection_id,
  col.name AS collection_name,
  col.slug AS collection_slug

FROM dolls d
INNER JOIN categories c ON d.category_id = c.id
INNER JOIN collections col ON d.collection_id = col.id;

-- =========================================================
-- VISTA: combos_catalog_view
-- Consulta lista para catálogo de combos con productos en JSON
-- =========================================================

CREATE OR REPLACE VIEW combos_catalog_view AS
SELECT
  combo.id,
  combo.code,
  combo.name,
  combo.slug,
  combo.description,
  combo.price,
  combo.image_url,
  combo.tag,
  combo.available,
  combo.stock_quantity,
  combo.popularity,
  combo.is_featured,
  combo.created_at,
  combo.updated_at,

  COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'id', product.id,
        'code', product.code,
        'name', product.name,
        'slug', product.slug,
        'price', product.price,
        'imageUrl', product.image_url,
        'productType', product.product_type,
        'categorySlug', category.slug,
        'collectionSlug', collection.slug,
        'quantity', item.quantity
      )
      ORDER BY product.name
    ) FILTER (WHERE product.id IS NOT NULL),
    '[]'::jsonb
  ) AS items

FROM combos combo
LEFT JOIN combo_items item ON item.combo_id = combo.id
LEFT JOIN dolls product ON product.id = item.product_id
LEFT JOIN categories category ON category.id = product.category_id
LEFT JOIN collections collection ON collection.id = product.collection_id
GROUP BY combo.id;

COMMIT;
