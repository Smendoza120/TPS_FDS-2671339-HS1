import app from './src/app.js';

const port = process.env.PORT;

// const port = ;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})