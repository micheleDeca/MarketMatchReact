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


const TestIsa = () => {

  /*const buttonComponents = {
     img: "https://img.freepik.com/vettori-premium/modello-di-logo-vettoriale-dell-icona-del-negozio-del-negozio_917138-2083.jpg",
     name: "GESTIONE NEGOZIO",
     descrizione: "descrizione"
   }*/

     const orderNames = ["Prezzo crescente", "Prezzo decrescente", "Quantità", "Nome", "Rilevanza"];
     const filterNames = ["Bio","Senza Lattosio", "Senza Glutine", "Vegetariano", "Vegano", "Km 0", "Prodotti in promozione", "Più vicini a te"];

      return(
        <FilterPopUp order = {orderNames} filter = {filterNames}/>
      )
  }

export default TestIsa
