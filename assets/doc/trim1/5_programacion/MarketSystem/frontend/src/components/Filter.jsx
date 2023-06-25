import search from "../images/Icono de buscar.png";
import { Button } from "./Button";

export function Filter() {
  return (
    <form action="" className="filter__container">
      <div className="filter__inputs">
        <img className="filter__image" src={search} alt="Buscar" />
        <input className="filter__input" type="text" />
      </div>
      <Button>Filtrar</Button>
    </form>
  );
}
