<?php 
    class RolDao{
        private $dbh;
        public function __construct(){
            try {
				$this->dbh = DataBase::connection();
			} catch (Exception $e) {
				die($e->getMessage());
			}
        }
        public function rolCreateDao($rolDto){            
            try {
				// Crear la Consulta
				$sql = 'INSERT INTO ROLES VALUES (
							:rolCodigo,							
							:rolNombre
						)';
				// Preparar la BBDD para la consulta
				$stmt = $this->dbh->prepare($sql);
				// Vincular los datos del objeto a la consulta de Inserción
				$stmt->bindValue('rolCodigo',$rolDto->getRolCodigo());			
				$stmt->bindValue('rolNombre',$rolDto->getRolNombre());
				// Ejecutar la consulta
				$stmt->execute();
			} catch (Exception $e) {
				die($e->getMessage());	
			}
        }
		public function rolReadDao(){
			try {
				$userList = [];
				$sql = 'SELECT * FROM ROLES';
				$stmt = $this->dbh->query($sql);
				foreach ($stmt->fetchAll() as $rol) {
					$userList[] = new Rol(
						$rol['codigo_rol'],						
						$rol['nombre_rol']
					);					
				}
				return $userList;
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}
		public function getById($rolCodigo){
			try {				
				$sql = "SELECT * FROM ROLES WHERE codigo_rol=:codigoRol";				
				$stmt = $this->dbh->prepare($sql);
				$stmt->bindValue('codigoRol', $rolCodigo);
				$stmt->execute();
				$userDb = $stmt->fetch();
				$userDto = new Rol(
					$userDb['codigo_rol'],
					$userDb['nombre_rol']					
				);
				return $userDto;
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}
		public function rolUpdateDao($rolDto){
			try {				
				$sql = 'UPDATE ROLES SET
							codigo_rol = :codigoRol,
							nombre_rol = :nombreRol
						WHERE codigo_rol = :codigoRol';				
				$stmt = $this->dbh->prepare($sql);				
				$stmt->bindValue('codigoRol', $rolDto->getRolCodigo());			
				$stmt->bindValue('nombreRol', $rolDto->getRolNombre());
				$stmt->execute();
			} catch (Exception $e) {
				die($e->getMessage());				
			}
		}
		public function rolDeleteDao($rolCodigo){
			try {
				$sql = 'DELETE FROM ROLES WHERE codigo_rol = :codigoRol';
				$stmt = $this->dbh->prepare($sql);
				$stmt->bindValue('codigoRol', $rolCodigo);
				$stmt->execute();
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}
    }
?>
