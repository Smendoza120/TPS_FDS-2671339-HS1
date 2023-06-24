import { Link } from "react-router-dom";

import addProfile from "../images/icono_usuarios.png";
import editProfile from "../images/icono_listadousuarios.png";

// eslint-disable-next-line react/prop-types
export function InterfazUsers({ userCreation, userList }) {
  return (
    <section className="users__container">
      <div className="users__content">
        <Link className="users__links" to={userCreation}>
          <h3 className="users__title">Creacion de usuarios</h3>
          <div className="users__icons">
            <img className="users__icon" src={addProfile} alt="añadir perfil" />
          </div>
        </Link>
      </div>

      <div className="users__content">
        <Link className="users__links" to={userList}>
          <h3 className="users__title">Listado y edicion de usuarios</h3>
          <div className="users__icons">
            <img
              className="users__icon"
              src={editProfile}
              alt="editar perfil"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
