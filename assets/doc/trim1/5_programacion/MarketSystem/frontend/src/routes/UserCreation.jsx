import { Title } from "../components/Title";
import { Button } from "../components/Button";

export function UserCreation() {
  return (
    <section className="creation__container">
      <Title>Creacion de usuarios</Title>

      <section className="creation__form-container">
        <div className="creation__form-box">
          <form action="" className="creation__form">
            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="nameUser">
                Nombre
              </label>
              <input className="creation__form-input" name="nameUser" id="nameUser" type="text" />
            </div>

            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="passUser">
                Contraseña
              </label>
              <input className="creation__form-input" name="passUser" id="passUser" type="password" />
            </div>

            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="mailUser">
                Correo
              </label>
              <input className="creation__form-input" name="mailUser" id="mailUser" type="email" />
            </div>

            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="chargeUser">
                Cargo
              </label>
              <input className="creation__form-input" name="chargeUser" id="chargeUser" type="text" />
            </div>

            <div className="creation__form-check-container">
              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userDailySales"
                  id="userDailySales"
                />
                <label className="creation__form-check-label" htmlFor="userDailySales">
                  Ventas Diarias
                </label>
              </div>

              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userInventoryControl"
                  id="userInventoryControl"
                />
                <label className="creation__form-check-label" htmlFor="userInventoryControl">
                  Control Inventario
                </label>
              </div>

              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userHistoricalInvoicing"
                  id="userHistoricalInvoicing"
                />
                <label className="creation__form-check-label" htmlFor="userHistoricalInvoicing">
                  Historico Facturación
                </label>
              </div>

              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userAccountCreation"
                  id="userAccountCreation"
                />
                <label className="creation__form-check-label" htmlFor="userAccountCreation">
                  Creacion Cuentas
                </label>
              </div>
            </div>

            <Button>Crear Usuario</Button>
          </form>
        </div>
      </section>
    </section>
  );
}
