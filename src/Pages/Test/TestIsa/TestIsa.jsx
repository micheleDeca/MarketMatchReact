import React, { useEffect, useState } from 'react'
import './TestIsa.css'
import Caratteristiche from '../../../Components/Caratteristiche/Caratteristiche'
import DataRitiro from '../../../Components/DataRitiro/DataRitiro'
import DettaglioPrenotazione from '../../../Components/DettaglioPrenotazione/DettaglioPrenotazione'
import SezioneAccount from '../../../Components/SezioneAccount/SezioneAccount'
import Stelle from '../../../Components/Stelle/Stelle'
import PrenotationSearch from '../../../Components/PrenotationSearch/PrenotationSearch'
import ReservationLong from '../../../Components/ReservationLong/ReservationLong'
import ButtonSucessivo from '../../../Components/ButtonSucessivo/ButtonSucessivo'


const TestIsa = () => {

 /*const buttonComponents = {
    img: "https://img.freepik.com/vettori-premium/modello-di-logo-vettoriale-dell-icona-del-negozio-del-negozio_917138-2083.jpg",
    name: "GESTIONE NEGOZIO",
    descrizione: "descrizione"
  }*/


 function creaArrayConOggettiDiversi(...oggetti) {
    // Creare un array di 40 oggetti mescolando i 6 tipi forniti in ordine casuale
    const array = Array(40).fill(null).map((_, i) => oggetti[i % oggetti.length]);
    // Mescolare l'array in ordine casuale
    return array.sort(() => Math.random() - 0.5);
}

  // Esempio di utilizzo
  const oggetto1 = {
    userType: "ConA", status: "daRitirare",
    id: "#145825", reservationDate: "10/11/24", infoDate: "11/11/24", shopId: "1"
  };
  const oggetto2 = {
    userType: "ConA", status: "ritirato",
    id: "#145825", reservationDate: "10/11/24", infoDate: "11/11/24", shopId: "1", customerId: "2"
  };
  const oggetto3 = {
    userType: "ConA", status: "accettato",
    id: "#145825", reservationDate: "10/11/24", infoDate: "11/11/24", shopId: "1"
  };
  const oggetto4 = {
    userType: "ConA", status: "rifiutato",
    id: "#145825", reservationDate: "10/11/24", infoDate: "11/11/24", shopId: "1"
  };
  const oggetto5 = {
    userType: "ConA", status: "prenotato",
    id: "#145825", reservationDate: "10/11/24", infoDate: "11/11/24", shopId: "1"
  };


 
  const mockPrenotations = Array.from({ length: 50 }, (_, index) => {
    const reservationStatuses = ["prenotato", "accettato", "rifiutato", "daRitirare", "ritirato"];
    const randomStatus = reservationStatuses[Math.floor(Math.random() * reservationStatuses.length)];
    const randomDate = (offset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        return date.toLocaleDateString("it-IT");
    };
    return {
        id: `#${100000 + index}`, // ID univoco
        userType: "ConA", // Tipo utente
        status: randomStatus, // Stato casuale
        reservationDate: randomDate(-index), // Data prenotazione (retroattiva rispetto all'indice)
        infoDate: randomDate(-(index - 1)), // Data info successiva
        shopId: `${Math.floor(Math.random() * 10) + 1}`, // ID negozio casuale
    };
});

 

  const [prenotations, setPrenotations] = useState([]); // Stato per le prenotazioni
  const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina attuale
  const prenotationsPerPage = 5; // Numero di prenotazioni per pagina

  const fetchPrenotations = (page) => {
    // Recupera le prenotazioni per la pagina attuale
    const startIndex = (page - 1) * prenotationsPerPage;
    const endIndex = startIndex + prenotationsPerPage;
    const pagePrenotations = mockPrenotations.slice(startIndex, endIndex);

    setPrenotations(pagePrenotations);
  };

     // Effetto per caricare le prenotazioni quando cambia la pagina
     useEffect(() => {
      fetchPrenotations(currentPage); 
  }, [currentPage]);

  return (
    <>
      <div className="prenHeader">
        <h1>Prenotazioni</h1>
      </div>
      <div className="prenBar">
        <PrenotationSearch first="Tutto" second="Accettato" third="Rifiutato" fourth="Prenotato" fifth="Da Ritirare" sixth="Ritirato" />
      </div>
      <div className="prenotations">

      {prenotations.map((prenotation) => (
          <ReservationLong
            userType={prenotation.userType}
            status={prenotation.status}
            id={prenotation.id}
            reservationDate={prenotation.reservationDate}
            infoDate={prenotation.infoDate}
            shopId={prenotation.shopId}
          />
        ))}

      </div>
      <div className="prenButton">
        <ButtonSucessivo onclick={() => setCurrentPage(currentPage + 1)} />
      </div>

    </>
  )
}

export default TestIsa
