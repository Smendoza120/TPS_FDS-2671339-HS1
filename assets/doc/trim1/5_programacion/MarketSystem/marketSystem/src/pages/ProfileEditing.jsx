//AiFillEye -> icono para cuando queramos mostrar la contraseña
import { AiFillEdit, AiFillEyeInvisible } from "react-icons/ai";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

export function ProfileEditing() {
  return (
    <section className="profile__content">
      <Title>Edición de perfil</Title>

      <section className="profile__form-container">
        <div className="profile__form-box">
          <form action="" className="profile__form">
            <div className="profile__form-info">
              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Nombre
                </label>
                <input className="profile__form-input" name="" id="" type="text" />
                <AiFillEdit className="profile__form-icon" />
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Correo
                </label>
                <input className="profile__form-input" name="" id="" type="text" />
                <AiFillEdit className="profile__form-icon" />
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" name="" id="" htmlFor="">
                  Contraseña
                </label>
                <input className="profile__form-input" name="" id="" type="password" />
                <AiFillEdit className="profile__form-icon" />
                <AiFillEyeInvisible className="profile__form-icon-pass" />
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Cargo
                </label>
                <input className="profile__form-input" name="" id="" type="text" />
                <AiFillEdit className="profile__form-icon" />
              </div>
            </div>

            <div className="profile__form-permits">
              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingDailySales"
                  id="edittingDailySales"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingDailySales"
                >
                  Ventas Diarias
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingInventoryControl"
                  id="edittingInventoryControl"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingInventoryControl"
                >
                  Control Inventario
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingHistoricalInvoicing"
                  id="edittingHistoricalInvoicing"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingHistoricalInvoicing"
                >
                  Historico Facturación
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingAccountCreation"
                  id="edittingAccountCreation"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingAccountCreation"
                >
                  Creacion Cuentas
                </label>
              </div>
            </div>

            <div className="profile__form__buttons">
              <Button className="profile__form__buttons-button">
                Realizar Cambios
              </Button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
