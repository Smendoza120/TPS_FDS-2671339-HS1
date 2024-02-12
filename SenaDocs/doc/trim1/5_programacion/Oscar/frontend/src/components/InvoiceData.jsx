//Generacion de componente para agregar productos y datos del cliente 

// eslint-disable-next-line react/prop-types
export function InvoiceData({date, name, product, quantity, unitPrice, totalPrice}){
  return(
    <>
      <tr className="invoice__table-row">
        <td className="invoice__table-row-data">{date}</td>
        <td className="invoice__table-row-data">{name}</td>
        <td className="invoice__table-row-data">{product}</td>
        <td className="invoice__table-row-data">{quantity}</td>
        <td className="invoice__table-row-data">{unitPrice}</td>
        <td className="invoice__table-row-data">{totalPrice}</td>
      </tr>
    </>
  )
}