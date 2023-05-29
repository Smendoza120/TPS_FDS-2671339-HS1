-- Crear base de datos
CREATE DATABASE dbejemploUser;

-- Usar base de datos
USE dbejemploUser;

-- Crear tabla
CREATE TABLE user(
	user_code INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(150) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    user_pass VARCHAR(150) NOT NULL, 
	PRIMARY KEY(user_code)
)ENGINE = InnoDB;