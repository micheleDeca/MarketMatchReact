import React from 'react'
import './TestIsa.css'
import Caratteristiche from '../../../Components/Caratteristiche/Caratteristiche'
import DataRitiro from '../../../Components/DataRitiro/DataRitiro'
import DettaglioPrenotazione from '../../../Components/DettaglioPrenotazione/DettaglioPrenotazione'
import SezioneAccount from '../../../Components/SezioneAccount/SezioneAccount'
import Stelle from '../../../Components/Stelle/Stelle'

const TestIsa = () => {
  const buttonComponents={
    img: "https://img.freepik.com/vettori-premium/modello-di-logo-vettoriale-dell-icona-del-negozio-del-negozio_917138-2083.jpg",
    name: "GESTIONE NEGOZIO",
    descrizione: "descrizione"
  }

  return (
    <>
    <div>
      <br/><br/><br/><br/><br/><br/><br/>
      <h2>Isabella Page</h2> <br/><br/>
    </div>
    <Stelle starNumber="3" />

    </>
  )
}

export default TestIsa
