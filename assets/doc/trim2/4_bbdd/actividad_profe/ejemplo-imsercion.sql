-- Insercion de datos
INSERT INTO roles VALUES
(null, 'admin');


INSERT INTO users Values 
(1, 'admin-001', 'pepito', 'perez', 'pepito@perez.com', sha1('1234'), 1); 

-- Busqueda global
SELECT * FROM user;