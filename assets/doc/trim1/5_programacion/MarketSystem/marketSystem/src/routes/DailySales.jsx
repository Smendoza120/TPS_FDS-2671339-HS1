import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { DailyProducts } from "../components/DailyProducts";
import { Total } from "../components/Total";
import { FcRules } from "react-icons/fc";

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function DailySales({generateReport, reportSales }) {
  return (
    <section className="daily">
      <Title>Ventas Diarias</Title>
      <p className="daily__info">Debe llenar los campos requeridos (*)</p>

      <section className="daily__form-container">
        <form className="daily__form" action="">
          <div className="daily__form-content">
            <div className="daily__form-item">
              <label className="daily__form-label" htmlFor="">
                *Producto
              </label>
              <input
                className="daily__form-input"
                type="text"
                placeholder="Doritos"
              />
            </div>

            <div className="daily__form-item">
              <label className="daily__form-label" htmlFor="">
                *Cantidad
              </label>
              <input
                className="daily__form-input"
                type="text"
                placeholder="2"
              />
            </div>

            <div className="daily__form-item">
              <label className="daily__form-label" htmlFor="">
                *Precio unitario
              </label>
              <input
                className="daily__form-input"
                type="text"
                placeholder="$1.000"
              />
            </div>

            <div className="daily__form-item">
              <label className="daily__form-label" htmlFor="">
                Nombre
              </label>
              <input
                className="daily__form-input"
                type="text"
                placeholder="Carlos"
              />
            </div>
          </div>

          <div className="daily__form-buttons">
            <Button>Agregar a la lista</Button>
            <Link to={reportSales}>
              <Button>Reporte de ventas</Button>
            </Link>
          </div>
        </form>
      </section>

      <section className="daily__table-container">
        <table className="daily__table">
          <thead>
            <tr className="daily__table-row">
              <th className="daily__table-row-title">Fecha</th>
              <th className="daily__table-row-title">Producto</th>
              <th className="daily__table-row-title">Cantidad</th>
              <th className="daily__table-row-title">Precio Unitario</th>
              <th className="daily__table-row-title">Total</th>
              <th className="daily__table-row-title">Modificación</th>
            </tr>
          </thead>
          <tbody>
            <DailyProducts
              date={"09/mar/23"}
              products={"Doritos"}
              quantity={"2"}
              unitPrice={"$2.500"}
              total={"$5.000"}
              modify={<FcRules />}
            />
            <DailyProducts
              date={"09/mar/23"}
              products={"Chocolatina burbuja"}
              quantity={"2"}
              unitPrice={"$500"}
              total={"$1.000"}
              modify={<FcRules />}
            />
          </tbody>
        </table>
      </section>

      <div className="daily__total-container">
        <Total />
        <div>
          <Link to={generateReport}>
            <Button>Generar Reporte</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
