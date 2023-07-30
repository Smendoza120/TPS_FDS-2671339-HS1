import app from "./src/app.js";
import { sequelize } from "./src/database/database.js";

const port = process.env.PORT;

async function main() {
  try {
    await sequelize.sync({ alter: true });
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();