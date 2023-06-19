import addProfile from "../images/icono_usuarios.png";
import editProfile from "../images/icono_listadousuarios.png";

export function InterfazUsers() {
  return (
    <section className="users__container">
      <div className="users__content">
        <h3 className="users__title">Creacion de usuarios</h3>
        <div className="users__icons">
          <img className="users__icon" src={addProfile} alt="añadir perfil" />
        </div>
      </div>

      <div className="users__content">
        <h3 className="users__title">Listado y edicion de usuarios</h3>
        <div className="users__icons">
          <img className="users__icon" src={editProfile} alt="editar perfil" />
        </div>
      </div>
    </section>
  );
}
