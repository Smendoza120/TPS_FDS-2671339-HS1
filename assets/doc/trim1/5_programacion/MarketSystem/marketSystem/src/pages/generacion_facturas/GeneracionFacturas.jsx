//Importacion de archivos
import "../../main.scss";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { Products } from "../../components/Products";
import { Filter } from "../../components/Filter";

export function GeneracionFacturas() {
  return (
    <>
      <Title>Generación de facturas</Title>

      <div className="invoices__container">
        <div className="invoices__filter">
          <Filter />
          <Button>Filtrar</Button>
        </div>
        <Button>Historico de Facturas</Button>
      </div>

      <p className="invoices__intruction">
        *Seleciona la venta para generar la factura
      </p>

      <section className="invoices__table-container">
        <table className="invoices__table">
          <tr className="invoices__table-title">
            <th>Fecha</th>
            <th>Producto</th>
            <th>Nombre</th>
            <th>total</th>
          </tr>

          <Products
            date={"09/mar/23"}
            products={"Doritos"}
            name={"Juanita"}
            total={"$45.000"}
          />

          <Products
            date={"09/mar/23"}
            products={"Chocolatina Burbuja"}
            name={"Oscar"}
            total={"$100.000"}
          />
        </table>
      </section>

      <div className="invoices__button">
        <Button>Visualizar Factura</Button>
      </div>
    </>
  );
}
