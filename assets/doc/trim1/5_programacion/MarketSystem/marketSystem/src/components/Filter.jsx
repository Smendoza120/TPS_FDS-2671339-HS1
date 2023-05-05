import search from '../images/Icono de buscar.png';

export function Filter(){

  return(
    <div className='filter'>
      <img className='filter__image' src={search} alt="Buscar" />
      <input className='filter__input' type="text"/>
    </div>
  )
}