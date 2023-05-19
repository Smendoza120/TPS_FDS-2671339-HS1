-- Eliminar base de datos
DROP DATABASE marketsystem;

-- Crear base de datos
CREATE DATABASE  marketsystem;

-- Usar base de datos
USE marketsystem;

-- Creacion de tablas
-- Primer grupo TABLAS DE ROLES
CREATE TABLE rol(
  id_rol INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  dueño VARCHAR(45) NOT NULL,
  trabajador VARCHAR(45) NOT NULL
);

CREATE TABLE usuario(
  id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_usuario VARCHAR(45) NOT NULL,
  correo_usuario VARCHAR(45) NOT NULL UNIQUE,
  contraseña_usuario VARCHAR(20) NOT NULL 
);

CREATE TABLE permisos_usuarios_roles(
  id_rol INT NULL,
  id_usuario INT NULL,
  CONSTRAINT fk_rol_permisos_usuarios_roles
    FOREIGN KEY (id_rol)
    REFERENCES rol (id_rol)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_usuario_permisos_usuarios_roles
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Segundo grupo TABLAS DE LA TIENDA
CREATE TABLE cliente(
  id_cliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  telefono INT NOT NULL
);

CREATE TABLE factura(
  id_factura INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fecha_factura DATE NOT NULL,
  id_cliente INT NULL,
  CONSTRAINT fk_cliente_factura
    FOREIGN KEY (id_cliente)
    REFERENCES cliente (id_cliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE reporte_diario(
  id_reporte_diario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fecha_reporte DATE NOT NULL
);

CREATE TABLE compras(
  id_compra INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fecha_compra DATE NOT NULL,
  cantidad_vendidad FLOAT NOT NULL,
  id_factura INT NULL,
  id_reporte_diario INT NULL,
  CONSTRAINT fk_factura_compras
    FOREIGN KEY (id_factura)
    REFERENCES factura (id_factura)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_reporte_diario_compras
    FOREIGN KEY (id_reporte_diario)
    REFERENCES reporte_diario (id_reporte_diario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE inventario(
  id_inventario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  almacenamiento VARCHAR(50) NOT NULL,
  fecha_compra DATE NOT NULL
);

CREATE TABLE producto(
  id_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  precio_unitario FLOAT NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  cantidad INT NOT NULL,
  id_inventario INT NULL,
  CONSTRAINT fk_inventario_producto
    FOREIGN KEY(id_inventario)
    REFERENCES inventario (id_inventario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE detalle_compras(
  id_compra INT NULL,
  id_producto INT NULL,
  CONSTRAINT fk_compras_detalle_compras
    FOREIGN KEY(id_compra)
    REFERENCES compras (id_compra)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_producto_detalle_compras
    FOREIGN KEY(id_producto)
    REFERENCES producto (id_producto)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
