import search from "../images/Icono de buscar.png";

export function Filter() {
  return (
    <form action="" className="filter">
      <img className="filter__image" src={search} alt="Buscar" />
      <input className="filter__input" type="text" />
    </form>
  );
}
