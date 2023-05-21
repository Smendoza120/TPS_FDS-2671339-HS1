CREATE TABLE usuarios(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR (100) NOT NULL,
email VARCHAR (80) NOT NULL UNIQUE,
telefono INT NOT NULL UNIQUE
);

CREATE TABLE trabajador (
id_trabajador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
permisos BOOLEAN NOT NULL,
id_usuario INT,
CONSTRAINT fk_usuarios_
    FOREIGN KEY (id_usuario) #Llave foranea a usuarios
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);







