# DROP DATABASE SISWEB_BBDD01;
-- -----------------------------------------------------
-- Estructura SISWEB_BBDD
-- -----------------------------------------------------
CREATE SCHEMA SISWEB_BBDD01 DEFAULT CHARACTER SET utf8 ;
USE SISWEB_BBDD01;

-- -----------------------------------------------------
-- Tabla CREDENTIALS
-- -----------------------------------------------------
CREATE TABLE CREDENTIALS (
  codigo_user VARCHAR(20) NOT NULL,
  pass_user VARCHAR(50) NOT NULL,
  PRIMARY KEY (codigo_user)
) ENGINE = InnoDB;

INSERT INTO CREDENTIALS VALUES 
("admin-123", "12345"),
("cliente-123", "87654");