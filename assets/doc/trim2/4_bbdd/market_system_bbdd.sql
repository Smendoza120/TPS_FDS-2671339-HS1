#drop database market_system_bbdd;
CREATE SCHEMA  market_system_bbdd DEFAULT CHARACTER SET utf8 ;
USE market_system_bbdd ;

CREATE TABLE  users (
  idusers INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  INDEX names_users_idx (names ASC),
  INDEX mail_users2_idx (mail ASC),
  INDEX phone_users_idx (phone ASC),
  names VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  phone VARCHAR (20) NOT NULL
)
ENGINE = InnoDB;

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
  password VARCHAR(50) NOT NULL,
  passwords VARCHAR(50) NOT NULL,
  idusers INT NOT NULL,
  INDEX fk_owner_users1_idx (idusers ASC),
  CONSTRAINT fk_owner_users1
    FOREIGN KEY (idusers)
    REFERENCES users (idusers)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  employee (
  idemployee INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  position VARCHAR(50) NOT NULL
  )
ENGINE = InnoDB;

CREATE TABLE  permissions (
  idpermissions INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permission_sales TINYINT NULL,
  permissions_users TINYINT NULL,
  permission_inventories TINYINT NULL,
  permission_bill TINYINT NULL,
  idowner INT NOT NULL,
  idemployee INT NOT NULL,
  INDEX fk_employee_owner1_idx (idowner ASC),
  CONSTRAINT fk_employee_owner1
    FOREIGN KEY (idowner)
    REFERENCES owner (idowner)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX fk_owner_employee_idx (idemployee ASC),
  CONSTRAINT fk_owner_employee
    FOREIGN KEY (idemployee)
    REFERENCES employee (idemployee)
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


#INSERTAR DATOS


INSERT INTO users (names,mail,phone)
VALUES ("Oscar Aguirre","Oscarpro123@esto.com",3223142717),
("Harold","haroldgay@esto.com",311311322322),
("Cata ","cata@esto.com",123123123123),
("Miguel ","migue97@esto.com",30524154617),
("Luisa ","luis@esto.com",3223141717);
SELECT * FROM users;

INSERT INTO owner (passwords,idusers)
VALUES (123456,5),
(789123,4),
(456789,3),
(123789,2),
(456123,1);
SELECT * FROM owner;

#consulta realizada por metodo left join primero se pone la tabla de donde vamos a traer los datos
#SELECT users.names, users.mail, users.phone, owner.passwords from users left join owner on users.idusers = owner.idusers;
SELECT users.names, users.mail, users.phone, owner.passwords from users inner join owner on users.idusers = owner.idusers;


INSERT INTO customer (idusers)
VALUES (1),
(2);
SELECT * FROM customer;

INSERT INTO bill (creation_date)
VALUES ("2023-05-29"),
  ("2089-05-29"),
  ("2023-05-30"),
  ("2023-06-01");
  
SELECT * FROM bill;

INSERT INTO daily_report (report_date)
#ingresar datos o crear
 VALUES ("2023-05-29"),
  ("2089-05-29"),
  ("2023-05-30"),
  ("2023-06-01"),
  ("2023-06-07"),
  ("2023-08-01"),
  ("2023-09-01"),
  ("2023-10-01");
# ESTO ES PARA BUSCAR:  SELECT * FROM daily_report WHERE report_date = "2023-06-01";
#ESTO ES PARA ACTUALIZAR UPDATE daily_report SET report_date = "2075-05-29" WHERE iddaily_report = 5;
#ESTO ES PARA BORRAR DELETE from daily_report WHERE iddaily_report = 1;
#select * from daily_report;


INSERT INTO inventory (storage,date_purchase,unit_price,due_date,product,quantity_products)
VALUES("almacen","2023-05-29",5.000,"2030-05-29","Arroz",20),
("almacen","2023-05-29",20.000,"2029-05-29","Aceite",5),
("almacen","2023-05-29",5.00,"2029-05-29","Huevos",10),
("almacen","2023-05-29",2.500,"2030-05-29","Tostadas",15),
("almacen","2023-05-29",7.00,"2030-05-29","bom bom bum",25);
#select * from inventory;

INSERT INTO sales (quantity_sold,names_customer,product_sold,idcustomer,idbill,iddaily_report,idinventory)
VALUES (15,"Oscar Aguirre","Arroz",2,2,2,2),
(1,"Oscar Aguirre","Aceite",3,3,3,3);
select * from sales;

