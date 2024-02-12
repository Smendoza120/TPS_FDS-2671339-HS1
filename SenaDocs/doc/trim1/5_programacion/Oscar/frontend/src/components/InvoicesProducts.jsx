//Generacion de componente para agregar los productos

// eslint-disable-next-line react/prop-types
export function InvoicesProducts({date, products, name, total}) {
  return (
    <tr className="invoices__table-row">
      <td className="invoices__table-row-data">{date}</td>
      <td className="invoices__table-row-data">{products}</td>
      <td className="invoices__table-row-data">{name}</td>
      <td className="invoices__table-row-data">{total}</td>
    </tr>
  );
}
