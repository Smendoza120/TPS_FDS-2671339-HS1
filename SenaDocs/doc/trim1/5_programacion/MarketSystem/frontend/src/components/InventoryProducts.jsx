import { HiPencilAlt } from "react-icons/hi";


// eslint-disable-next-line react/prop-types
export function InventoryProducts({ entryDate, expirationDate, product, quantity, unitPrice, storage }){
  return(
    <tr className="inventory__table-row">
      <td className="inventory__table-row-data">{entryDate}</td>
      <td className="inventory__table-row-data">{expirationDate}</td>
      <td className="inventory__table-row-data">{product}</td>
      <td className="inventory__table-row-data">{quantity}</td>
      <td className="inventory__table-row-data">{unitPrice}</td>
      <td className="inventory__table-row-data">{storage}</td>
      <td className="inventory__table-row-data"><div className="inventory__table-row-modify">{<HiPencilAlt/>}</div></td>
    </tr>
  )
}