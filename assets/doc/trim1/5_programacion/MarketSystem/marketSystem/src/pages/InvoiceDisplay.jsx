import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { InvoiceData } from "../components/InvoiceData";
import { Total } from "../components/Total";

export function InvoiceDisplay() {
  return (
    <section className="invoice">
      <Title>Visualización de factura</Title>
      <div>
        <Button>Generar Factura</Button>
      </div>
      <p className="invoice__instruction">
        *Seleccione los productos que desea agregar a la factura
      </p>

      <section className="invoice__table-container">
        <table className="invoice__table">
          <thead>
            <tr className="invoice__table-row">
              <th className="invoice__table-row-title">Fecha</th>
              <th className="invoice__table-row-title">Nombre</th>
              <th className="invoice__table-row-title">Producto</th>
              <th className="invoice__table-row-title">Cantidad</th>
              <th className="invoice__table-row-title">Precio Unitario</th>
              <th className="invoice__table-row-title">Precio Total</th>
            </tr>
          </thead>
          <tbody>
            <InvoiceData
              date={"09/mar/23"}
              name={"Ruben"}
              product={"Doritos"}
              quantity={3}
              unitPrice={'$2.500'}
              totalPrice={'$7.500'}
            />
            <InvoiceData
              date={"09/mar/23"}
              name={"Ruben"}
              product={"Doritos"}
              quantity={3}
              unitPrice={'$2.500'}
              totalPrice={'$7.500'}
            />
            <InvoiceData
              date={"09/mar/23"}
              name={"Ruben"}
              product={"Doritos"}
              quantity={3}
              unitPrice={'$2.500'}
              totalPrice={'$7.500'}
            />
          </tbody>
        </table>
      </section>

      <div className="invoice__price">
        <Total>total prueba</Total>
      </div>
    </section>
  );
}
