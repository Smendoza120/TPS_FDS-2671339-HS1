import { FcRules, FcComboChart, FcManager, FcKindle } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export function PrincipalInterfaz() {
  return (
    <section className="interfaz__container">
      <div className="interfaz__content">
        <h3 className="interfaz__title">Usuario</h3>
        <FcManager className="interfaz__icon" />
      </div>

      <div className="interfaz__content">
        <h3 className="interfaz__title">Inventario</h3>
        <FcRules className="interfaz__icon" />
      </div>

      <div className="interfaz__content">
        <h3 className="interfaz__title">Historico Facturas</h3>
        <FcKindle className="interfaz__icon" />
      </div>

      <div className="interfaz__content">
        <h3 className="interfaz__title">Ventas Diarias</h3>
        <FcComboChart className="interfaz__icon" />
      </div>

      <div className="interfaz__content">
        <h3 className="interfaz__title">Cerrar Sesion</h3>
        <FontAwesomeIcon className="interfaz__icon" icon={faRightFromBracket} />
      </div>
    </section>
  );
}
