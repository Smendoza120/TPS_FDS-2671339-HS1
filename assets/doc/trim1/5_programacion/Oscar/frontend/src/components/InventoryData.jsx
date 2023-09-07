// eslint-disable-next-line react/prop-types
export function InventoryData({ date, product, quantity, unitPrice, storage }){
  return(
    <tr className="inventory-report__table-row">
      <td className="inventory-report__table-row-data">{date}</td>
      <td className="inventory-report__table-row-data">{product}</td>
      <td className="inventory-report__table-row-data">{quantity}</td>
      <td className="inventory-report__table-row-data">{unitPrice}</td>
      <td className="inventory-report__table-row-data">{storage}</td>
    </tr>
  )
}