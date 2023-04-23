<?php

require_once "models/model_dto/UserDto.php";
class Login
{
  public function __construct()
  {
  }

  public function main()
  {

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      require_once "views/roles/business/header.view.php";
      require_once "views/business/login.view.php";
      require_once "views/roles/business/footer.view.php";
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
      require_once "views/roles/business/header.view.php";
      // $user = $_POST['user'];
      // $pass = $_POST['pass'];
      // $userDto = new UserDto($_POST['user'], $_POST['pass']);

      // $userDto->setIdUser($user);
      // $userDto->setPassUser($pass);

      $userDto = new UserDto($_POST['user'], $_POST['pass']);

      echo "<br>usuario: " . $userDto->getIdUser();
      echo "<br>contraseña: " . $userDto->getPassUser();
      require_once "views/roles/business/footer.view.php";
    }


  }
}
?>