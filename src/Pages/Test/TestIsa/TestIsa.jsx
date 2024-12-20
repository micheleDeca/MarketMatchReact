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
import ButtonPrecedente from '../../../Components/ButtonPrecedente/ButtonPrecedente'
import ButtonFilter from '../../../Components/ButtonFilter/ButtonFilter'
import FilterElement from '../../../Components/ButtonFilter/FilterPopUp/FilterElement/FilterElement'
import FilterPopUp from '../../../Components/ButtonFilter/FilterPopUp/FilterPopUp'

import animation1 from "./assets/5oakBWG66Z.json";
import animation2 from "./assets/xbjrmvz4zi.json"
import animation3 from "./assets/Zxcvc5b9DH.json"
import animation4 from "./assets/vJtKTxTsTl.json" 
import Lottie from 'react-lottie-player'  


const TestIsa = () => {

  /*const buttonComponents = {
     img: "https://img.freepik.com/vettori-premium/modello-di-logo-vettoriale-dell-icona-del-negozio-del-negozio_917138-2083.jpg",
     name: "GESTIONE NEGOZIO",
     descrizione: "descrizione"
   }*/

  const gestioneNeg = {
    img: "TDET",
    name: "GESTIONE NEGOZIO",
    descrizione: "Organizza il tuo negozio, gestisci orari, informazioni, categorie e monitoraggio delle attività in semplici passi",
    animation: animation2
  }

  const prodotti = {
    img: "CB",
    name: "PRODOTTI",
    descrizione: "Gestisci il catalogo dei tuoi prodotti, aggiungi dettagli, prezzi e categorie per ottimizzare le vendite sulla piattaforma",
    animation: animation4
  } 

  const prenotazioni = {
    img: "BV",
    name: "PRENOTAZIONI",
    descrizione: "Monitora e gestisci le prenotazioni ricevute dai clienti, garantendo un servizio puntuale ed efficiente",
    animation: animation1
  }

  const impostazioni = {
    img: "BV",
    name: "IMPOSTAZIONI",
    descrizione: "Aggiorna le informazioni del tuo profilo, gestisci i dati personali e le impostazioni dell'account",
    animation: animation3
  }

  return (
    <>
     <div className="accountHeader">
      <h1>
        Il mio Account
      </h1>
      </div>
      <div className="sezButtons">
      <SezioneAccount info={gestioneNeg}/>
      <SezioneAccount info={prodotti}/>
      <SezioneAccount info={prenotazioni}/>
      </div>
      <div className="profButton">
      <SezioneAccount info={impostazioni}/>
      </div>
    </>
  )
}

export default TestIsa
