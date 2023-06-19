// eslint-disable-next-line react/prop-types
export function DailyProducts({ date, products, quantity, unitPrice, total, modify}) {
  return (
    <tr className="daily__table-row">
      <th className="daily__table-row-data">{date}</th>
      <th className="daily__table-row-data">{products}</th>
      <th className="daily__table-row-data">{quantity}</th>
      <th className="daily__table-row-data">{unitPrice}</th>
      <th className="daily__table-row-data">{total}</th>
      <th className="daily__table-row-data"><div className="daily__table-row-modify">{modify}</div></th>
    </tr>
  );
}
