CREATE SCHEMA `dataWare_test` ;
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