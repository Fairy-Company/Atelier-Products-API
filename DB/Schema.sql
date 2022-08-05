
-- ---
-- Table 'Products'
--
-- ---

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id INTEGER NOT NULL,
  campus VARCHAR(50) DEFAULT 'hr-rfp',
  name VARCHAR(50) DEFAULT NULL,
  slogan VARCHAR(150) DEFAULT NULL,
  description VARCHAR(500) DEFAULT NULL,
  category VARCHAR(50) DEFAULT NULL,
  default_price MONEY DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (product_id)
);

COPY products (product_id, name, slogan, description, category, default_price)
FROM '/Users/ibraheemazam/Downloads/SDCdata/product.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

-- ---
-- Table 'Features'
--
-- ---

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  feature_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  feature VARCHAR DEFAULT NULL,
  value VARCHAR DEFAULT NULL,
  PRIMARY KEY (feature_id)
);

COPY features (feature_id, product_id, feature, value)
FROM '/Users/ibraheemazam/Downloads/SDCdata/features.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

-- ---
-- Table 'Styles'
--
-- ---

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  style_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR DEFAULT NULL,
  original_price MONEY DEFAULT NULL,
  sale_price MONEY DEFAULT NULL,
  default_style BOOLEAN DEFAULT NULL,
  PRIMARY KEY (style_id)
);

COPY styles (style_id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/ibraheemazam/Downloads/SDCdata/styles.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  photo_id INTEGER NOT NULL,
  style_id INTEGER NOT NULL,
  thumbnail_url VARCHAR(250) DEFAULT NULL,
  url VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (photo_id)
);

COPY photos (photo_id, style_id, url, thumbnail_url)
FROM '/Users/ibraheemazam/Downloads/SDCdata/photoscopy.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

-- ALTER TABLE photoscopy
--   ALTER column url TYPE VARCHAR(250),
--   ALTER column thumbnail_url TYPE VARCHAR(250);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  sku_id INTEGER NOT NULL,
  style_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT NULL,
  size VARCHAR DEFAULT NULL,
  PRIMARY KEY (sku_id)
);

COPY skus (sku_id, style_id, size, quantity)
FROM '/Users/ibraheemazam/Downloads/SDCdata/skus.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

-- ---
-- Table 'Related Product'
--
-- ---

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  related_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  related_product_id INTEGER DEFAULT NULL,
  PRIMARY KEY (related_id)
);

COPY related (related_id, product_id, related_product_id)
FROM '/Users/ibraheemazam/Downloads/SDCdata/related.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

-- ---
-- Foreign keys
-- ---

ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);
ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);
ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES products (product_id);

-- select photo_id from photos where length(thumbnail_url) > 2048;
-- select photo_id from photoscopy where length(thumbnail_url) > 2048;

--       48
--       263
--       282
--       304
--       326

-- select thumbnail_url from photos where photo_id = 48;

-- UPDATE products
-- SET default_price = (default_price::numeric);

-- SELECT p.product_id, p.campus, f.feature, f.value
--     FROM products p
--     JOIN features f
--     ON p.product_id = f.product_id
--     LIMIT 3;