/* ___________________________________ Manipulacion de datos ______________________________________*/
/*1. - Consultas de accion             -------- INSERT INTO, UPDATE, DELETE                        */
/*1.1 - Crear o registrar              -------- INSERT INTO __ VALUES (__, __)                     */
/*1.2 - Actualizar                     -------- UPDATE __ SET __ = __ WHERE __ = __                */
/*1.3 - Eliminar                       -------- DELETE FROM __ WHERE __ = __                       */
/*_________________________________________________________________________________________________*/
/*2. Consultas de seleccion            -------- SELECT                                             */
/*2.1 - Generales                      -------- SELECT * FROM __                                   */
/*2.2 - Especificas                    -------- SELECT __ , __ FROM __                             */
/*2.3 - Con criterios                  -------- SELECT __ FROM __ WHERE __ = __                    */
/*_________________________________________________________________________________________________*/
/*2.4 - Con operadores logicos         -------- OR, AND, NOT                                       */
/*2.4.1 - 0 [OR]                       -------- SELECT __ FROM __ WHERE __ = __ OR __ = __         */
/*2.4.2 - Y [AND]                      -------- SELECT __ FROM __ WHERE __ = __ AND __ = __        */
/*2.4.3 - no [NOT]                     -------- SELECT __ FROM __ WHERE __ NOT IN ( __ )           */
/*_________________________________________________________________________________________________*/
/*2.5 - Con operadores de comparacion  -------- <>, <, <= , >, >=                                  */
/*2.5.1 - Diferente [<>]               -------- SELECT __ FROM __ WHERE __ <> __                   */
/*2.5.2 - Menor que [<]                -------- SELECT __ FROM __ WHERE __ < __                    */
/*2.5.3 - Mayor que [>]                -------- SELECT __ FROM __ WHERE __ > __                    */
/*2.5.4 - Menor o igual [<=]           -------- SELECT __ FROM __ WHERE __ <= __                   */
/*2.5.5 - Mayor o igual [>=]           -------- SELECT __ FROM __ WHERE __ >= __                   */
/*_________________________________________________________________________________________________*/
/*2.6 - Con otros operadores           -------- LIKE '_%', BETWEEN __ AND __, IN (__ , __)         */
/*2.6.1 - Comodin [LIKE '_%]           -------- SELECT __ FROM __ WHERE __ LIKE '_%'               */
/*2.6.2 - Entre [BETWEEN]              -------- SELECT __ FROM __ WHERE __ BETWEEN __ AND __       */
/*2.6.3 - Lista [IN]                   -------- SELECT __ FROM __ WHERE __ IN (__ , __)            */
/*_________________________________________________________________________________________________*/
/*2.7 - Ordenadas                      -------- ORDER BY                                           */
/*2.7.1 - Ascendente [ASC]             -------- SELECT __ FROM __ WHERE __ = __ ORDER BY __ ASC    */
/*2.7.2 - Decendente [DESC]            -------- SELECT __ FROM __ WHERE __ = __ ORDER BY __ DESC   */
/*2.7.3 - Combinadas                   -------- SELECT __ FROM __ WHERE __ = __ ORDER BY __        */
/*_________________________________________________________________________________________________*/
/*2.8 - Calculadas con funciones       -------- GROUP BY __                                        */
/*2.8.1 - Suma [SUM()]                 -------- SELECT __ , SUM( __ ) FROM __ GROUP BY __          */
/*2.8.2 - Promedio [AVG()]             -------- SELECT __ , AVG( __ ) FROM __ GROUP BY __          */
/*2.8.3 - Maximo [MAX()]               -------- SELECT __ , MAX( __ ) FROM __ GROUP BY __          */
/*2.8.4 - Minimo [MIN()]               -------- SELECT __ , MIN( __ ) FROM __ GROUP BY __          */
/*2.8.5 - Conteo [COUNT()]             -------- SELECT __ , COUNT( __ ) FROM __ GROUP BY __        */
/*_________________________________________________________________________________________________*/
/*2.9 - Calculadas con Alias           -------- SELECT __, FUN( __ ) AS __ FROM __                 */
/*2.10 - Calculadas con condicionales  -------- GROUP BY __ HAVING __ = __ OR __ = __              */
/*2.11 - Calculadas con operadores     -------- SELECT __ , __ , ROUND(__ * 0.19, 2) AS __ FROM __ */
/*_________________________________________________________________________________________________*/
/*2.12 - Calculadas con fechas         -------- NOW(), DATE_FORMAT(), TIMESTAMDIFF()               */
/*2.12.1 - Fecha actual                -------- NOW()                                              */
/*2.12.2 - Formato fecha               -------- DATE_FORMAT(NOW(), '%Y-%M-%D')                     */
/*2.12.3 - Formato fechas              -------- TIMESTAMPDIFF(DAY, __, NOW())                      */
/*_________________________________________________________________________________________________*/

/*_________________________________________________________________________________________________*/
/* Para ingresar a MYSQL desde la consola tiene que dirigirse a la siguiente ruta                  */ 
/* XAMPP / SHELL / cd mysql/bin / mysql                                                            */
/*_________________________________________________________________________________________________*/
/* Luego tiene que ingresar el siguiente comando                                                   */
/* -h localhost -u root -p / ENTER                                                                 /*
/*_________________________________________________________________________________________________*/

/*_________________________________________________________________________________________________*/
/*_________________________________1. Consultas de accion [Inicio]_________________________________*/
/*___________________________________INSERT INTO, UPDATE, DELETE___________________________________*/
/*_________________________________________________________________________________________________*/

-- -----------------------------------------------------
-- 1.1 Crear o Registrar
INSERT INTO roles VALUES 
  (null, 'admin'),
  (null, 'person'),
  (null, 'customer'),
  (null, 'seller');

INSERT INTO usuarios (id, usuario, nombre, apellido, correo) VALUES (
  1, 'admin-1', 'harold', 'sanchez', 'sanchezharold13@gmail.com'
);
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 1.2 Actualizar
UPDATE roles SET nombre = 'person' WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 1.3 Eliminar
DELETE FROM usuarios WHERE codigo_rol = 'admin-2';
-- -----------------------------------------------------

/*_________________________________________________________________________________________________*/
/*____________________________________2. consultas de seleccion____________________________________*/
/*_____________________________________________SELECT______________________________________________*/
/*_________________________________________________________________________________________________*/

-- -----------------------------------------------------
-- 2.1 Generales
SELECT * FROM usuarios;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.2 Especificas
SELECT codigo_rol, correo_user FROM usuarios;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.3 Con Criterios
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol = 3;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.4 Con operadores logicos
-- 2.4.1 O[OR]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol = 3 OR codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.4.2 Y[AND]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol = 3 AND codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.4.3 NO[NOT]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol NOT IN 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5 Con operadores de comparacion
-- 2.5.1 Diferente [<>]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol <> 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.2 Menor que [<]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol < 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.3 Mayor que [>]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol > 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.4 Menor o igual [<=]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol <= 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.5 Mayor o igual [>=]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol >= 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.6 Con otros operadores
-- 2.6.1 Comodin [Like '_%']
SELECT * FROM usuarios WHERE codigo_rol LIKE 'j%';
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.6.2 Entre [BETWEEN]
SELECT * FROM usuarios WHERE codigo_rol BETWEEN 2 AND 5;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.6.3 Lista [IN ( __ )]
SELECT * FROM usuarios WHERE codigo_rol IN (2);
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.7 Ordenadas
-- 2.7.1 Ascendente [ASC]
SELECT * FROM usuarios WHERE codigo_rol = 2 
ORDER BY codigo_rol ASC;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.7.2 Decendentes [DESC]
SELECT * FROM usuarios WHERE codigo_rol = 2
ORDER BY codigo_rol DESC;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.7.3 Combinadas
SELECT * FROM usuarios WHERE codigo_rol = 2 or codigo_rol = 3
ORDER BY codigo_rol DESC, correo_user DESC;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8 Calculadas con funciones
-- 2.8.1 Suma [SUM()]
SELECT SUM(codigo_rol) FROM usuarios;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.2 Promedio [AVG()]
SELECT AVG(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.3 Maximo [MAX()]
SELECT MAX(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.4 Minimo [MIN()]
SELECT MIN(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.5 Count [COUNT()]
SELECT COUNT(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.9 Calculadas con alias
SELECT COUNT(codigo_rol) AS codigo FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.10 Calculadas Condicionales
SELECT COUNT(codigo_rol) AS codigo FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------