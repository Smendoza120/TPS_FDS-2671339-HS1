//Importacion de archivos
// import "../main.scss";
import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import { InvoicesProducts } from "../../../components/InvoicesProducts";
import { Filter } from "../../../components/Filter";

import { Link } from "react-router-dom";
import { BackButton } from "../../../components/BackButton";

// eslint-disable-next-line react/prop-types
export function InvoiceGeneration({ history, display, back }) {
  return (
    <section className="invoices">
      <BackButton back={back} />

      <Title>Generación de facturas</Title>

      <div className="invoices__container">
        <div className="invoices__filter">
          <Filter />
          <Button>Comprar</Button>
        </div>
        <Link to={history}>
          <Button>Historico de Facturas</Button>
        </Link>
      </div>

      <p className="invoices__instruction">
        *Seleciona la venta para generar la factura
      </p>

      <section className="invoices__table-container">
        <table className="invoices__table">
          <tr className="invoices__table-row">
            <th className="invoices__table-row-title">Fecha</th>
            <th className="invoices__table-row-title">Producto</th>
            <th className="invoices__table-row-title">Nombre</th>
            <th className="invoices__table-row-title">total</th>
          </tr>

          <InvoicesProducts
            date={"09/mar/23"}
            products={"Doritos"}
            name={"Juanita"}
            total={"$45.000"}
          />

          <InvoicesProducts
            date={"09/mar/23"}
            products={"Chocolatina Burbuja"}
            name={"Oscar"}
            total={"$100.000"}
          />
        </table>
      </section>

      <div className="invoices__button">
        <Link to={display}>
          <Button>Visualizar Factura</Button>
        </Link>
      </div>
    </section>
  );
}
