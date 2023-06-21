import { Link } from "react-router-dom";

import addProfile from "../images/icono_usuarios.png";
import editProfile from "../images/icono_listadousuarios.png";

// eslint-disable-next-line react/prop-types
export function InterfazUsers({ userCreation, userList }) {
  return (
    <section className="users__container">
      <div className="users__content">
        <h3 className="users__title">Creacion de usuarios</h3>
        <div className="users__icons">
          <Link to={userCreation}>
            <img className="users__icon" src={addProfile} alt="añadir perfil" />
          </Link>
        </div>
      </div>

      <div className="users__content">
        <h3 className="users__title">Listado y edicion de usuarios</h3>
        <div className="users__icons">
          <Link to={userList}>
            <img
              className="users__icon"
              src={editProfile}
              alt="editar perfil"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
