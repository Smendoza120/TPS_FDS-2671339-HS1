import { Button } from "../../../components/Button";
import { InvoiceHistoryData } from "../../../components/InvoiceHistoryData";
import { Title } from "../../../components/Title";

import { Link } from "react-router-dom";
import { BackButton } from "../../../components/BackButton";

// eslint-disable-next-line react/prop-types
export function InvoiceHistory({ send, back }) {
  return (
    <section className="invoice-history">
      <BackButton back={back} />
      <Title>Historico de Facturas</Title>
      <div>
        <Link to={send}>
          <Button>Generar Factura</Button>
        </Link>
      </div>
      <p className="invoice-history__text">*Seleccionar Facutura</p>

      <section className="invoice-history__table-container">
        <table className="invoice-history__table">
          <thead>
            <tr className="invoice-history__table-row">
              <td className="invoice-history__table-row-title">Fecha</td>
              <td className="invoice-history__table-row-title">Nombre</td>
              <td className="invoice-history__table-row-title">Correo</td>
              <td className="invoice-history__table-row-title">Celular</td>
              <td className="invoice-history__table-row-title">Precio total</td>
            </tr>
          </thead>
          <thead>
            <InvoiceHistoryData
              date={"09/mar/23"}
              name={"Ruben"}
              mail={"darioruben@gmail.com"}
              phone={"3212030745"}
              totalPrice={"$145.000"}
            />
          </thead>
        </table>
      </section>
    </section>
  );
}
