<?php
    class Rol{
        private $rolCodigo;
        private $rolNombre;
        public function __construct(){
            $a = func_get_args();
			$i = func_num_args();
			if (method_exists($this, $f='__construct'.$i)) {
				call_user_func_array(array($this, $f), $a);
			}
        }
        public function __construct2($rolCodigo,$rolNombre){
            $this->rolCodigo = $rolCodigo;
            $this->rolNombre = $rolNombre;
        }
        public function setRolCodigo($rolCodigo){
            $this->rolCodigo;
        }
        public function getRolCodigo(){
            return $this->rolCodigo;
        }
        public function setRolNombre($rolNombre){
            $this->rolNombre;
        }
        public function getRolNombre(){
            return $this->rolNombre;
        }
    }
?>