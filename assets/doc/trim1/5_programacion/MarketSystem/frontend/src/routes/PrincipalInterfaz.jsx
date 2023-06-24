import { Link } from "react-router-dom";

import user from "../images/icono_usuarios.png";
import inventory from "../images/icono_inventario.png";
import invoice from "../images/icono_factura.png";
import dailySales from "../images/icono_ventasdiarias.png";
import close from "../images/icono_cerrar.png";

// eslint-disable-next-line react/prop-types
export function PrincipalInterfaz({pathUser, pathInventory, pathBill, pathDailySales, pathExit,}) {
  return (
    <section className="interfaz">
      <div className="interfaz__container">
        <div className="interfaz__content">
          <Link className="interfaz__link" to={pathUser}>
            <h3 className="interfaz__title">Usuario</h3>
            <img className="interfaz__icon" src={user} alt="" />
          </Link>
        </div>

        <div className="interfaz__content">
          <Link className="interfaz__link" to={pathInventory}>
            <h3 className="interfaz__title">Inventario</h3>
            <img className="interfaz__icon" src={inventory} alt="" />
          </Link>
        </div>

        <div className="interfaz__content">
          <Link className="interfaz__link" to={pathBill}>
            <h3 className="interfaz__title">Historico Facturas</h3>
            <img className="interfaz__icon" src={invoice} alt="" />
          </Link>
        </div>

        <div className="interfaz__content">
          <Link className="interfaz__link" to={pathDailySales}>
            <h3 className="interfaz__title">Ventas Diarias</h3>
            <img className="interfaz__icon" src={dailySales} alt="" />
          </Link>
        </div>

        <div className="interfaz__content">
          <Link className="interfaz__link" to={pathExit}>
            <h3 className="interfaz__title">Cerrar Sesion</h3>
            <img className="interfaz__icon" src={close} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
