-- Insercion de datos
INSERT INTO USER VALUES
(null, 'pepito perez', 'pepito@perez.com', sha1('12345')),
(null, 'Marinita Garcia', 'marinita@garcia.com', sha1('12345')),
(null, 'Harold Sanchez', 'harold@sanchez.com', sha1('12345'));

-- Busqueda global
SELECT * FROM user;