import mysql from "mysql";

const user = "root";
const password = "";
const host = "localhost";
const database = "market_system_bbdd";

const dbOption = {
  user,
  password,
  host,
  database,
};

const connection = mysql.createConnection(dbOption);

connection.connect((err) => {
  if (err) throw err;
  
  console.log("Conexion establecida");
});

export default connection;
