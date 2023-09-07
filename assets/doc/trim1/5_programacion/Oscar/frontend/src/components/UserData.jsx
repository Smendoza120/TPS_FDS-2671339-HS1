import { Link } from "react-router-dom";

import { FaUserEdit } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
export function UserData({ name, email, charge, path }) {
  return (
    <tr className="userlist__table-row">
      <td className="userlist__table-row-data">{name}</td>
      <td className="userlist__table-row-data">{email}</td>
      <td className="userlist__table-row-data">{charge}</td>
      <td className="userlist__table-row-data">
        {/* //arreglar el enrutado de esta seccion */}
        <Link to={path} className="userlist__table-row-data-link">
          <FaUserEdit className="userlist__table-row-data-icon" />
        </Link>
      </td>
    </tr>
  );
}
