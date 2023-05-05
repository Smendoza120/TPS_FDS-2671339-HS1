import search from '../images/Icono de buscar.png';
// import { useState } from 'react';

export function Filter(){
  // const [filter, setFilter] = useState()

  return(
    <div className='filter'>
      <img className='filter__image' src={search} alt="Buscar" />
      <input className='filter__input' type="text" />
    </div>
  )
}