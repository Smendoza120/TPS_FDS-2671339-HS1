-- Delete database
DROP DATABASE market_system_bbdd;

-- Create database
CREATE SCHEMA  market_system_bbdd DEFAULT CHARACTER SET utf8 ;
USE market_system_bbdd ;

-- Create tables
CREATE TABLE  users (
  idusers INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  names VARCHAR(100) NOT NULL,
  mail VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL  -- Dejarlo en varchar
) ENGINE = InnoDB;

CREATE TABLE  owner (
  idowner INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  passwords VARCHAR(50) NOT NULL,
  idusers INT NULL,
  INDEX fk_owner_users1_idx (idusers ASC),
  CONSTRAINT fk_owner_users1
    FOREIGN KEY (idusers)
    REFERENCES users (idusers)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE  permissions (
  idpermissions INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permission_sales TINYINT NULL,
  permissions_users TINYINT NULL,
  permission_inventories TINYINT NULL,
  permission_bill TINYINT NULL,
  idowner INT NULL,
  INDEX fk_employee_owner1_idx (idowner ASC),
  CONSTRAINT fk_employee_owner1
    FOREIGN KEY (idowner)
    REFERENCES owner (idowner)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE  employee (
  idemployee INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permissions TINYINT NOT NULL,
  position VARCHAR(50) NOT NULL,
  idpermissions INT NULL,
  INDEX fk_permissions_employee1_idx (idpermissions ASC),
  CONSTRAINT fk_permissions_permissions1
    FOREIGN KEY (idpermissions)
    REFERENCES permissions (idpermissions)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE  customer (
  idcustomer INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  idusers INT NULL,
  INDEX fk_customer_users1_idx (idusers ASC),
  CONSTRAINT fk_customer_users1
    FOREIGN KEY (idusers)
    REFERENCES users (idusers)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE  bill (
  idbill INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  creation_date DATE NOT NULL
) ENGINE = InnoDB;

CREATE TABLE  daily_report (
  iddaily_report INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  report_date DATE NOT NULL
) ENGINE = InnoDB;

CREATE TABLE  inventory (
  idinventory INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  storage VARCHAR(45) NOT NULL,
  date_purchase DATE NOT NULL,
  unit_price FLOAT NOT NULL,
  due_date DATE NOT NULL,
  product VARCHAR(100) NOT NULL,
  quantity_products INT NOT NULL
) ENGINE = InnoDB;

CREATE TABLE  sales (
  idsales INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity_sold INT NOT NULL,
  names_customer VARCHAR(100) NULL,
  product_sold VARCHAR(100) NOT NULL,
  idcustomer INT NULL,
  idbill INT NULL,
  iddaily_report INT NULL,
  idinventory INT NULL,
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
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Create data
INSERT INTO users (names, mail, phone) 
values  ('Harold Sanchez', 'sanchezharold13@gmail.com', '3118047047'),
        ('Maria Novoa', 'maria.novoa@gmail.com', '3212030732'),
        ('Jean Pierre', 'jp1234@gmail.com', '3118057485'),
        ('Oscar Aguirre', 'oscar.aguirre@gmail.com', '3223142717'),
        ('Catalina Chavez', 'cata.chavez@gmail.com', '3005303532');

INSERT INTO owner (passwords) 
values  ('1234'),
        ('1234'),
        ('1234'),
        ('1234'),
        ('1234');

INSERT INTO permissions (permission_sales, permissions_users, permission_inventories, permission_bill) 
values  (true, true, true, true), 
        (true, true, true, true),
        (true, true, true, true),
        (true, true, true, true),
        (true, true, true, true);

INSERT INTO employee (permissions ,position) 
values  (true, 'contador'),
        (true, 'empacador'),
        (true, 'cajero'),
        (true, 'repartidor'),
        (true, 'administrador');

INSERT INTO bill (creation_date) 
values  (STR_TO_DATE('30/05/2023', '%d/%m/%Y')),
        (STR_TO_DATE('28/05/2023', '%d/%m/%Y')),
        (STR_TO_DATE('29/05/2023', '%d/%m/%Y'));

INSERT INTO daily_report (report_date) VALUES (STR_TO_DATE('30/05/2023', '%d/%m/%Y'));

INSERT INTO inventory (storage, date_purchase, unit_price, due_date, product, quantity_products) 
VALUES  ('Tienda', STR_TO_DATE('30/06/2023', '%d/%m/%Y'), 1.500, STR_TO_DATE('30/11/2023', '%d/%m/%Y'), 'Chocolatina', 5),
        ('Almacen', STR_TO_DATE('30/06/2023', '%d/%m/%Y'), 2.500, STR_TO_DATE('30/11/2023', '%d/%m/%Y'), 'Doritos', 7),
        ('Tienda', STR_TO_DATE('30/06/2023', '%d/%m/%Y'), 2.500, STR_TO_DATE('30/11/2023', '%d/%m/%Y'), 'Chetos', 8),
        ('Almacen', STR_TO_DATE('30/06/2023', '%d/%m/%Y'), 2.000, STR_TO_DATE('30/11/2023', '%d/%m/%Y'), 'Helado crema', 10),
        ('Tienda', STR_TO_DATE('30/06/2023', '%d/%m/%Y'), 12.000, STR_TO_DATE('30/11/2023', '%d/%m/%Y'), 'Six pack poker', 6);

INSERT INTO sales (quantity_sold, names_customer, product_sold) 
VALUES  (1, 'Oscar', 'Six pack poker'),
        (2, 'Cata', 'Doritos'),
        (2, 'Mari', 'Helado crema'),
        (1, 'Harold', 'Chetos'),
        (1, 'Salome', 'Chocolatina');

-- Update data


-- Mostrar tabla
SELECT * FROM users;
SELECT * FROM owner;
SELECT * FROM permissions;
SELECT * FROM employee;
SELECT * FROM customer;
SELECT * FROM bill;
SELECT DATE_FORMAT(creation_date, '%d/%m/%Y') AS fecha_formateada FROM bill;
SELECT * FROM daily_report;
SELECT * FROM inventory;
SELECT * FROM sales;