import { useState } from 'react';
import './ButtonFilter.css'
import FilterPopUp from './FilterPopUp/FilterPopUp';

export default function ButtonFilter(value) {

  const orderNames = value.order;
  const filterNames = value.filter;

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Stato per gestire la visibilità della popup

  // Funzione per aprire/chiudere la popup
  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <>
      <button className="filter" onClick={togglePopup}>
        Filtra i contenuti
      </button>

        {isPopupOpen &&
          (<div className='filter-popup-container'><FilterPopUp order={orderNames} filter={filterNames} type={value.type} 
            setState={setIsPopupOpen} /></div>)
        }

    </>
  )
}