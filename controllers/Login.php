<?php
//? Este codigo realiza una clase y esta esta encargada de realizar una validacion de peticiones GET y POST
//? Si esta son peticiones GET nos muestra el inicio de sesion, pero con las peticiones POST, realiza una 
//? validacion de usuario, el cual si tiene las credenciales correctas le muestra el contenido de la pagina
//? de lo contrario le muestra un mensaje de error.

<<<<<<< HEAD
require_once "models/model_dto/UserDto.php";

=======
//! Llmamos al modelo User
require_once "models/User.php";
//! Creamos la clase Login
>>>>>>> 9cd4b040b156f5d9fb575a040cae718e263949dc
class Login
{
  //! Creamos el constructor y este se encuentra vacio
  public function __construct(){}
  //! Creamos el metodo main
  public function main()
  {
    //! Hacemos una condicional para verificar una peticion GET, si esta se cumple se rederiza las
    //! vistas (Header, Login, Footer)
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      require_once "views/company/header.view.php";
      require_once "views/company/login.view.php";
      require_once "views/company/footer.view.php";
    }
    //! Hacemos otra condicional para la peticion POST y esta se ejecutara cuando enviamos un formulario por 
    //! peticiones POST.
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      //! Instanciamos la clase User y la almacenamos en una variable, esta tiene 2 parametros establecidos
      //! en su constructor, le pasamos 2 metodos POST, los cuales son el usuario y la contraseña, se agregan
      //! de esta manera ya que asi las nombramos en las peticiones POST de nuestras vistas
      $userObj = new User(
        $_POST['user'],
        $_POST['pass']
      );
      //! Llamamos al metodo login de nuestra clase User.
      $userObj = $userObj->login();

      //! Hacemos una condicional, la cual determinara un valor vooleano, si esta se cumple nos enviara a la 
      //! ruta dashboard
      if ($userObj) {
        //! Nos envia al enlace Dashboard
        header("Location:?c=Dashboard");
      } else {
        //! Nos trae la vista header
        require_once "views/company/header.view.php";
        //! Nos trae la vista login
        require_once "views/company/login.view.php";
        //! Nos imprime el mensaje dentro del echo
        echo ("El Usuario no está registrado");
        //! Nos trae la vista footer
        require_once "views/company/footer.view.php";
      }

    }
  }
}
?>