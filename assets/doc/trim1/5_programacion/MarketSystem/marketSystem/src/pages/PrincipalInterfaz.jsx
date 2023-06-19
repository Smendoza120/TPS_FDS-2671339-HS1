import user from '../images/icono_usuarios.png';
import inventory from '../images/icono_inventario.png';
import invoice from '../images/icono_factura.png';
import dailySales from '../images/icono_ventasdiarias.png';
import close from '../images/icono_cerrar.png';


export function PrincipalInterfaz() {
  return (
    <section className="interfaz">
      <div className="interfaz__container">
        <div className="interfaz__content">
          <h3 className="interfaz__title">Usuario</h3>
          <img className="interfaz__icon" src={user} alt="" />
        </div>

        <div className="interfaz__content">
          <h3 className="interfaz__title">Inventario</h3>
          <img className="interfaz__icon" src={inventory} alt="" />
        </div>

        <div className="interfaz__content">
          <h3 className="interfaz__title">Historico Facturas</h3>
          <img className="interfaz__icon" src={invoice} alt="" />
        </div>

        <div className="interfaz__content">
          <h3 className="interfaz__title">Ventas Diarias</h3>
          <img className="interfaz__icon" src={dailySales} alt="" />
        </div>

        <div className="interfaz__content">
          <h3 className="interfaz__title">Cerrar Sesion</h3>
          <img className="interfaz__icon" src={close} alt="" />
        </div>
      </div>
    </section>
  );
}
