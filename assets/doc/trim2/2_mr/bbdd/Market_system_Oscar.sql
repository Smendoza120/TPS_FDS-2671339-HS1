drop database market_system_oscar_3;
CREATE SCHEMA  Market_system_oscar_3 DEFAULT CHARACTER SET utf8 ;
USE Market_system_oscar_3 ;

CREATE TABLE  usuarios (
  idusuarios INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono INT NOT NULL
  )
ENGINE = InnoDB;

CREATE TABLE  propietario (
  idpropietario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contraseña VARCHAR(50) NOT NULL,
  idusuarios INT NOT NULL,
  INDEX fk_propietario_usuarios1_idx (idusuarios ASC),
  CONSTRAINT fk_propietario_usuarios1
    FOREIGN KEY (idusuarios)
    REFERENCES usuarios (idusuarios)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  permisos (
  idpermisos INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permiso_ventas TINYINT NULL,
  permisos_usuarios TINYINT NULL,
  permiso_inventarios TINYINT NULL,
  permiso_factura TINYINT NULL,
  idpropietario INT NOT NULL,
  INDEX fk_trabjador_propietario1_idx (idpropietario ASC),
  CONSTRAINT fk_trabjador_propietario1
    FOREIGN KEY (idpropietario)
    REFERENCES propietario (idpropietario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

CREATE TABLE  trabajador (
  idtrabjador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permisos TINYINT NULL,
  cargo VARCHAR(50) NOT NULL,
  idpermisos INT NULL,
  INDEX fk_trabajador_permisos_idx (idpermisos ASC),
  CONSTRAINT fk_permisos_peridpermisos1
    FOREIGN KEY (idpermisos)
    REFERENCES permisos (idpermisos)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE = InnoDB;

CREATE TABLE  cliente (
  idcliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  idusuarios INT NOT NULL,
  INDEX fk_cliente_usuarios1_idx (idusuarios ASC),
  CONSTRAINT fk_cliente_usuarios1
    FOREIGN KEY (idusuarios)
    REFERENCES usuarios (idusuarios)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  factura (
  idfactura INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha_creacion DATE NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  reporte_diario (
  idreporte_diario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha_reporte DATE NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  inventario (
  idinventario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  almacenamiento VARCHAR(45) NOT NULL,
  fecha_compra DATE NOT NULL,
  precio_unitario FLOAT NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  producto VARCHAR(100) NOT NULL,
  cantidad_productos INT NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  ventas (
  idventas INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cantidad_vendida INT NOT NULL,
  nombre_cliente VARCHAR(100) NULL,
  producto_vendido VARCHAR(100) NOT NULL,
  idcliente INT NOT NULL,
  idfactura INT NOT NULL,
  idreporte_diario INT NOT NULL,
  idinventario INT NOT NULL,
  INDEX fk_ventas_cliente1_idx (idcliente ASC),
  INDEX fk_ventas_factura1_idx (idfactura ASC),
  INDEX fk_ventas_reporte_diario1_idx (idreporte_diario ASC),
  INDEX fk_ventas_inventario1_idx (idinventario ASC),
  CONSTRAINT fk_ventas_cliente1
    FOREIGN KEY (idcliente)
    REFERENCES cliente (idcliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_ventas_factura1
    FOREIGN KEY (idfactura)
    REFERENCES factura (idfactura)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_ventas_reporte_diario1
    FOREIGN KEY (idreporte_diario)
    REFERENCES reporte_diario (idreporte_diario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_ventas_inventario1
    FOREIGN KEY (idinventario)
    REFERENCES inventario (idinventario)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

#DROP DATABASE market_system_oscar_3;