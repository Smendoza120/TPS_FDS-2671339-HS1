// eslint-disable-next-line react/prop-types
export function InvoiceHistoryData({ date, name, mail, phone, totalPrice }){
  return(
    <tr className="invoice-history__table-row">
      <th className="invoice-history__table-row-data">{date}</th>
      <th className="invoice-history__table-row-data">{name}</th>
      <th className="invoice-history__table-row-data">{mail}</th>
      <th className="invoice-history__table-row-data">{phone}</th>
      <th className="invoice-history__table-row-data">{totalPrice}</th>
    </tr>
  )
}