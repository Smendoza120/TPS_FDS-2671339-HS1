<?php
    /*
    ? Este codigo verifica si le proporcionamos el parametro c, si no lo hace este cargara y ejecuta el 
    ? controlador landing. Si le proporcionamos el parametro se cargara el controlador correspondiente
    ? y se realiza una llama a la accion que se especifica en este controlador, la principal funcion de este 
    ? codigo es realizar la respectiva ruta de cada solicitud y llamar la logica correspondiene.
    */

    // !Llama la base de datos
    require_once "models/DataBase.php";    
    // !Se hace una verificacion, si la variable no esta vacia y se verifica la respuesta en la variable c
    if (!isset($_REQUEST['c'])) {
        // !Se llama al controlador Landing
        require_once "controllers/Landing.php";
        // !Instancia la clase landing y la almacna en una variable
        $controller = new Landing;
        // !Se llama al metodo main de la clase Landing
        $controller->main();
    } else {
        // !Se almacena la respuesta de C y se almacena en una variable
        $controller = $_REQUEST['c'];
        // !Se llama al controlador y se hace una concatenacion para que traiga los diferentes controladores, segun la necesidad
        require_once "controllers/" . $controller . ".php";
        // !Se instancia el controlador y este se almacena en una variable
        $controller = new $controller;
        // !Se realiza una operacion ternaria, la cual verifica que si esta vacia la respuesta a, traiga la respueta de a, de lo contrario traiga la vista main y a su vez se almacena en una variable
        $action = isset($_REQUEST['a']) ? $_REQUEST['a'] : 'main';
        // !Se llama una funcion y se le pasa como parametro un array el cual tiene 2 parametros, el primero es el controller y el segundo es la accion
        call_user_func(array($controller, $action));
    }
?>