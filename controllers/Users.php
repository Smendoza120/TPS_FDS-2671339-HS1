<?php
    require_once "models/model_dto/Rol.php";
    require_once "models/model_dao/RolDao.php";
    require_once "models/model_dto/User.php";
    require_once "models/model_dao/UserDao.php";
    class Users{
        private $rolDao;
        private $userDao;
        public function __construct(){
            $this->rolDao = new RolDao;
            $this->userDao = new UserDao;
        }
        public function createRol(){
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                require_once "views/roles/admin/header.view.php";
                require_once "views/modules/1_users/rol_create.view.php";
                require_once "views/roles/admin/footer.view.php";
            }
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {                
                $rolDto = new Rol(
                    $_POST['rolCodigo'],
                    $_POST['rolNombre']
                );                
                $this->rolDao->rolCreateDao($rolDto);
                header("Location: ?c=Users&a=readRol");
            }
        }
        public function readRol(){
            $roles = $this->rolDao->rolReadDao();            
            require_once "views/roles/admin/header.view.php";
            require_once "views/modules/1_users/rol_read.view.php";
            require_once "views/roles/admin/footer.view.php";
        }
        public function updateRol(){
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                $rolDto = $this->rolDao->getById($_GET['rolCodigo']);                
                require_once "views/roles/admin/header.view.php";
                require_once "views/modules/1_users/rol_update.view.php";
                require_once "views/roles/admin/footer.view.php";
            }
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $rolDto = new Rol(
                    $_POST['rolCodigo'],
                    $_POST['rolNombre']
                );
                $this->rolDao->rolUpdateDao($rolDto);
                header('Location: ?c=Users&a=readRol');
            }
        }
        public function deleteRol(){
            $this->rolDao->rolDeleteDao($_GET['rolCodigo']);
            header('Location: ?c=Users&a=readRol');
        }
        public function createUser(){
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                require_once "views/roles/admin/header.view.php";
                require_once "views/modules/1_users/user_create.view.php";
                require_once "views/roles/admin/footer.view.php";
            }
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {                
                $userDto = new User(
                    $_POST['rolCode'],
                    $_POST['userCode'],
                    $_POST['userNames'],
                    $_POST['userLastNames'],
                    $_POST['userEmail']
                );
                print_r($userDto);
                $this->userDao->userCreateDao($userDto);
                // header("Location: ?c=Users&a=readRol");
            }
        }
    }
?>