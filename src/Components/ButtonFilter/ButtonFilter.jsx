import { useState } from 'react';
import './ButtonFilter.css'
import FilterPopUp from './FilterPopUp/FilterPopUp';

export default function ButtonFilter() {

  const orderNames = ["Prezzo crescente", "Prezzo decrescente", "Quantità", "Nome", "Rilevanza"];
  const filterNames = ["Bio", "Senza Lattosio", "Senza Glutine", "Vegetariano", "Vegano", "Km 0", "Prodotti in promozione", "Più vicini a te"];

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
          (<FilterPopUp order={orderNames} filter={filterNames} setState={setIsPopupOpen}/>)
        }

    </>
  )
}