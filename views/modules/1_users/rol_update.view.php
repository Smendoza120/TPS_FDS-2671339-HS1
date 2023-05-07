            <section class="borde">
                <form action="" method="post">
                    <div class="form-header">
                        <h3>Actualizar Rol</h3>
                        <hr>
                    </div>
                    <div class="form-body">
                        <div class="form-control">
                            <label for="">Código Rol</label>
                            <input type="number" name="rolCodigo" value="<?php echo $rolDto->getRolCodigo(); ?>">
                        </div>
                        <div class="form-control">
                            <label for="">Nombre Rol</label>
                            <input type="text" name="rolNombre" value="<?php echo $rolDto->getRolNombre()?>">
                        </div>
                    </div>
                    <div class="form-footer">
                        <input type="submit" value="Actualizar">
                    </div>
                </form>
            </section>