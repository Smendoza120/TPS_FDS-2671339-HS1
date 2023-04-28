<?php
  class UserDto{
    private $idRol;
    private $idUser;
    private $nameUser;
    private $lastNameUser;
    private $emailUser;
    private $passUser;

    public function __construct(){
      $a = func_get_args();
      $i = func_num_args();
      if(method_exists($this, $f='__construct'.$i)){
        call_user_func_array(array($this, $f), $a);
      }
    }

    public function __construct6($idRol, $idUser, $nameUser, $lastNameUser, $emailUser, $passUser){
      $this->idRol = $idRol;
      $this->idUser = $idUser;
      $this->nameUser = $nameUser;
      $this->lastNameUser = $lastNameUser;
      $this->emailUser = $emailUser;
      $this->passUser = $passUser;
    }

    public function __construct2($idUser, $passUser){
      $this->idUser = $idUser;
      $this->passUser = $passUser;
    }

    public function setIdRol($idRol){
      $this -> idRol = $idRol;
    }

    public function getIdRol(){
      return $this->idRol;
    }

    public function setIdUser($idUser){
      $this -> idUser = $idUser;
    }

    public function getIdUser(){
      return $this->idUser;
    }

    public function setNombreUser($nameUser){
      $this->nameUser = $nameUser;
    }

    public function getNameUser(){
      return $this->nameUser; 
    }

    public function setLastNameUser($lastNameUser){
      $this->lastNameUser = $lastNameUser;
    }

    public function getLastNameUser(){
      return $this->lastNameUser;
    }

    public function setEmailUsers($emailUser){
      $this->emailUser = $emailUser;
    }

    public function getEmailUsers(){
      return $this->emailUser;
    }

    public function setPassUser($passUser){
      $this->passUser = $passUser;
    }

    public function getPassUser(){
      return $this->passUser;
    }
  }
?>