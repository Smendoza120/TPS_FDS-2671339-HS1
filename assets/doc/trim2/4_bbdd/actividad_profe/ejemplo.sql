-- Eliminar base de datos
DROP DATABASE dbejemploUser;

-- Crear base de datos
CREATE DATABASE DBEJEMPLOUSER DEFAULT CHARACTER SET utf8 ;

-- Usar base de datos
USE DBEJEMPLOUSER ;

-- Crear tabla

CREATE TABLE ROLES (
  rol_code INT NOT NULL AUTO_INCREMENT,
  rol_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (rol_code)
) ENGINE = InnoDB;


CREATE TABLE USERS (
  rol_code INT NOT NULL,
  user_code VARCHAR(100) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  user_lastname VARCHAR(50) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_pass VARCHAR(150) NOT NULL,
  user_status TINYINT NOT NULL,
  PRIMARY KEY (user_code),
  INDEX ind_user_rol (rol_code ASC),
  CONSTRAINT fk_user_rol
    FOREIGN KEY (rol_code)
    REFERENCES ROLES (rol_code)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;