### Tareas pendientes
- [X] Tomar el modelo de trabajadores y agregarlo a la tabla
- [x] Crear un modelo el cual tenga atributos para la edicion de contenido 
- [x] Realizar la seccion de creacion de usuario
- [x] Realizar la seccion de actualizacion de usuario
- [x] Realizar la seccion de eliminacion de usuario

# Inicio de sesion:
- [] Autorizacion con JWT 
- [] Proteccion de los enlaces
- [] Crear vista de restaurar contraseña
- [] Traer el id del trabajador segun la cuenta ingresada

# Reestablecer contraseña
- [X] Hacer la interfaz
- [X] Hacer la logica para restaurar la contraseña
- [] Traer el token que se envia para poder finalizar la restauracion de la contraseña

# Inventario
- [X] Quitar fecha de vencimineto
- [X] Creacion de producto
- [X] Control de errores
    - [X] Validacion de campos vacios (Mensaje final y los bordes se ponen rojos)
    - [X] Validacion de campos erroneos (Cada uno individual)
- [X] Hacer la lista del inventario
- [X] Para eliminar un inventario primero hay que borrar el producto
- [X] Mostrar un mensaje por si el producto no esta
- [] Arreglar la seleccion del select
- [] Realizar la visualizacion del filtro en la tabla
- [] Traer el dato de Almacen o Bodega
- [] Si el producto esta deshabilitar los campos y mostrar un popup informando que vaya al listado de productos
## Ideas para logica 
- Podria agregar el tipo de almacenamiento en el producto, para que solo el invetario se encargue de la fecha del inventario y que esta cambie cada mes y se pueda hacer una implementacion que se envie por fechas o por el contenido.

# Ventas Diarias
- [] Realizar una actualización al diseño UI/UX de la sección de control de ventas
- [] Realizar una actualizacion al diseño UI/UX de la seccion del listado de ventas
 
## Ideas para logica 
- Para realizar una venta necesitamos los siguientes datos:
- Cantidad
- Fecha de venta (Esta se consigue con el metodo Date)
- CustomerId (para poder tomar ese ID necesitamos crear al customer) (pero este dato solo se solicitaria para la factura)
- Para el product ID, debemos realizar la misma funcionalidad de filtro de productos para traer el ID del producto.

# Control facturación
- [] Realizar la maquetación 
- [] Realizar logica



