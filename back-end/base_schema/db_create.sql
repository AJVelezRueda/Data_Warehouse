CREATE SCHEMA `dataWare_db` ;
CREATE USER 'dataWare'@'localhost' IDENTIFIED BY 'D4T4IS@W3S0m3!i5N\'T1t?';
GRANT ALL PRIVILEGES ON dataWare_db.* TO 'dataWare'@'localhost' WITH GRANT OPTION;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `password_hash`  varchar(2056) NOT NULL,
  `username`  varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `regions`;

CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `regions_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`regions_id`) REFERENCES regions (id)
);


DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `countries_id` int NOT NULL,
  FOREIGN KEY (`countries_id`) REFERENCES countries (id),
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `adress` varchar(45) NOT NULL,
  `countries_id` int NOT NULL,
  FOREIGN KEY (`countries_id`) REFERENCES countries (id),
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contact_name`  varchar(100) NOT NULL,
  `contact_email` varchar(100) NOT NULL,
  `contact_adress` varchar(100) NOT NULL,
  `contact_phone` varchar(100) NOT NULL,
  `cities_id` int NOT NULL,
  FOREIGN KEY (`cities_id`) REFERENCES cities (id),
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `preferences`;
CREATE TABLE `preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `intrest` int NOT NULL,
  `channel` varchar(100) NOT NULL,
  `contacts_id` int NOT NULL,
  FOREIGN KEY (`contacts_id`) REFERENCES contacts (id),
  PRIMARY KEY (`id`)
);

