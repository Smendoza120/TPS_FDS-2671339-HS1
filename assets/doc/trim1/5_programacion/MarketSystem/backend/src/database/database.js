import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "market_system_bbdd", 
  "root", 
  "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log('Conexion establecida satisfactoriamente')
} catch (error) {
  console.error('No fue posible la conexion', error)
}