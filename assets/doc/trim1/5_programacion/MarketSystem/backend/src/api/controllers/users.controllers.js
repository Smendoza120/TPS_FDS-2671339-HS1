import connection from "../../db/conn.js";

//Obtener usuarios
export function getUser(req, res) {
  try {
    connection.query(`
    SELECT * 
    FROM users
    JOIN owner ON users.id_users = owner.id_users
    JOIN employee ON employee.id_employee = permissions.id_employee
    `, (err, result) => {
      if (err) throw err;

      res.json({ messagge: "Datos recopilados con exito", data: result });
    });
  } catch (error) {
    console.error(error);
  }
}

//Crear usuario
export function createUser(req, res) {
  try {
    const { names, mail, phone, password } = req.body;

    // Iniciar la transacción
    connection.beginTransaction((err) => {
      if (err) {
        throw err;
      }

      // Insertar datos en la tabla 'users'
      connection.query(
        'INSERT INTO users (names, mail, phone) VALUES (?, ?, ?)',
        [names, mail, phone],
        (err, result) => {
          if (err) {
            connection.rollback(() => {
              throw err;
            });
          }

          // Obtener el ID del usuario insertado en la tabla 'users'
          const userId = result.insertId;

          // Insertar datos en la tabla 'owner'
          connection.query(
            'INSERT INTO owner (password, id_users) VALUES (?, ?)',
            [password, userId],
            (err, result) => {
              if (err) {
                connection.rollback(() => {
                  throw err;
                });
              }

              // Confirmar la transacción
              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    throw err;
                  });
                }

                console.log('Registro guardado con éxito en las tablas users y owner');
                res.send({
                  message: 'Registro guardado con éxito en las tablas users y owner',
                  data: result,
                });
              });
            }
          );
        }
      );
    });
  } catch (error) {
    console.err(error);
  }
}
