//AiFillEye -> icono para cuando queramos mostrar la contraseña
import { AiFillEdit, AiFillEyeInvisible } from "react-icons/ai";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

export function ProfileEditing() {
  return (
    <>
      <Title>Edición de perfil</Title>

      <section className="profile__form-container">
        <div className="profile__form-box">
          <form action="" className="profile__form">
            <div className="profile__form-info">
              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Nombre
                </label>
                <input className="profile__form-input" type="text" />
                <AiFillEdit className="profile__form-icon" />
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Correo
                </label>
                <input className="profile__form-input" type="text" />
                <AiFillEdit className="profile__form-icon" />
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Contraseña
                </label>
                <input className="profile__form-input" type="password" />
                <AiFillEdit className="profile__form-icon" />
                <AiFillEyeInvisible className="profile__form-icon-pass" />
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Cargo
                </label>
                <input className="profile__form-input" type="text" />
                <AiFillEdit className="profile__form-icon" />
              </div>
            </div>

            <div className="profile__form-permits">
              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name=""
                  id=""
                />
                <label className="profile__form-label profile__form-text" htmlFor="">
                  Ventas Diarias
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name=""
                  id=""
                />
                <label className="profile__form-label profile__form-text" htmlFor="">
                  Control Inventario
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name=""
                  id=""
                />
                <label className="profile__form-label profile__form-text" htmlFor="">
                  Historico Facturación
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name=""
                  id=""
                />
                <label className="profile__form-label profile__form-text" htmlFor="">
                  Creacion Cuentas
                </label>
              </div>
            </div>

            <div className="profile__form__buttons">
              <Button className="profile__form__buttons-button">Realizar Cambios</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
