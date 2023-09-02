import { Title } from "../../../components/Title";
import { Filter } from "../../../components/Filter";
import { Button } from "../../../components/Button";
import { InventoryProducts } from "../../../components/InventoryProducts";
import { BackButton } from "../../../components/BackButton";

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function InventoryControl({ path, back }) {
  return (
    <section className="inventory">
      <BackButton back={back} />

      <Title>Control de inventario</Title>

      <div className="inventory__filter">
        <div className="inventory__filter-container">
          <Filter />
        </div>
        <Link to={path}>
          <Button>Generar Reporte</Button>
        </Link>
      </div>

      <section className="inventory__form-container">
        <form action="" className="inventory__form">
          <div className="inventory__form-data">
            <div className="inventory__form-inputs">
              <label className="inventory__form-label" htmlFor="">
                *Producto
              </label>
              <input
                className="inventory__form-input"
                type="text"
                placeholder="Doritos"
              />
            </div>

            <div className="inventory__form-inputs">
              <label className="inventory__form-label" htmlFor="">
                *Cantidad
              </label>
              <input
                className="inventory__form-input"
                type="text"
                placeholder="2"
              />
            </div>

            <div className="inventory__form-inputs">
              <label className="inventory__form-label" htmlFor="">
                *Precio Unitario
              </label>
              <input
                className="inventory__form-input"
                type="text"
                placeholder="$500"
              />
            </div>

            <div className="inventory__form-inputs">
              <label className="inventory__form-label" htmlFor="">
                *Almacenamiento
              </label>
              <input
                className="inventory__form-input"
                type="text"
                placeholder="Bodega"
              />
            </div>

            <div className="inventory__form-inputs">
              <label className="inventory__form-label" htmlFor="">
                Fecha Vencimiento
              </label>
              <input
                className="inventory__form-input"
                type="date"
                name=""
                id=""
              />
            </div>
          </div>

          <Button>Agregar</Button>
        </form>
      </section>

      <section className="inventory__table-container">
        <table className="inventory__table">
          <thead>
            <tr className="inventory__table-row">
              <th className="inventory__table-row-title">Fecha Ingreso</th>
              <th className="inventory__table-row-title">Fecha Vencimiento</th>
              <th className="inventory__table-row-title">Producto</th>
              <th className="inventory__table-row-title">Cantidad</th>
              <th className="inventory__table-row-title">Precio Unitario</th>
              <th className="inventory__table-row-title">Almacenamiento</th>
              <th className="inventory__table-row-title">Modificación</th>
            </tr>
          </thead>
          <tbody>
            <InventoryProducts
              entryDate={"09/mar/23"}
              expirationDate={"09/dic/23"}
              product={"Doritos"}
              quantity={"2"}
              unitPrice={"$2.500"}
              storage={"Almacen"}
            />
          </tbody>
        </table>
      </section>
    </section>
  );
}
