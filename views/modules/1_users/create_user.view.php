<form action="" method='post'>
    <div>
        <h1>Crear Usuario</h1>
    </div>
    <div>
        <div>
            <label for="userRol">idRol</label>
            <input type="text" name="userRol" id="userRol" placeholder='N°Rol'>

            <label for="code">Codigo</label>
            <input type="text" name="userCode" id="userCode" placeholder='code'>

            <label for="userName">Nombre</label>
            <input type="text" name="userName" id="userName" placeholder='Nombre'>

            <label for="userLastName">Apellido</label>
            <input type="text" name="userLastName" id="userLastName" placeholder='Apellido'>

            <label for="userEmail">Correo</label>
            <input type="email" name="userEmail" id="userEmail" label='ejemplo@ejeplo.com'>

            <label for="userPassword">Contraseña</label>
            <input type="password" id="userPassword" name="userPassword" label='********'>

            <label for="userStatus">Status</label>
            <input type="text" name="userStatus" id="userStatus">
        </div>
    </div>
    <div>
        <input type="submit" value="enviar">
    </div>
</form>