import { Title } from "../../../components/Title";
import { Filter } from "../../../components/Filter";
import { UserData } from "../../../components/UserData";
import { BackButton } from "../../../components/BackButton";

// eslint-disable-next-line react/prop-types
export function UserList({ userEdit, back }) {
  return (
    <section className="userlist__container">
      <BackButton back={back} />
      <Title>Listado de usuarios</Title>

      <div className="userlist__filter">
        <div>
          <Filter />
        </div>
      </div>

      <section className="userlist__table-container">
        <table className="userlist__table">
          <thead>
            <tr className="userlist__table-row">
              <th className="userlist__table-row-title">Nombre</th>
              <th className="userlist__table-row-title">Correo</th>
              <th className="userlist__table-row-title">Cargo</th>
              <th className="userlist__table-row-title">Edición</th>
            </tr>
          </thead>
          <tbody>
            <UserData
              name={"Ruben Dario"}
              email={"darioruben@gmail.com"}
              charge={"Propietario"}
              path={userEdit}
            />
          </tbody>
        </table>
      </section>
    </section>
  );
}