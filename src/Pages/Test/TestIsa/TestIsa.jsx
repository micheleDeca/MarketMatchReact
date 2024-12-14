import React from 'react'
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
  const buttonComponents = {
    img: "https://img.freepik.com/vettori-premium/modello-di-logo-vettoriale-dell-icona-del-negozio-del-negozio_917138-2083.jpg",
    name: "GESTIONE NEGOZIO",
    descrizione: "descrizione"
  }

  return (
    <>
      <div>
        <br /><br /><br /><br /><br /><br /><br />
        <h2>Isabella Page</h2> <br /><br />
      </div>

      <div className="prenHeader">
        Prenotazioni
      </div>
      <div className="prenBar">
        <PrenotationSearch first="Tutto" second="Accettato" third="Rifiutato" fourth="Prenotato" fifth="Da Ritirare" sixth="Ritirato" />
      </div>
      <div className="prenotations">
        <ReservationLong userType="NegA" status="daRitirare"
          id="#145825" reservationDate="10/11/24" infoDate="11/11/24" customerId="1" />
        <ReservationLong userType="NegA" status="ritirato"
          id="#145825" reservationDate="10/11/24" infoDate="11/11/24" customerId="1" />
        <ReservationLong userType="NegA" status="accettato"
          id="#145825" reservationDate="10/11/24" infoDate="11/11/24" customerId="1" />
        <ReservationLong userType="NegA" status="rifiutato"
          id="#145825" reservationDate="10/11/24" infoDate="11/11/24" customerId="1" />
        <ReservationLong userType="NegA" status="prenotato"
          id="#145825" reservationDate="10/11/24" infoDate="11/11/24" customerId="1" />
      </div>
      <div className="prenButton">
        <ButtonSucessivo />
      </div>

    </>
  )
}

export default TestIsa
