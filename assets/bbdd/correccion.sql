CREATE SCHEMA IF NOT EXISTS mydb DEFAULT CHARACTER SET utf8 ;
USE mydb ;

-- -----------------------------------------------------
-- Table ROL X
-- -----------------------------------------------------
CREATE TABLE ROL (
  id_rol INT NOT NULL AUTO_INCREMENT,
  dueño VARCHAR(45) NOT NULL,
  trabajador VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_rol))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table USUARIO X
-- -----------------------------------------------------
CREATE TABLE USUARIO (
  id_rol INT NOT NULL,
  Id_usuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  contraseña VARCHAR(20) NOT NULL,
  PRIMARY KEY (Id_usuario),
  UNIQUE INDEX correo_UNIQUE (correo),
  UNIQUE INDEX contraseña_UNIQUE (contraseña),
  INDEX ind_usuario_rol (Id_usuario)
) ENGINE = InnoDB;

drop table USUARIO_ROLES;


-- -----------------------------------------------------
-- Table USUARIO_ROLES X
-- -----------------------------------------------------
CREATE TABLE USUARIO_ROLES (
  id_usuario INT NULL,
  id_rol INT NULL,
  CONSTRAINT fk_usuario_roles_usuario
	FOREIGN KEY (id_usuario)
    REFERENCES mydb.USUARIO (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_usuario_roles_rol
	FOREIGN KEY (id_rol)
    REFERENCES mydb.ROL (id_rol)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table CLIENTE X
-- -----------------------------------------------------
CREATE TABLE CLIENTE (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  telefono INT NOT NULL,
  USUARIO_Id_usuario INT NOT NULL,
  PRIMARY KEY (id_cliente),
  INDEX fk_CLIENTE_USUARIO1_idx (USUARIO_Id_usuario),
  CONSTRAINT fk_CLIENTE_USUARIO1
    FOREIGN KEY (USUARIO_Id_usuario)
    REFERENCES mydb.USUARIO (Id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table FACTURA X
-- -----------------------------------------------------
CREATE TABLE FACTURA (
  id_factura INT NOT NULL AUTO_INCREMENT,
  fecha DATE NOT NULL,
  CLIENTE_id_cliente INT NOT NULL,
  PRIMARY KEY (id_factura, CLIENTE_id_cliente),
  INDEX fk_FACTURA_CLIENTE1_idx (CLIENTE_id_cliente ASC),
  CONSTRAINT fk_factura_cliente
    FOREIGN KEY (CLIENTE_id_cliente)
    REFERENCES mydb.CLIENTE (id_cliente)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table REPORTE_DIARIO_COMPRA X
-- -----------------------------------------------------
CREATE TABLE REPORTE_DIARIO_COMPRA (
  id_reporte_diario INT NOT NULL AUTO_INCREMENT,
  fecha_reporte DATE NOT NULL,
  PRIMARY KEY (id_reporte_diario))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table INVENTARIO
-- -----------------------------------------------------
CREATE TABLE INVENTARIO (
  id_inventario INT NOT NULL AUTO_INCREMENT,
  almacenamiento VARCHAR(50) NOT NULL,
  fecha_compra DATE NOT NULL,
  PRIMARY KEY (id_inventario))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table PRODUCTO
-- -----------------------------------------------------
CREATE TABLE PRODUCTO (
  id_producto INT NOT NULL AUTO_INCREMENT,
  precio_unitario DOUBLE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  cantidad INT NOT NULL,
  REPORTE_DIARIO_COMPRA_id_reporte_diario INT NOT NULL,
  INVENTARIO_id_inventario INT NOT NULL,
  FACTURA_id_factura INT NOT NULL,
  PRIMARY KEY (id_producto, REPORTE_DIARIO_COMPRA_id_reporte_diario,INVENTARIO_id_inventario, FACTURA_id_factura),
  INDEX fk_PRODUCTO_REPORTE_DIARIO_COMPRA_idx (REPORTE_DIARIO_COMPRA_id_reporte_diario ASC) ,
  INDEX fk_PRODUCTO_INVENTARIO1_idx (INVENTARIO_id_inventario ASC) ,
  INDEX fk_PRODUCTO_FACTURA1_idx (FACTURA_id_factura ASC) ,
  CONSTRAINT fk_PRODUCTO_REPORTE_DIARIO_COMPRA
    FOREIGN KEY (REPORTE_DIARIO_COMPRA_id_reporte_diario)
    REFERENCES mydb.REPORTE_DIARIO_COMPRA (id_reporte_diario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PRODUCTO_INVENTARIO1
    FOREIGN KEY (INVENTARIO_id_inventario)
    REFERENCES mydb.INVENTARIO (id_inventario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PRODUCTO_FACTURA1
    FOREIGN KEY (FACTURA_id_factura)
    REFERENCES mydb.FACTURA (id_factura)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;