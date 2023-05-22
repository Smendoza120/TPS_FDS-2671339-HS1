

CREATE DATABASE market_system default character set utf8;
USE market_system;


CREATE TABLE rol(
id_rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE usuarios(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
correo VARCHAR(100) NOT NULL,
telefono FLOAT NOT NULL
);

CREATE TABLE usuarios_Rol(
id_usuario INT NULL,
id_rol INT NULL,
CONSTRAINT fk_usuario_rol
	foreign key (id_usuario)
    references usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
CONSTRAINT fk_rol_usuarios
	foreign key (id_rol)
    references Rol (id_rol)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE propietario (
	id_propietario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    contraseña VARCHAR(50)NOT NULL,
    id_usuario INT NULL,
    CONSTRAINT fk_propietario_usuario
		FOREIGN KEY (id_usuario)
        REFERENCES usuarios (id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE trabajador (
id_trabajador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
permisos BOOLEAN,
cargo VARCHAR(50) NOT NULL,
id_propietario INT NULL,
CONSTRAINT fk_trabajador_propietario
FOREIGN KEY (id_propietario)
REFERENCES propietario (id_propietario)
ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE cliente (
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NULL
);




