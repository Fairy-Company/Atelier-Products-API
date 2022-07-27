-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Products'
--
-- ---

DROP TABLE IF EXISTS `Products`;

CREATE TABLE `Products` (
  `product_id` INTEGER NOT NULL AUTO_INCREMENT,
  `campus` VARCHAR DEFAULT NULL,
  `name` VARCHAR DEFAULT NULL,
  `slogan` TEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `category` VARCHAR DEFAULT NULL,
  `default_price` VARCHAR DEFAULT NULL,
  `created_at` TIMESTAMPTZ DEFAULT NULL,
  `updated_at` TIMESTAMPTZ DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

-- ---
-- Table 'Features'
--
-- ---

DROP TABLE IF EXISTS `Features`;

CREATE TABLE `Features` (
  `product_id` INTEGER NOT NULL,
  `feature` VARCHAR DEFAULT NULL,
  `value` VARCHAR DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

-- ---
-- Table 'Styles'
--
-- ---

DROP TABLE IF EXISTS `Styles`;

CREATE TABLE `Styles` (
  `product_id` INTEGER NOT NULL,
  `style_id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR DEFAULT NULL,
  `original_price` MONEY DEFAULT NULL,
  `sale_price` MONEY DEFAULT NULL,
  `default?` BOOLEAN DEFAULT NULL,
  PRIMARY KEY (`style_id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `product_id` INTEGER NOT NULL,
  `style_id` INTEGER NOT NULL,
  `thumbnail_url` VARCHAR DEFAULT NULL,
  `url` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`style_id`)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `sku_id` INTEGER NOT NULL AUTO_INCREMENT,
  `style_id` INTEGER NOT NULL,
  `quantity` INTEGER DEFAULT NULL,
  `size` VARCHAR DEFAULT NULL,
  `product_id` INTEGER NOT NULL,
  PRIMARY KEY (`sku_id`)
);

-- ---
-- Table 'Related Product'
--
-- ---

DROP TABLE IF EXISTS `Related Product`;

CREATE TABLE `Related Product` (
  `product_id` INTEGER NOT NULL,
  `related_product_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Products` ADD FOREIGN KEY (product_id) REFERENCES `Features` (`product_id`);
ALTER TABLE `Products` ADD FOREIGN KEY (product_id) REFERENCES `Styles` (`product_id`);
ALTER TABLE `Related Product` ADD FOREIGN KEY (product_id) REFERENCES `Products` (`product_id`);
ALTER TABLE `photos` ADD FOREIGN KEY (style_id) REFERENCES `Styles` (`style_id`);
ALTER TABLE `skus` ADD FOREIGN KEY (style_id) REFERENCES `Styles` (`style_id`);

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