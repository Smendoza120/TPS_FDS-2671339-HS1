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
### Ideas para logica 
- Podria agregar el tipo de almacenamiento en el producto, para que solo el invetario se encargue de la fecha del inventario y que esta cambie cada mes y se pueda hacer una implementacion que se envie por fechas o por el contenido.

# Ventas Diarias
- [] Realizar una actualización al diseño UI/UX de la sección de control de ventas
- [] Realizar una actualizacion al diseño UI/UX de la seccion del listado de ventas
- [] Falta agregar una tabla temporal la cual se encarga de almacenar los datos de las ventas diaras, posterior a ello se pasan a la base de datos de las ventas totales y se limpia la tabla de ventas diarias.
 
## Ideas para logica 
- Para realizar una venta necesitamos los siguientes datos:
- Cantidad
- Fecha de venta (Esta se consigue con el metodo Date)
- CustomerId (para poder tomar ese ID necesitamos crear al customer) (pero este dato solo se solicitaria para la factura)
- Para el product ID, debemos realizar la misma funcionalidad de filtro de productos para traer el ID del producto.

- Para poder tener una venta lo que tenemos que hacer es capturar todos los datos, pero a su vez debemos tomar el id del customer para que vaya asociada la venta con el customer que creamos, pero si queremos realizar otra venta diaria con otro usuario debemos registrar otro y seguir la cadena, pero como mantenemos ese id del customer mientras hacemos esa venta y posteriormente borramos ese historico del id y generamos otra compra a otro producto

- Si se creo un usuario para esa venta, se deshabilita el boton para que no se cree otro usuario

- Necesito crear una sola venta e ir agregandole productos, cuando hagamos una nueva venta deseo crear otro producto, es decir si tengo al usuario 1 y el pide mas de 3 cosas deseo que se agreguen a la misma venta, lo que no quiero es que al agregar otro producto me genere otra venta.

- Cuando se agrega el primer producto a la venta:

Se crea una nueva venta en el sistema.
Se asigna el cliente a esa venta.
Se agrega el producto a la lista de productos de esa venta.
Cuando se agregan productos adicionales a la misma venta:

Se busca la venta existente asociada al cliente.
Se agrega el producto a la lista de productos de esa venta.
Cuando se completa la venta:

Se envía la venta completa al servidor para su procesamiento y registro en la base de datos.

- Se crea el usuario al momento de generar la factura, de lo contrario se generara el producto en la lista de compras porque se quitara el id del customer 

- Necesito crear un modelo el cual almacenara las ultimas ventas realizadas, cuando se envie la factura o se complete la venta, este modelo volvera a estar vacio, para cuando volvamos a crear una venta esta se pueda llenar nuevamente

# Lista de Ventas Diarias

- [X] Agregar la data al modelo
- [X] Agregar la data del modelo a la tabla
- [] Filtro por nombre
- [] Filtro por fecha
- [] Filtro por precio
- [] Filtro por cantidad
- [] Faltaria agregar un rango de fechas para poder hacer un filtro a los reportes

# Control facturación
- [] Realizar la maquetación 
- [] Realizar logica



