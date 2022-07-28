
-- ---
-- Table 'Products'
--
-- ---

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id SERIAL NOT NULL,
  campus VARCHAR(50) DEFAULT NULL,
  name VARCHAR(50) DEFAULT NULL,
  slogan VARCHAR(150) DEFAULT NULL,
  description VARCHAR(500) DEFAULT NULL,
  category VARCHAR(50) DEFAULT NULL,
  default_price INTEGER DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NULL,
  updated_at TIMESTAMPTZ DEFAULT NULL,
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
  feature_id SERIAL NOT NULL,
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

ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (product_id);

-- ---
-- Table 'Styles'
--
-- ---

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  style_id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR DEFAULT NULL,
  original_price INTEGER DEFAULT NULL,
  sale_price INTEGER DEFAULT NULL,
  default_style BOOLEAN DEFAULT NULL,
  PRIMARY KEY (style_id)
);

COPY styles (style_id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/ibraheemazam/Downloads/SDCdata/styles.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (product_id);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  photo_id SERIAL NOT NULL,
  style_id INTEGER NOT NULL,
  thumbnail_url VARCHAR DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (photo_id)
);

COPY photos (photo_id, style_id, url, thumbnail_url)
FROM '/Users/ibraheemazam/Downloads/SDCdata/photos.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

UPDATE photos
SET thumbnail_url = null
WHERE LENGTH(thumbnail_url) > 2048;

ALTER TABLE photos
  ALTER column url TYPE VARCHAR(2048),
  ALTER column thumbnail_url TYPE VARCHAR(2048);

ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  sku_id SERIAL NOT NULL,
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

ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);

-- ---
-- Table 'Related Product'
--
-- ---

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  related_id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  related_product_id INTEGER DEFAULT NULL,
  PRIMARY KEY (related_id)
);

COPY related (related_id, product_id, related_product_id)
FROM '/Users/ibraheemazam/Downloads/SDCdata/related.csv'
WITH DELIMITER ','
CSV HEADER
NULL 'null';

ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES products (product_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Related Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Products` (`product_id`,`campus`,`name`,`slogan`,`description`,`category`,`default_price`,`created_at`,`updated_at`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `Features` (`product_id`,`feature`,`value`) VALUES
-- ('','','');
-- INSERT INTO `Styles` (`product_id`,`style_id`,`name`,`original_price`,`sale_price`,`default?`) VALUES
-- ('','','','','','');
-- INSERT INTO `Related Product` (`product_id`,`related_product_id`) VALUES
-- ('','');
-- INSERT INTO `photos` (`product_id`,`thumbnail_url`,`url`,`style_id`) VALUES
-- ('','','','');
-- INSERT INTO `skus` (`style_id`,`sku_id`,`quantity`,`size`,`product_id`) VALUES
-- ('','','','','');