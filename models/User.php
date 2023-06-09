<?php
//! Se crea una clase User
class User
{   
    //! Se crean las variables encapsuladas
    // 1ra Parte: Modelo de acuerdo a la POO
    private $dbh;
    private $rolCode = null;
    private $rolName;
    private $userCode = null;
    private $userName;
    private $userLastName;
    private $userEmail;
    private $userPass;
    private $userStatus;
    //! Se realiza el constructor, como el lenguaje es php hay que hacer un pequeño constructor con mas 
    //! modificaciones
    public function __construct()
    {
        //! Tomamos el dbh de este constructor y se instancia la clase DataBase y se llama el metodo connection
        $this->dbh = DataBase::connection();
        //! Se crea una variable a la cual tiene un metodo de php el cual obtiene un arreglo que contiene todos  
        //! los argumentos pasados al construnctor, esta funcion retorna un arreglo con los argumentos pasados
        $a = func_get_args();
        //! Esta linea almacena una funcion la cual se encarga de obtener el numero total de argumentos pasados
        //! al constructor, esta funcion retorna un numero entero de argumentos pasados al constructor
        $i = func_num_args();
        //! Realizamos una condifcional el cual se le pasa como argumentos una funcion la cual se encarga de 
        //! validas si existe un metodo, el parametro que se le pasa a esta funcion valida si hay un metodo en
        //! la clase actual y esta se almacena en una variable f, este constructor tiene una concatenacion con la
        //! cantidad de metodos que tiene el constructor 
        if (method_exists($this, $f = '__construct' . $i)) {
            //! A esta funcion se le pasan 2 argumentos, el primero es un arreglo que contiene el metodo actual y 
            //! y el nombre del metodo a llamar y como segundo argumento se le pasa los argumentos del constructor
            call_user_func_array(array($this, $f), $a);
        }
    }
    //! Creamos un constructor con 2 parametros, los cuales son el correo del usuario y la contraseña del usuario
    //! En el nombre de nuestro constructor le agregamos un numero para saber la cantidad de parametros que tendra
    public function __construct2($userEmail, $userPass)
    {   
        //! Aqui se instancian las clases para poder crear el constructor
        $this->userEmail = $userEmail;
        $this->userPass = $userPass;
    }

    // public function __contruct7($userRol, $userCode, $userName, $userLastName, $userEmail, $userPass, $userStatus)
    // {
    //     $this->userRol = $userRol;
    //     $this->userCode = $userCode;
    //     $this->userName = $userName;
    //     $this->userLastName = $userLastName;
    //     $this->userEmail = $userEmail;
    //     $this->userPass = $userPass;
    //     $this->userStatus = $userStatus;
    // }
    //! Este es otro constructor, en el nombre se le agregan el numero de argumentos que tendremos para tener una
    //! visual mas grande.
    public function __construct7($rolName, $userCode, $userName, $userEmail, $userPass, $rolCode, $userLastName, $userStatus)
    {
        //! Se instancian las variables del constructor para que pueda funcionar de manera eficiente.
        $this->rolName = $rolName;
        $this->userCode = $userCode;
        $this->userName = $userName;
        $this->userEmail = $userEmail;
        $this->userPass = $userPass;
        $this->rolCode = $rolCode;
        $this->userLastName = $userLastName;
        $this->userStatus = $userStatus;
    }

    //! Esta seccion tenemos los metodos get y set, los get nos sirven para consultar y los set para enviar 
    //! información.
    # Código Usuario
    public function setRolCode($rolCode)
    {
        $this->rolCode = $rolCode;
    }
    public function getRolCode()
    {
        return $this->rolCode;
    }

    public function setRolName($rolName)
    {
        $this->rolName = $rolName;
    }
    public function getRolName()
    {
        return $this->rolName;
    }
    public function setUserCode($userCode)
    {
        $this->userCode = $userCode;
    }
    public function getUserCode()
    {
        return $this->userCode;
    }
    # Nombre Usuario
    public function setUserName($userName)
    {
        $this->userName = $userName;
    }
    public function getUserName()
    {
        return $this->userName;
    }

    public function setUserLastName($userLastName)
    {
        $this->userLastName = $userLastName;
    }
    public function getUserLastName()
    {
        return $this->userLastName;
    }
    # Email Usuario
    public function setUserEmail($userEmail)
    {
        $this->userEmail = $userEmail;
    }
    public function getUserEmail()
    {
        return $this->userEmail;
    }
    # PassWord Usuario
    public function setUserPass($userPass)
    {
        $this->userPass = $userPass;
    }
    public function getUserPass()
    {
        return $this->userPass;
    }

    public function setUserStatus($userStatus)
    {
        $this->userStatus = $userStatus;
    }
    public function getUserStatus()
    {
        return $this->userStatus;
    }


    // 2da Parte: Modelo Negocio (Acceso a Datos -> DB)

    # CU01 - Iniciar Sesión
    //! Aqui tenemos los metodos, este es el metodo login , el cual nos servira para iniciar sesion
    public function login()
    {
        //! Tenemos una query de SQL y esta la almacenamos en una variable, esta query se encarga de hacer una
        //! consulta de la tabla users y esta buscando el correo y la contraseña en la base de datos.
        $sql = 'SELECT * FROM USERS                    
                    WHERE user_email = :userEmail AND user_pass = :userPass';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue('userEmail', $this->getUserEmail());
        $stmt->bindValue('userPass', sha1($this->getUserPass()));
        $stmt->execute();
        $userDb = $stmt->fetch();
        if ($userDb) {
            $user = new User(
                $userDb['rol_code'],
                $userDb['user_code'],
                $userDb['user_name'],
                $userDb['user_lastname'],
                $userDb['user_email'],
                $userDb['user_pass'],
                $userDb['user_status']
            );
            return $user;
        } else {
            return false;
        }
    }

    # CU02 - Crear Rol
    public function createRol()
    {
        try {
            $sql = 'INSERT INTO roles VALUES (:rolCode, :rolName)';
            $stmt = $this->dbh->prepare($sql);
            $stmt->bindValue('rolCode', $this->getRolCode());
            $stmt->bindValue('rolName', $this->getRolName());
            $stmt->execute();
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function readRol()
    {
        try {
            $rolList = [];
            $sql = 'SELECT * FROM roles';
            $stmt = $this->dbh->query($sql);
            foreach ($stmt->fetchAll() as $rol) {
                $rolObj = new User;
                $rolObj->setRolCode($rol['rol_code']);
                $rolObj->setRolName($rol['rol_name']);
                array_push($rolList, $rolObj);
            }
            return $rolList;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function createUser()
    {
        try {
            $sql = 'INSERT INTO users VALUES(:rolCode, :userCode, :userName, :userLastName, :userEmail, :userPass, :userStatus)';
            $stmt = $this->dbh->prepare($sql);
            $stmt->bindValue('rolCode', $this->getRolCode());
            $stmt->bindValue('userCode', $this->getUserCode());
            $stmt->bindValue('userName', $this->getUserName());
            $stmt->bindValue('userLastName', $this->getUserLastName());
            $stmt->bindValue('userEmail', $this->getUserEmail());
            $stmt->bindValue('userPass', sha1($this->getUserPass()));
            $stmt->bindValue('userStatus', $this->getUserStatus());
            $stmt->execute();
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}
?>