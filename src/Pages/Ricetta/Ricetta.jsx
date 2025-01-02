import "./Ricetta.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";
import ShopWindow from "../../Components/shop_window/shop_window.jsx";
import RecipesInformation from "../../Components/RecipesInformation/RecipesInformation.jsx";
import Ingredients from "../../Components/Ingredients/Ingredients.jsx";
import ProductLongList from "../../Components/CardLongList/CardLongList.jsx";
import axios from "axios";
import { BASE_URL, IS_MOCKKED } from "../../config.js";
import { useState, useEffect } from "react";
import { getToken } from "../../LocalStorage/TokenStorage.jsx";
import { useUserContext } from "../../Context/UserContext";
import { useLocation } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

function Ricetta() {
  const { userType } = useUserContext();
  const [modify, setModify] = useState("");
  const location = useLocation();
  const { id } = location.state || {}; // Fallback se `state` è null
  const [ricettaInfo, setRicettaInfo] = useState([]);
  const token = getToken();
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID", id);
    if (!IS_MOCKKED) {
      const getRecipe = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/recipe/getRecipe`,
            {
              recipeId: "fb8f2ed1-e0e2-4a99-aeee-4cff7d0906af",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Token di autenticazione
              },
            }
          );
          setRicettaInfo(response.data);
          setLoading(false);
        } catch (error) {
          setError(error.message); // Gestisci l'errore
          setLoading(false);
        }
      };
      getRecipe();
    } else {
      setRicettaInfo({
        TempoCottura: 30,
        Costo: 3,
        Descrizione: "Una zuppa nutriente e salutare a base di lenticchie e quinoa, arricchita con verdure fresche e spezie, ideale per i mesi più freddi.",
        Ingredienti: [
            {
                Quantita: "200g",
                Nome: "Pomodori pelati bio"
            },
            {
                Quantita: "200g",
                Nome: "Lenticchie bio"
            },
            {
                Quantita: "q.b.",
                Nome: "Sale e pepe"
            },
            {
                Quantita: "1 gambo",
                Nome: "Sedano bio"
            },
            {
                Quantita: "100g",
                Nome: "Quinoa bio"
            },
            {
                Quantita: "1L",
                Nome: "Brodo vegetale bio"
            },
            {
                Quantita: "2 medie",
                Nome: "Carote bio"
            },
            {
                Quantita: "2 cucchiai",
                Nome: "Olio extravergine d'oliva bio"
            },
            {
                Quantita: "1 cucchiaino",
                Nome: "Curcuma in polvere bio"
            },
            {
                Quantita: "1 media",
                Nome: "Cipolla bio"
            }
        ],
        TempoPreparazione: 10,
        Passaggi: [
            {
                Foto: "zuppa_lenticchie_quinoa/1.png",
                Titolo: "Preparare le verdure",
                Descrizione: "Tagliare a cubetti le carote, il sedano e la cipolla."
            },
            {
                Foto: "zuppa_lenticchie_quinoa/2.png",
                Titolo: "Soffriggere le verdure",
                Descrizione: "In una pentola, scaldare l'olio e soffriggere carote, sedano e cipolla per 5 minuti."
            },
            {
                Foto: "zuppa_lenticchie_quinoa/3.png",
                Titolo: "Aggiungere le lenticchie",
                Descrizione: "Unire le lenticchie alle verdure soffritte e mescolare per insaporire."
            },
            {
                Foto: "zuppa_lenticchie_quinoa/4.png",
                Titolo: "Versare il brodo",
                Descrizione: "Aggiungere il brodo vegetale caldo e i pomodori pelati, quindi portare a ebollizione."
            },
            {
                Foto: "zuppa_lenticchie_quinoa/5.png",
                Titolo: "Cuocere le lenticchie",
                Descrizione: "Cuocere a fuoco medio per circa 20 minuti, mescolando di tanto in tanto."
            },
            {
                Foto: "zuppa_lenticchie_quinoa/6.png",
                Titolo: "Aggiungere la quinoa",
                Descrizione: "Unire la quinoa sciacquata e la curcuma, continuando la cottura per altri 10 minuti."
            },
            {
                Foto: "zuppa_lenticchie_quinoa/7.png",
                Titolo: "Regolare di sale e pepe",
                Descrizione: "Aggiustare di sale e pepe secondo il gusto."
            },
            {
                Foto: "zuppa_lenticchie_quinoa/8.png",
                Titolo: "Servire",
                Descrizione: "Servire la zuppa calda, guarnita con un filo d'olio a crudo."
            }
        ],
        FotoRicetta: "zuppa_lenticchie_quinoa/zuppa_finale.png",
        Nome: "Zuppa di Lenticchie e Quinoa Bio",
        Difficoltà: 2,
        Porzioni: 4
      });
      setLoading(false);
    }
  }, []);

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
          negozioInfo={ricettaInfo}
          setNegozioInfo={setRicettaInfo}
        />
      </div>
      <div className="boxRicetta">
        <ShopWindow
          Description={ricettaInfo.Descrizione}
          ImageDescription={ricettaInfo.FotoRicetta}
          Name={ricettaInfo.Nome}
          modify={setModify}
          badges={ricettaInfo.categorie}
          mode={"ConA"}
        />
        <div className="Informazioni">
          <RecipesInformation
            difficolta={ricettaInfo.Difficoltà}
            preparazione={ricettaInfo.TempoPreparazione + " min"}
            cottura={ricettaInfo.TempoCottura + " min"}
            costo={ricettaInfo.Costo + "€"}
          />
        </div>
        <div className="Ingredienti">
          <Ingredients
            ingredienti={ricettaInfo.Ingredienti}
            name="Prenota prodotti"
          />
        </div>
        {
        <ProductLongList title="Preparazione" products={ricettaInfo.Passaggi} type={"recipe"}/>
        }
      </div>
    </>
  );
}

export default Ricetta;
