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

// Simula un database di prodotti
const mockProducts = Array.from({ length: 4 }, (_, index) => {
  const hasDiscount = Math.random() > 0.4; // 50% di probabilità di avere uno sconto

  // Funzione per generare badge casuali
  const generateBadges = () => {
    const possibleBadges = [
      { text: "Bio", backgroundColor: "#4caf50" },
      { text: "Senza lattosio", backgroundColor: "#2196f3" },
      { text: "Vegan", backgroundColor: "#ff9800" },
      { text: "Senza glutine", backgroundColor: "#9c27b0" },
    ];

    // Numero casuale di badge (1-3)
    const badgeCount = Math.floor(Math.random() * 3) + 1;

    // Seleziona casualmente `badgeCount` badge unici
    return possibleBadges.sort(() => 0.5 - Math.random()).slice(0, badgeCount);
  };

  return {
    id: index + 1,
    productName: `Prodotto ${index + 1}`,
    detail: `Dettaglio del prodotto ${index + 1}`,
    currentPrice: (Math.random() * 100).toFixed(2) + "€",
    originalPrice: hasDiscount
      ? (Math.random() * 100 + 100).toFixed(2) + "€"
      : null, // Solo se ha sconto
    image: `https://via.placeholder.com/150?text=Prodotto+${index + 1}`,
    badges: generateBadges(), // Aggiunge i badge generati
  };
});

function Negozio() {
  const { userType } = useUserContext();
  const [modify, setModify] = useState("");
  const location = useLocation();
  const { id } = location.state || {}; // Fallback se `state` è null
  const [negozioInfo, setNegozioInfo] = useState([]);
  const token = getToken();
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID", id);
    if (!IS_MOCKKED) {
      const getShop = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/store/getShop`,
            {
              negozioUuid: 'e9fddc4f-87f8-40b7-abaf-df67f1817ea3',
              userLatitude: 41.1090642,
              userLongitude: 16.8719847,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Token di autenticazione
              },
            }
          );
          setNegozioInfo(response.data);
          setLoading(false);
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
      });
      setLoading(false);
    }
  }, []);
/*
  useEffect(() => {
    if (!IS_MOCKKED) {
        const getProductShop = async () => {
            try {
              const response = await axios.post(
                `${BASE_URL}/api/store/getShop`,
                {
                  negozioUuid: 'e9fddc4f-87f8-40b7-abaf-df67f1817ea3',
                  userLatitude: 41.1090642,
                  userLongitude: 16.8719847,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Token di autenticazione
                  },
                }
              );
              setNegozioInfo(response.data);
              setLoading(false);
            } catch (error) {
              setError(error.message); // Gestisci l'errore
              setLoading(false);
            }
          };
          getShop();
    } else {
    }
         },[]);
*/

  useEffect(() => {
    console.log("AAAA",negozioInfo);
       },[negozioInfo]);

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
          negozioInfo={negozioInfo}
          setNegozioInfo={setNegozioInfo}
        />
      </div>
      <div className="boxNegozio">
        <div className="star">
          <Stelle starNumber={1} />
        </div>
        <ShopWindow
          ImageDescription="/prodotto/10.jpg"
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
          contatti={
            negozioInfo.Cellulare + ", " + negozioInfo.Mail
          }
          modify={setModify}
        />
        <ProductLongList title="Prodotti in vendita" products={mockProducts} />
      </div>
    </>
  );
}

export default Negozio;
