<?php
require_once 'models/user.php';
class Users
{
    public function __construct()
    {
    }
    public function main()
    {
        header("Location:?c=Dashboard");
    }

    # Controlador para crear el rol
    public function createRol()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            require_once "views/roles/admin/header.view.php";
            require_once "views/modules/1_users/create_rol.view.php";
            require_once "views/roles/admin/footer.view.php";
        }

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $rolObj = new User;
            $rolObj->setRolName($_POST['rolName']);
            $rolObj->createRol();
            header('Location:?c=Users&a=readRol');
        }
    }

    public function readRol()
    {
        $roles = new User;
        $roles = $roles->readRol();
        require_once "views/roles/admin/header.view.php";
        require_once "views/modules/1_users/read_rol.view.php";
        require_once "views/roles/admin/footer.view.php";
    }

    public function createUser()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            require_once "views/roles/admin/header.view.php";
            require_once "views/modules/1_users/create_user.view.php";
            require_once "views/roles/admin/footer.view.php";
        }

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $userObj = new User($_POST['userRol'] ,$_POST['userCode'], $_POST['userName'], $_POST['userLastName'], $_POST['userEmail'], $_POST['userPassword'], $_POST['userStatus']);
            $userObj->createUser();
        }
    }

    # Controlador para Crear Usuario
    // public function createUser(){
    //     if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    //         require_once "views/roles/admin/header.view.php";
    //         echo "Vista para crear usuario";
    //         require_once "views/roles/admin/footer.view.php";
    //     }
    //     if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //         echo "Estoy en el POST de crear usuario";
    //     }
    // }

}

?>