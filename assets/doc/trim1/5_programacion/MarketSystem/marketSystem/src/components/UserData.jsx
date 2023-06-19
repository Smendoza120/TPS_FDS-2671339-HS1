
import { FaUserEdit } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
export function UserData({ name, email, charge }){
  return(
    <tr className="userlist__table-row">
      <td className="userlist__table-row-data">{name}</td>
      <td className="userlist__table-row-data">{email}</td>
      <td className="userlist__table-row-data">{charge}</td>
      <td className="userlist__table-row-data"><FaUserEdit className="userlist__table-row-data-icon" /></td>
    </tr>
  )
}