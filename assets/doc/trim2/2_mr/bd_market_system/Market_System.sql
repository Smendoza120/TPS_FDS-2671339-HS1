#Eliminar base de datos
DROP DATABASE marketsystem;

#Crear base de datos
CREATE DATABASE marketsystem;

#Usar base de datos
USE marketsystem;

#Creacion de tablas
CREATE TABLE rol(
  id_rol INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE usuario(
  id_usuario INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  telefono VARCHAR(12) NOT NULL,
  correo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario_rol(
  id_rol INT(50) NULL,
  id_usuario INT(100) NULL,
  CONSTRAINT fk_ROL_usuario_rol
    FOREIGN KEY (id_rol)
    REFERENCES rol (id_rol)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_USUARIO_usuario_rol
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE propietario(
  id_propietario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contraseña VARCHAR(12) NOT NULL,
  id_usuario INT(100) NULL,
  CONSTRAINT fk_USUARIO_propietario
    FOREIGN KEY(id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE trabajador(
  id_trabajador INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permisos BOOLEAN NOT NULL,
  cargo VARCHAR(50),
  id_propietario INT(100) NULL,
  CONSTRAINT fk_PROPIETARIO_trabajador
    FOREIGN KEY(id_propietario)
    REFERENCES propietario (id_propietario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE permisos(
  id_permisos INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permiso_ventas BOOLEAN NOT NULL,
  permisos_usuarios BOOLEAN NOT NULL,
  permisos_inventario BOOLEAN NOT NULL,
  permisos_factura BOOLEAN NOT NULL,
  id_trabajador INT(100) NULL,
  CONSTRAINT fk_TRABAJADOR_permisos
    FOREIGN KEY (id_trabajador)
    REFERENCES trabajador (id_trabajador)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE cliente(
  id_cliente INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT(100) NULL,
  CONSTRAINT fk_USUARIO_cliente
    FOREIGN KEY(id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE factura(
  id_factura INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha_creacion DATE NOT NULL
);

CREATE TABLE inventario(
  id_inventario INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  almacenamiento VARCHAR(50),
  precio_unitario FLOAT NOT NULL,
  fecha_compra DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  producto VARCHAR(100),
  cantidad_productos INT
);

CREATE TABLE reporte_diario_venta(
  id_reporte_diario INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha_reporte DATE NOT NULL
);

CREATE TABLE ventas(
  id_venta INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cantidad_vendida INT NOT NULL, 
  nombre_cliente VARCHAR(50),
  producto_vendido VARCHAR(50),
  id_cliente INT(100) NULL, 
  id_factura INT(100) NULL,
  id_inventario INT(100) NULL, 
  id_reporte_diario INT(100),
  CONSTRAINT fk_CLIENTE_ventas
    FOREIGN KEY(id_cliente)
    REFERENCES cliente (id_cliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_FACTURA_ventas
    FOREIGN KEY(id_factura)
    REFERENCES factura (id_factura)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_INVENTARIO_ventas
    FOREIGN KEY(id_inventario)
    REFERENCES inventario (id_inventario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_REPORTE_DIARIO_ventas
    FOREIGN KEY(id_reporte_diario)
    REFERENCES reporte_diario_venta (id_reporte_diario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);