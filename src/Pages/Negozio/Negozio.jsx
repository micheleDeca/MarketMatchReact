import Orari from "../../Components/orari_negozio/orari_negozio";
import ProductLongList from "../../Components/CardLongList/CardLongList";
import ShopWindow from "../../Components/shop_window/shop_window";
import Stelle from "../../Components/Stelle/Stelle";
import "./Negozio.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify";
import axios from "axios";
import { BASE_URL, IS_MOCKKED } from "../../config.js";
import { useState, useEffect } from "react";
import { getToken } from "../../LocalStorage/TokenStorage.jsx";
import { useUserContext } from "../../Context/UserContext";
import { useLocation } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

function Negozio() {
  const { databaseKey, userType } = useUserContext();
  const [modify, setModify] = useState("");
  const location = useLocation();
  const { id } = location.state || {}; // Fallback se `state` è null
  const [negozioInfo, setNegozioInfo] = useState({
    OrarioNegozio: [], // Preimpostazione per prevenire errori
  });
  const [prodottiInfo, setProdottiInfo] = useState({});
  const token = getToken();
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!IS_MOCKKED) {
      const getShop = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/store/getShop`, {
            params: {
              negozioUuid: id || databaseKey, // Pass negozioUuid as a query parameter
              userLatitude: 41.1090642, // Pass userLatitude as a query parameter
              userLongitude: 16.8719847, // Pass userLongitude as a query parameter
            },
            headers: {
              Authorization: `Bearer ${token}`, // Token di autenticazione
            },
          });
          setNegozioInfo(response.data);
        } catch (error) {
          setError(error.message); // Gestisci l'errore
          setLoading(false);
        }
      };
      getShop();
    } else {
      setNegozioInfo({
        PIVA: "12345678901",
        Categorie: ["Vegetariano", "Vegano"],
        distanza: 894.5697906958642,
        RagioneSociale: "BioMarket S.r.l.",
        Regione: "Puglia",
        Descrizione: "Negozio di prodotti biologici e naturali",
        Logo: "https://example.com/logo.png",
        Cap: "70121",
        Mail: "info@biomarket.com",
        Cellulare: "3214567890",
        InformazioniPagamento: "Accetta carta, contanti e app",
        Indirizzo: "Via Roma 10",
        Città: "Bari",
        OrarioNegozio: [
          "08:00-20:00",
          "08:00-13:00/16:00-20:00",
          "08:00-20:00",
          "08:00-20:00",
          "08:00-20:00",
          "08:00-20:00",
          "09:30-12:30",
        ],
        Provincia: "BA",
        Valutazione: 4,
      });
    }
  }, []);

  useEffect(() => {
    if (!IS_MOCKKED) {
      const getProductShop = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/store/getShopProducts`,
            {
              params: {
                negozioUuid: id || databaseKey, // Pass the negozioUuid as a query parameter
              },
              headers: {
                Authorization: `Bearer ${token}`, // Token di autenticazione
              },
            }
          );
          setProdottiInfo(response.data);
        } catch (error) {
          setError(error.message); // Gestisci l'errore
          setLoading(false);
        }
      };
      getProductShop();
    } else {
      setProdottiInfo([
        {
          productName: "Pane Integrale Bio",
          detail: "Pane 100% integrale con ingredienti biologici.",
          currentPrice: 3.5,
          image: "test/2.webp",
          badges: ["Bio"],
        },
        {
          productName: "Yogurt Bio con Mirtilli",
          detail: "Yogurt biologico con mirtilli freschi, senza lattosio.",
          currentPrice: 2.5,
          image: "test/4.jpeg",
          badges: ["Vegano", "Bio", "Vegetariano"],
        },
        {
          productName: "Burger Vegetale Proteinico",
          detail:
            "Burger vegetale ad alto contenuto proteico, perfetto per sportivi.",
          currentPrice: 4.99,
          image: "test/5.webp",
          badges: ["Vegano"],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (prodottiInfo) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 1000 ms = 1 secondo

      // Pulizia del timer in caso di cambiamenti rapidi
      return () => clearTimeout(timer);
    }
  }, [prodottiInfo]);

  useEffect(() => {
    if (!loading) {
      const updateStore = async () => {
        try {
          const response = await axios.patch(
            `${BASE_URL}/api/store/UpdateStore`,
            {
              negozioUuid: id || databaseKey,
              input: negozioInfo,
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
      updateStore();
    }
  }, [negozioInfo]);

  useEffect(() => {
    if (!loading) {
      const updateStoreCategories = async () => {
        try {
          const response = await axios.put(
            `${BASE_URL}/api/store/UpdateStoreCategories`,
            {
              negozioUuid: id || databaseKey,
              newCategories: negozioInfo.Categorie,
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
      updateStoreCategories();
    }
  }, [negozioInfo]);

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
            negozioInfo={negozioInfo}
            setNegozioInfo={setNegozioInfo}
          />
        </div>
        <div className="boxNegozio">
          <div className="star">
            <Stelle starNumber={negozioInfo.Valutazione} />
          </div>
          <ShopWindow
            ImageDescription={negozioInfo.Logo}
            Description={negozioInfo.Descrizione}
            Name={negozioInfo.RagioneSociale}
            mode={userType}
            modify={setModify}
            badges={negozioInfo.Categorie}
          />
          <Orari
            mode={userType}
            lunedi={negozioInfo.OrarioNegozio[0]}
            martedi={negozioInfo.OrarioNegozio[1]}
            mercoledi={negozioInfo.OrarioNegozio[2]}
            giovedi={negozioInfo.OrarioNegozio[3]}
            venerdi={negozioInfo.OrarioNegozio[4]}
            sabato={negozioInfo.OrarioNegozio[5]}
            domenica={negozioInfo.OrarioNegozio[6]}
            posizione={
              negozioInfo.Regione +
              ", " +
              negozioInfo.Provincia +
              ", " +
              negozioInfo.Città +
              ", " +
              negozioInfo.Cap +
              ", " +
              negozioInfo.Indirizzo
            }
            contatti={negozioInfo.Cellulare + ", " + negozioInfo.Mail}
            modify={setModify}
          />

          <ProductLongList
            title="Prodotti in vendita"
            products={prodottiInfo}
            type={"product"}
          />
        </div>
      </>
    );
  }
}

export default Negozio;
