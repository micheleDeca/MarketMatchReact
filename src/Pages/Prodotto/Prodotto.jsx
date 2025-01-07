import "./Prodotto.css";
import Button from "../../Components/Button/Button";
import Caratteristiche from "../../Components/Caratteristiche/Caratteristiche";
import ShopWindow from "../../Components/shop_window/shop_window";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";
import CounterAddGood from "../../Components/CounterAddGood/CounterAddGood.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, IS_MOCKKED } from "../../config.js";
import { useState, useEffect } from "react";
import { getToken } from "../../LocalStorage/TokenStorage.jsx";
import { useUserContext } from "../../Context/UserContext";
import { data, useLocation } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

function Prodotto() {
  const { databaseKey, userType } = useUserContext();
  const [modify, setModify] = useState("");
  const location = useLocation();
  const { id } = location.state || {}; // Fallback se `state` è null
  const [prodottoInfo, setProdottoInfo] = useState([]);
  const token = getToken();
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!IS_MOCKKED && id != "4366c62e-d77b-4cdd-b27e-09a12656f4a9") {
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
        } catch (error) {
          setError(error.message); // Gestisci l'errore
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
        originalPrice: parseFloat("3.20"),
        currentPrice: parseFloat("2.00"),
        PesoDimensioniUnitaria: "pacchetto",
        NomeNegozio: "Bio e Vegan Delights",
        Offerta: true,
      });
    }
  }, []);

  useEffect(() => {
    if (prodottoInfo) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 1000 ms = 1 secondo

      // Pulizia del timer in caso di cambiamenti rapidi
      return () => clearTimeout(timer);
    }
  }, [prodottoInfo]);

  useEffect(() => {
    if (!loading && id != "4366c62e-d77b-4cdd-b27e-09a12656f4a9") {
      const updateProduct = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/product/UpdateProduct`,
            {
              productId: id,
              input: prodottoInfo,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Token di autenticazione
              },
            }
          );
        } catch (error) {
          setError(error.message); // Gestisci l'errore
        }
      };
      updateProduct();
    }
  }, [prodottoInfo]);

  useEffect(() => {
    if (!loading && id != "4366c62e-d77b-4cdd-b27e-09a12656f4a9") {
      const updateProductCategories = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/product/UpdateProductCategories`,
            {
              productId: id,
              newCategories: prodottoInfo.Categorie,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Token di autenticazione
              },
            }
          );
        } catch (error) {
          setError(error.message); // Gestisci l'errore
        }
      };
      updateProductCategories();
    }
  }, [prodottoInfo]);

  useEffect(() => {
    if (id == "4366c62e-d77b-4cdd-b27e-09a12656f4a9") {
      setProdottoInfo({
        Quantità: 0,
        DescrizioneUnita: "Inserisci descrizione unità",
        Descrizione: "Inserisci descrizione prodotto",
        Categorie: ["Inserisci categoria"],
        Nome: "Inserisci nome prodotto",
        Foto: "Inserisci foto prodotto",
        Disponibile: false,
        currentPrice: parseFloat("0.0"),
        PesoDimensioniUnitaria: "Inserisci peso/dimensioni unità",
        Offerta: false,
      });
    }
  }, []);

  const CreateProduct = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/product/CreateProduct`,
        {
          product: prodottoInfo,
          newCategories: prodottoInfo.Categorie,
          shop: databaseKey,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token di autenticazione
          },
        }
      );
      navigate("/prodotti", { state: { id: databaseKey } });
    } catch (error) {
      setError(error.message); // Gestisci l'errore
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else if (error) {
    return <div>Errore: {error}</div>;
  } else {
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
          {userType === "ConA" && (
            <div className="containerProdotto">
              <span className="spaceProdotto">
                <span onClick={() => navigate("/negozio", { state: { id: prodottoInfo.IdNegozio } })} style={{ cursor: "pointer"}}>
                {`${prodottoInfo.NomeNegozio}`}
                {` (${prodottoInfo.DistanzaKm.toFixed(2)} km)`}
                </span>
              </span>
              <span className="spaceProdotto2"></span>
            </div>
          )}
          {userType === "NegA" &&
            id != "4366c62e-d77b-4cdd-b27e-09a12656f4a9" && (
              <div className="containerProdotto">
                <span className="spaceProdotto"></span>
                <span className="spaceProdotto2">
                  <Button name="Elimina Prodotto" modify={setModify} />
                </span>
              </div>
            )}
          {userType === "NegA" &&
            id == "4366c62e-d77b-4cdd-b27e-09a12656f4a9" && (
              <div className="containerProdotto">
                <span className="spaceProdotto"></span>
                <span className="spaceProdotto2">
                  <Button name="Salva" function={CreateProduct} />
                </span>
              </div>
            )}
          <ShopWindow
            Description={prodottoInfo.Descrizione}
            ImageDescription={prodottoInfo.Foto}
            Name={prodottoInfo.Nome}
            tipo="prodotto"
            currentPrice={prodottoInfo.currentPrice}
            originalPrice={prodottoInfo.originalPrice}
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
}

export default Prodotto;
