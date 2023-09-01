import { registerAs } from '@nestjs/config'; // para evitar errores de tipo con las variables de ambiente

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mysql: {
      dbname: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT, 10),
      password: process.env.MYSQL_ROOT_PASSWORD,
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
    },
    auth: {
      apiKey: process.env.API_KEY,
      jwtSecret: process.env.JWT_SECRET,
    },
  };
});
