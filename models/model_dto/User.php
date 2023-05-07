<?php
    class User{
        private $rolCode;
        private $userCode;
        private $userNames;
        private $userLastNames;
        private $userEmail;
        public function __construct(){
            $a = func_get_args();
			$i = func_num_args();
			if (method_exists($this, $f='__construct'.$i)) {
				call_user_func_array(array($this, $f), $a);
			}
        }
        public function __construct5($rolCode,$userCode,$userNames,$userLastNames,$userEmail){
            $this->rolCode = $rolCode;
            $this->userCode = $userCode;
            $this->userNames = $userNames;
            $this->userLastNames = $userLastNames;
            $this->userEmail = $userEmail;
        }
        public function setRolCode($rolCode){
            $this->rolCode;
        }
        public function getRolCode(){
            return $this->rolCode;
        }        
        public function setUserCode($userCode){
            $this->userCode;
        }
        public function getUserCode(){
            return $this->userCode;
        }        
        public function setUserNames($userNames){
            $this->userNames;
        }
        public function getUserNames(){
            return $this->userNames;
        }        
        public function setUserLastNames($userLastNames){
            $this->userLastNames;
        }
        public function getUserLastNames(){
            return $this->userLastNames;
        }        
        public function setUserEmail($userEmail){
            $this->userEmail;
        }
        public function getUserEmail(){
            return $this->userEmail;
        }        
    }
?>