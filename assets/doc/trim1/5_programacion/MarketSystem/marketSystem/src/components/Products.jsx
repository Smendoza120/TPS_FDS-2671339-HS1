//Generacion de componente para agregar los productos

// eslint-disable-next-line react/prop-types
export function Products({date, products, name, total}) {
  return (
    <tr className="invoices__table-data">
      <td>{date}</td>
      <td>{products}</td>
      <td>{name}</td>
      <td>{total}</td>
    </tr>
  );
}
