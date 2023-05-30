-- Delete database
DROP DATABASE market_system_bbdd;

-- Create database
CREATE SCHEMA  market_system_bbdd DEFAULT CHARACTER SET utf8 ;
USE market_system_bbdd ;

-- Create tables
CREATE TABLE  users (
  idusers INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  names VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  phone INT NOT NULL
  )
ENGINE = InnoDB;

CREATE TABLE  owner (
  idowner INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  passwords VARCHAR(50) NOT NULL,
  idusers INT NOT NULL,
  INDEX fk_owner_users1_idx (idusers ASC),
  CONSTRAINT fk_owner_users1
    FOREIGN KEY (idusers)
    REFERENCES users (idusers)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  permissions (
  idpermissions INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permission_sales TINYINT NULL,
  permissions_users TINYINT NULL,
  permission_inventories TINYINT NULL,
  permission_bill TINYINT NULL,
  idowner INT NOT NULL,
  INDEX fk_employee_owner1_idx (idowner ASC),
  CONSTRAINT fk_employee_owner1
    FOREIGN KEY (idowner)
    REFERENCES owner (idowner)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  employee (
  idemployee INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permissions TINYINT NULL,
  position VARCHAR(50) NOT NULL,
  idpermissions INT NOT NULL,
  INDEX fk_permissions_employee1_idx (idpermissions ASC),
  CONSTRAINT fk_permissions_permissions1
    FOREIGN KEY (idpermissions)
    REFERENCES permissions (idpermissions)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  customer (
  idcustomer INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  idusers INT NOT NULL,
  INDEX fk_customer_users1_idx (idusers ASC),
  CONSTRAINT fk_customer_users1
    FOREIGN KEY (idusers)
    REFERENCES users (idusers)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  bill (
  idbill INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  creation_date DATE NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  daily_report (
  iddaily_report INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  report_date DATE NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  inventory (
  idinventory INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  storage VARCHAR(45) NOT NULL,
  date_purchase DATE NOT NULL,
  unit_price FLOAT NOT NULL,
  due_date DATE NOT NULL,
  product VARCHAR(100) NOT NULL,
  quantity_products INT NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  sales (
  idsales INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity_sold INT NOT NULL,
  names_customer VARCHAR(100) NULL,
  product_sold VARCHAR(100) NOT NULL,
  idcustomer INT NOT NULL,
  idbill INT NOT NULL,
  iddaily_report INT NOT NULL,
  idinventory INT NOT NULL,
  INDEX fk_sales_customer1_idx (idcustomer ASC),
  INDEX fk_sales_bill1_idx (idbill ASC),
  INDEX fk_sales_daily_report1_idx (iddaily_report ASC),
  INDEX fk_sales_inventory1_idx (idinventory ASC),
  CONSTRAINT fk_sales_customer1
    FOREIGN KEY (idcustomer)
    REFERENCES customer (idcustomer)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_sales_bill1
    FOREIGN KEY (idbill)
    REFERENCES bill (idbill)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_sales_daily_report1
    FOREIGN KEY (iddaily_report)
    REFERENCES daily_report (iddaily_report)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_sales_inventory1
    FOREIGN KEY (idinventory)
    REFERENCES inventory (idinventory)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

