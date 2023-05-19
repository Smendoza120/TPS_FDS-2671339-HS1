#Eliminar base de datos
DROP DATABASE marketsystem;

#Crear base de datos
CREATE DATABASE marketsystem;

#Usar base de datos
USE marketsystem;

#Creacion de tablas
CREATE TABLE rol(
  id_rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dueño VARCHAR(45) NOT NULL,
  trabajador VARCHAR(45) NOT NULL
);

CREATE TABLE usuario(
  id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(45) NOT NULL,
  correo_usuario VARCHAR(45) NOT NULL UNIQUE,
  contraseña VARCHAR(20) NOT NULL
);

#Se unen las 2 tablas, las cuales son rol y usuario
CREATE TABLE usuario_roles(
  id_usuario INT NULL,
  id_rol INT NULL,
  CONSTRAINT fk_rol
    FOREIGN KEY (id_rol) #Llave foranea rol (id_rol)
    REFERENCES rol (id_rol)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_usuario
    FOREIGN KEY (id_usuario) #Llave foranea usuario (id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

#Se conecta la tabla usuarios
CREATE TABLE cliente(
  id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  telefono INT(11) NOT NULL,
  id_usuario INT NULL, #Id de la tabla usuario
  CONSTRAINT fk_cliente_usuario
    FOREIGN KEY (id_usuario) #Llave foreanea usuario (id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

#Se conecta la tabla cliente
CREATE TABLE compras(
  id_compras INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha_compra DATE NOT NULL,
  cantidad_vendida FLOAT NOT NULL,
  id_cliente INT NULL, #Id de la tabla cliente
  CONSTRAINT fk_compras_cliente
    FOREIGN KEY (id_cliente) #Llave foreanea cliente (id_cliente)
    REFERENCES cliente (id_cliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

#Se conecta la tabla compras
CREATE TABLE factura(
  id_factura INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha_factura DATE NOT NULL,
  id_compras INT NULL, #Id de la tabla compras
  CONSTRAINT fk_factura_compras
    FOREIGN KEY (id_compras) #Llave foreanea compras (id_compras)
    REFERENCES compras (id_compras)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

#Se conecta la tabla compras
CREATE TABLE reporte_diario(
  id_reporte_diario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_compras INT NULL,
  CONSTRAINT fk_reporte_diario_compras
    FOREIGN KEY (id_compras) #Llave foranea id_compras
    REFERENCES compras (id_compras)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE producto(
  id_producto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  precio_unitario FLOAT NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  cantidad INT NOT NULL
);

#Se conecta con la tabla compras y con la tabla producto
CREATE TABLE detalle_compras(
  id_compras INT NULL, 
  id_producto INT NULL, 
  CONSTRAINT fk_detalle_compras
    FOREIGN KEY (id_compras) #Llave foranea id_compras
    REFERENCES compras (id_compras)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_detalle_producto
    FOREIGN KEY (id_producto) #Llave foranea id_producto
    REFERENCES producto (id_producto)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

#Se conecta con la tabla producto
CREATE TABLE inventario(
  id_inventario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  almacenamiento VARCHAR(50) NOT NULL,
  fecha_compra DATE NOT NULL,
  id_producto INT NULL, #Id de la tabla producto
  CONSTRAINT fk_inventario_producto
    FOREIGN KEY (id_producto) #Llave foranea id_producto
    REFERENCES producto (id_producto)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);