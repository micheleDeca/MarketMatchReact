import React from "react";
import "./TestAntonio.css";
//import ShopWindow from "../../../Components/shop_window/shop_window";
//import PrenStatusFilter from "../../../Components/Prenotation_status_filter/Prenotation_status_filter";
//import SearchBar from "../../../Components/SearchBar/SearchBar";
//import PrenotationSearch from "../../../Components/PrenotationSearch/PrenotationSearch";
import GreenPoints from "../../../Components/GreenPoints/GreenPoints";
import CO2 from "../../../Components/C02/CO2";
//import ZigZag from "../../../Components/zig-zag/zig-zag";
//import Orari from "../../../Components/orari_negozio/orari_negozio";

const TestAntonio = () => {
  return (
    <div className="AntonioTest">
      {/*
      <PrenStatusFilter
        first="tutto"
        second="accettato"
        third="rifiutato"
        fourth="da&nbsp;ritirare"
        fifth="ritirato"
      />
      */}
      {/*<SearchBar />*/}
      {/*
    <PrenotationSearch
        first="tutto"
        second="accettato"
        third="rifiutato"
        fourth="da ritirare"
      />
      */}
      {/*
      <ZigZag>
        <p>uui6i76i</p>
      </ZigZag>
      */}
      {/*
      <Orari
      mode="neg"
        lunedi="09:00-13:00/15:30-19:00"
        martedi="09:00-13:00/15:30-19:00"
        mercoledi="09:00-13:00/15:30-19:00"
        giovedi="09:00-13:00/15:30-19:00"
        venerdi="09:00-13:00/15:30-19:00"
        sabato="09:00-13:00/15:30-19:00"
        domenica="chiuso"
        posizione="Lombardia,Mi,20100,Milano,Via Roma 1"
        contatti="02 1234567"
      />
      */}
      {/*
      <ShopWindow
        Description="Una bottiglia riutilizzabile ed ecologica realizzata in acciaio inossidabile di alta qualità, progettata per mantenere le bevande calde per 12 ore e fredde per 24 ore. Leggera, resistente e priva di BPA, è ideale per l'uso quotidiano e le attività outdoor. Disponibile in vari colori."
        ImageDescription="immagine prodotto"
        Name="nome prodotto"
        tipo="prodotto"
        Prezzo="prezzo prodotto"
      />
      */}
      <GreenPoints points={1080} />
      <p>try</p>
      <CO2 points={1080} />
    </div>
  );
};

export default TestAntonio;
