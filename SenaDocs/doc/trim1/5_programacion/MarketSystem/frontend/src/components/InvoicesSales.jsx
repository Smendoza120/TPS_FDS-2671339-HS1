// eslint-disable-next-line react/prop-types
export function InvoicesSales({ date, product, quantity, unitPrice, total }){
  return(
    <tr className="sales__table-row">
      <td className="sales__table-row-data">{date}</td>
      <td className="sales__table-row-data">{product}</td>
      <td className="sales__table-row-data">{quantity}</td>
      <td className="sales__table-row-data">{unitPrice}</td>
      <td className="sales__table-row-data">{total}</td>
    </tr>
  )
}