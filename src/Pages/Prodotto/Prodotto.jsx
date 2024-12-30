import { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import Caratteristiche from "../../Components/Caratteristiche/Caratteristiche";
import ShopWindow from "../../Components/shop_window/shop_window";
import "./Prodotto.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";
import { useUserContext } from "../../Context/UserContext";
import CounterAddGood from "../../Components/CounterAddGood/CounterAddGood.jsx";
import { useLocation } from "react-router-dom";
import { getToken } from "../../LocalStorage/TokenStorage.jsx";
import axios from 'axios';

function Prodotto() {
  const { userType } = useUserContext();
  const [modify, setModify] = useState("");
  const { id } = location.state || {}; // fallback per evitare errori se `state` è null
  const [prodottoInfo, setProdottoInfo] = useState({
    nome: "Latte di Mandorla Bio Senza Zuccheri Aggiunti",
    foto: "url_della_foto.jpg",
    descrizione: "Il Latte di Mandorla Bio Senza Zuccheri Aggiunti è una bevanda vegetale di altissima qualità, ottenuta esclusivamente da mandorle biologiche selezionate. Ideale per chi cerca un’alternativa sana e gustosa al latte tradizionale, questo prodotto è completamente privo di zuccheri aggiunti e additivi chimici. Perfetto per essere utilizzato a colazione con cereali, come base per frullati o anche in ricette dolci e salate. Grazie al suo sapore delicato e alla consistenza cremosa, si presta benissimo per essere gustato caldo o freddo. Ogni confezione è studiata per preservare al meglio le proprietà organolettiche del prodotto, offrendo al consumatore una bevanda ricca di nutrienti naturali come vitamina E, calcio e magnesio. Adatto a vegani e vegetariani, è un prodotto amico dell’ambiente, confezionato in un packaging sostenibile e riciclabile al 100%.",
    categorie: ["Bio", "Senza lattosio", "Vegan", "Senza glutine", "Km0", "Vegetariano"],
    prezzo: {
      scontato: "15.08",
      base: "28.22",
    },
    caratteristiche: {
      PesoDimensioniUnitaria: "pezzi",
      DescrizioneUnita: "Venduto in confezioni da 1Litro",
      Quantità: "150",
      disponibile: true,
    },
  });
  const token = "3dce594f8266d24d7ba7c2a28cc05495f4780afd1b04bf42618bbd09e24a26ca6eee28483f6c0929168e4a4715d042c2a959f8dc76392b3fc68ad1bf2eef2cfdcc7100e81b0f2500f0646d6fd72e1167eca126653ad5890d1a70a12a31c5fb089476a397696cb21a9990985678e8bf9c3880d4e83f495a072631509290b20366";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.post(
          `http://localhost:1337/api/product/getProduct`,
          {
            productId: "8d0a9ce8-1594-4e18-8d14-b100d031bdef",
            userLatitude: 41.1090642,
            userLongitude: 16.8719847,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token di autenticazione
            },
          }
        );
        setProdottoInfo(response.data);
      } catch (error) {
        console.error("Errore durante il recupero dei prodotti:", error);
        throw error;
      }
    };

    getProduct();
  }, []); //inserire prossimamente, aggiornamento in base ai filtri scelti
 
  return (
    <>
      <div
        className={`popup-edit${modify === "" ? "" : "-active"}` /*AGGIUNTO*/}
      >
        <PopUpModify
          modify={modify}
          setModify={setModify}
          negozioInfo={prodottoInfo}
          setNegozioInfo={setProdottoInfo}
        />
      </div>
      <div className="boxProdotto">
        <div className="containerProdotto">
          <span className="spaceProdotto"></span>
          <span className="spaceProdotto2">
            <Button name="Elimina Prodotto" />
          </span>
        </div>
        <ShopWindow
          Description={prodottoInfo.descrizione}
          ImageDescription={prodottoInfo.foto}
          Name={prodottoInfo.nome}
          tipo="prodotto"
          currentPrice={prodottoInfo.prezzo.scontato + "€"}
          originalPrice={prodottoInfo.prezzo.base + "€"}
          modify={setModify}
          badges={prodottoInfo.categorie}
          mode={userType}
        />
        {/*
        {userType === "ConA" && (
          <div className="CarrelloProd">
            <CounterAddGood />
          </div>
        )}
          */}
        <Caratteristiche
          peso={
            "Venduto in: " + prodottoInfo.caratteristiche.PesoDimensioniUnitaria
          }
          quantita={
            prodottoInfo.caratteristiche.Quantità +
            " " +
            prodottoInfo.caratteristiche.PesoDimensioniUnitaria
          }
          dimensioni={prodottoInfo.caratteristiche.DescrizioneUnita}
          modify={setModify}
          disponibile={prodottoInfo.caratteristiche.disponibile}
          tipo={userType}
        />
      </div>
    </>
  );
}

export default Prodotto;
