import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { InventoryData } from "../components/InventoryData";

export function InventoryReport(){
  return(
    <section className="inventory-report">
      <Title>Reporte de inventario</Title>
      <div className="inventory-report__button">
        <Button>Enviar reporte</Button>
      </div>

      <section className="inventory-report__table-container">
        <table className="inventory-report__table">
          <thead>
            <tr className="inventory-report__table-row">
              <th className="inventory-report__table-row-title">Fecha</th>
              <th className="inventory-report__table-row-title">Producto</th>
              <th className="inventory-report__table-row-title">Cantidad</th>
              <th className="inventory-report__table-row-title">Precio Unitario</th>
              <th className="inventory-report__table-row-title">Almacenamiento</th>
            </tr>
          </thead>
          <tbody>
            <InventoryData 
              date={'09/mar/23'}
              product={'Doritos'}
              quantity={'50'}
              unitPrice={'$2.500'}
              storage={'Almacen'}
            />
          </tbody>
        </table>
      </section>
    </section>
  )
}