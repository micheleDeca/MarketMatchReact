import "./Prodotto.css";
import Button from "../../Components/Button/Button";
import Caratteristiche from "../../Components/Caratteristiche/Caratteristiche";
import ShopWindow from "../../Components/shop_window/shop_window";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";
import axios from "axios";
import CounterAddGood from "../../Components/CounterAddGood/CounterAddGood.jsx";
import { BASE_URL, IS_MOCKKED } from "../../config.js";
import { useState, useEffect } from "react";
import { getToken } from "../../LocalStorage/TokenStorage.jsx";
import { useUserContext } from "../../Context/UserContext";
import { useLocation } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

function Prodotto() {
  const { userType } = useUserContext();
  const [modify, setModify] = useState("");
  const location = useLocation();
  const { id } = location.state || {}; // Fallback se `state` è null
  const [prodottoInfo, setProdottoInfo] = useState([]);
  const token = getToken();
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID", id);
    if (!IS_MOCKKED) {
      const getProduct = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/product/getProduct`,
            {
              productId: id,
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
          setLoading(false);
        } catch (error) {
          setError(error.message); // Gestisci l'errore
          setLoading(false);
        }
      };
      getProduct();
    } else {
      setProdottoInfo({
        Quantità: 50,
        DescrizioneUnita: "Venduti in pacchetti da 200g",
        Descrizione: "Biscotti croccanti biologici senza glutine.",
        Categorie: ["Bio", "Senza Glutine"],
        Nome: "Biscotti Senza Glutine Bio",
        Foto: "/prodotto/10.jpg",
        Disponibile: true,
        DistanzaKm: 1.5536619549214765,
        Prezzo: "3.20",
        PrezzoOfferta: "2.00",
        PesoDimensioniUnitaria: "pacchetto",
        NomeNegozio: "Bio e Vegan Delights",
      });
      setLoading(false);
    }
  }, []); //inserire prossimamente, aggiornamento in base ai filtri scelti
  /*
  useEffect(() => {
    console.log("AAAA",prodottoInfo);
       },[prodottoInfo]);
  */
  if (loading)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  if (error) return <div>Errore: {error}</div>;

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
        {userType === "NegA" && (
          <div className="containerProdotto">
            <span className="spaceProdotto"></span>
            <span className="spaceProdotto2">
              <Button name="Elimina Prodotto" />
            </span>
          </div>
        )}
        <ShopWindow
          Description={prodottoInfo.Descrizione}
          ImageDescription={prodottoInfo.Foto}
          Name={prodottoInfo.Nome}
          tipo="prodotto"
          currentPrice={
            prodottoInfo.PrezzoOfferta ? prodottoInfo.PrezzoOfferta + "€" : ""
          }
          originalPrice={prodottoInfo.Prezzo + "€"}
          modify={setModify}
          badges={prodottoInfo.Categorie}
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
          peso={"Venduto in: " + prodottoInfo.PesoDimensioniUnitaria}
          quantita={prodottoInfo.Quantità}
          dimensioni={prodottoInfo.DescrizioneUnita}
          modify={setModify}
          disponibile={prodottoInfo.Disponibile}
          tipo={userType}
        />
      </div>
    </>
  );
}

export default Prodotto;
