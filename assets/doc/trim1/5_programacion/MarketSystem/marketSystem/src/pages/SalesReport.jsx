import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { InvoicesSales } from "../components/InvoicesSales";
import { Title } from "../components/Title";
import { Total } from "../components/Total";

export function SalesReport() {
  return (
    <section className="sales">
      <Title>Reporte Ventas </Title>

      <div className="sales__filter-container">
        <div className="sales__filter">
          <Filter />
        </div>
        <Button>Generar Reporte</Button>
      </div>

      <section className="sales__table-container">
        <table className="sales__table">
          <tr className="sales__table-row">
            <th className="sales__table-row-title">Fecha</th>
            <th className="sales__table-row-title">Producto</th>
            <th className="sales__table-row-title">Cantidad</th>
            <th className="sales__table-row-title">Precio Unitario</th>
            <th className="sales__table-row-title">Total</th>
          </tr>

          <InvoicesSales
            date={"09/mar/23"}
            product={"Doritos"}
            quantity={2}
            unitPrice={"$2.500"}
            total={"$5.000"}
          />

          <InvoicesSales
            date={"09/mar/23"}
            product={"Chocolatina Burbuja"}
            quantity={2}
            unitPrice={"$500"}
            total={"$1.000"}
          />

          <InvoicesSales
            date={"09/mar/23"}
            product={"Chocolatina Burbuja"}
            quantity={2}
            unitPrice={"$500"}
            total={"$1.000"}
          />
        </table>
      </section>

      <div className="sales__container">
        <Total>
          total prueba
        </Total>
      </div>
    </section>
  );
}
