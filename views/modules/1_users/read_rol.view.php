<table>
    <thead>
        <tr>
            <th>cod</th>
            <th>Nombre</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($roles as $rol): ?>
            <tr>
                <td>
                    <?php echo $rol->getRolCode(); ?>
                </td>
                <td>
                    <?php echo $rol->getRolName(); ?>
                </td>
                <td>
                    <a href="">Editar</a>
                    <a href="">Eliminar</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>