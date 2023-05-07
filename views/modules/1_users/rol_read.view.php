            <section class="borde">
                <h3>Tabla de Roles</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($roles as $rol) : ?>
                        <tr>
                            <td><?php echo $rol->getRolCodigo(); ?></td>
                            <td><?php echo $rol->getRolNombre(); ?></td>
                            <td>
                                <a href="?c=Users&a=updateRol&rolCodigo=<?php echo $rol->getRolCodigo()?>">Actualizar</a>
                                <a href="?c=Users&a=deleteRol&rolCodigo=<?php echo $rol->getRolCodigo()?>">Eliminar</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </section>