import React, { useEffect, useState } from 'react'
import './TestIsa.css'
import Caratteristiche from '../../../Components/Caratteristiche/Caratteristiche'
import DataRitiro from '../../../Components/DataRitiro/DataRitiro'
import DettaglioPrenotazione from '../../../Components/DettaglioPrenotazione/DettaglioPrenotazione'
import SezioneAccount from '../../../Components/SezioneAccount/SezioneAccount'
import Stelle from '../../../Components/Stelle/Stelle'
import PrenotationSearch from '../../../Components/PrenotationSearch/PrenotationSearch'
import ButtonSucessivo from '../../../Components/ButtonSucessivo/ButtonSucessivo'
import ButtonPrecedente from '../../../Components/ButtonPrecedente/ButtonPrecedente'
import ButtonFilter from '../../../Components/ButtonFilter/ButtonFilter'
import FilterElement from '../../../Components/ButtonFilter/FilterPopUp/FilterElement/FilterElement'
import FilterPopUp from '../../../Components/ButtonFilter/FilterPopUp/FilterPopUp'
import PrenotazioneCarrello from '../../../Components/PrenotazioneCarrello/PrenotazioneCarrello'
import LuogoDataRitiro from '../../../Components/PrenotazioneCarrello/Luogo/LuogoDataRitiro'






const TestIsa = () => {



  return (
    <>
      <PrenotazioneCarrello numNeg="1" provincia="BT" citta="Barletta" cap="76121" indirizzo="via bochicchio infame" civico="12" contatti="3279876573"
        data="12/11/23" descrizione="3 giorni dalla preparazione dell'ordine" orari="9:00-16:00 dal lunedì al venerdì" />
    </>
  )
}

export default TestIsa
