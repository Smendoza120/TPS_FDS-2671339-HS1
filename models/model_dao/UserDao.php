<?php 
    class UserDao{
        private $dbh;
        public function __construct(){
            try {
				$this->dbh = DataBase::connection();
			} catch (Exception $e) {
				die($e->getMessage());
			}
        }
        public function userCreateDao($userDto){            
            try {				
				$sql = 'INSERT INTO USUARIOS VALUES (
							:rolCode,							
							:userCode,
							:userNames,
							:userLastNames,
							:userEmail
						)';
				$stmt = $this->dbh->prepare($sql);				
				$stmt->bindValue('rolCode',$userDto->getRolCode());			
				$stmt->bindValue('userCode',$userDto->getUserCode());				
				$stmt->bindValue('userNames',$userDto->getUserNames());				
				$stmt->bindValue('userLastNames',$userDto->getUserLastNames());				
				$stmt->bindValue('userEmail',$userDto->getUserEmail());				
				$stmt->execute();
			} catch (Exception $e) {
				die($e->getMessage());	
			}
        }
		public function userReadDao(){
			try {
				$userList = [];
				$sql = 'SELECT * FROM USUARIOS';
				$stmt = $this->dbh->query($sql);
				foreach ($stmt->fetchAll() as $user) {
					$userList[] = new User(
						$user['codigo_rol'],						
						$user['codigo_user'],
						$user['nombres_user'],
						$user['apellidos_user'],
						$user['correo_user']
					);					
				}
				return $userList;
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}
		public function getById($userCode){
			try {				
				$sql = "SELECT * FROM USUARIOS WHERE codigo_user=:codeUser";				
				$stmt = $this->dbh->prepare($sql);
				$stmt->bindValue('codeUser', $userCode);
				$stmt->execute();
				$userDb = $stmt->fetch();
				$userDto = new User(
					$userDb['codigo_rol'],						
					$userDb['codigo_user'],
					$userDb['nombres_user'],
					$userDb['apellidos_user'],
					$userDb['correo_user']
				);
				return $userDto;
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}
		public function userUpdateDao($userDto){
			try {				
				$sql = 'UPDATE USUARIOS SET
							codigo_rol = :rolCode,
							codigo_user = :userCode,
							nombres_user = :userNames,
							apellidos_user = :userLastNames,
							correo_user = :userEmail
						WHERE codigo_user = :userCode';				
				$stmt = $this->dbh->prepare($sql);				
				$stmt->bindValue('rolCode', $userDto->getRolCode());			
				$stmt->bindValue('userCode', $userDto->getUserCode());
				$stmt->bindValue('userNames', $userDto->getUserNames());
				$stmt->bindValue('userLastNames', $userDto->getUserLastNames());
				$stmt->bindValue('userEmail', $userDto->getUserEmail());
				$stmt->execute();
			} catch (Exception $e) {
				die($e->getMessage());				
			}
		}
		public function userDeleteDao($userCode){
			try {
				$sql = 'DELETE FROM USUARIOS WHERE codigo_user = :userCode';
				$stmt = $this->dbh->prepare($sql);
				$stmt->bindValue('userCode', $userCode);
				$stmt->execute();
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}
    }
?>
