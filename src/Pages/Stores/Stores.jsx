import React, { useState, useEffect } from "react";
import MapComponent from "../../Components/MapComponent/MapComponent";
import CardLongList from "../../Components/CardLongList/CardLongList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ButtonFilter from "../../Components/ButtonFilter/ButtonFilter";
import "./Stores.css";
import { useCategoryContext } from "../../Context/CategoryContex";
import { fetchStore } from "./Updater/StoreUpdater";
import LoadingPage from "../LoadingPage/LoadingPage"; 





const Stores = () => {
  // Stato per memorizzare la posizione dell'utente
  const [userPosition, setUserPosition] = useState([41.1039637, 16.878227]);
  // Stato per memorizzare il centro attuale della mappa
  const [mapCenter, setMapCenter] = useState([41.1039637, 16.878227]);
  // Stato per i negozi vicini al centro della mappa
  const [stores, setStores] = useState([]);
  // Stato per memorizzare l'id del negozio selezionato
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  // Stato per memorizzare i negozi ordinati per distanza (dal centro o dal negozio selezionato)
  const [sortedStores, setSortedStores] = useState([]);


  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [error, setError] = useState(null); // Stato per gli errori

  const [requestParams, setRequestParams] = useState({
    minPrezzo: null,
    maxPrezzo: null,
    filterPrezzoOfferta: null,
    categories: null,           //Es. ["Vegano", "Bio"]
    sortOrder: [null, null],    //sortOrder[0] = prezzoCrescente/prezzoDecrescente/null
    //sortOrder[1] = nome/rilevanza/vicinanza/null
    //Possibile combinare prezzo e uno tra nome e rilevanza

    maxDistance: 2,
  });

  const [zoomLevel, setZoomLevel] = useState("13");
  // Effetto che si attiva ogni volta che cambia il centro della mappa
  useEffect(() => {

    let maxDistanceLimit;

    if (zoomLevel >= 16) {
      maxDistanceLimit = 1;
    } else if (zoomLevel >= 15) {
      maxDistanceLimit = 2;
    } else if (zoomLevel >= 14) {
      maxDistanceLimit = 3;
    } else if (zoomLevel >= 13) {
      maxDistanceLimit = 5;
    } else if (zoomLevel >= 10) {
      maxDistanceLimit = 100;
    } else {
      maxDistanceLimit = 150;
    }
 

    let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

    const getStore = async () => {
      try {
        const storeData = await fetchStore(userPosition, mapCenter, maxDistanceLimit); // Usa la funzione dal modulo
        if (isMounted) {
          setStores(storeData); // Aggiorna lo stato dei negozi vicini
          setSortedStores(storeData); // Aggiorna lo stato dei negozi ordinati
          setLoading(false); // Ferma il caricamento

        }
      } catch (err) {
        if (isMounted) {
          setError(err.message); // Gestisci l'errore
          setLoading(false);
        }
      }
    };

    getStore();

    // Salva la pagina corrente nel sessionStorage
    // sessionStorage.setItem('currentPage', currentPage);

    // Cleanup: evita aggiornamenti su componenti smontati
    return () => {
      isMounted = false;
    };





  }, [mapCenter, zoomLevel]); // Dipendenza: mapCenter (si aggiorna quando cambia)


  useEffect(() => {
    console.log("da store", stores);
  }, [stores]);


  // Funzione per gestire il clic su un negozio (aggiorna lo stato del negozio selezionato)
  const handleStoreClick = (id) => {
    console.log("sad", id);
  };


  const handleMapZoom = (zoomLevel) => {
    console.log("Livello di zoom aggiornato:", zoomLevel);
    setZoomLevel(zoomLevel);
  };

  // Funzione per gestire lo spostamento della mappa (aggiorna il centro della mappa)
  const handleMapMove = (newCenter) => {
    console.log("Nuovo centro mappa:", newCenter); // Log del nuovo centro della mappa
    setMapCenter(newCenter); // Aggiorna lo stato del centro della mappa
    console.log("posizione utente", userPosition);
  };

  const { category: categoryList } = useCategoryContext();
  const orderNames = ["Nome", "Rilevanza", "Valutazione"];
  const filterNames = [...categoryList.map((cat) => cat.categoryName)];

  if (loading) return <div> <LoadingPage /> </div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div>
      <div className="shops-header">
        <h1>Negozi</h1>
      </div>
      <div className="shop-header">
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="filterButton">
          <ButtonFilter order={orderNames} filter={filterNames} type="ConA, Neg" />
        </div>
      </div>

      {/* Wrapper per la mappa */}
      <div className="map-wrapper">
        <div className="map-container">
          <MapComponent
            userPosition={userPosition} // Passa la posizione dell'utente al componente mappa
            stores={stores} // Passa i negozi vicini al componente mappa
            onStoreClick={handleStoreClick} // Funzione da chiamare quando si clicca su un negozio
            onMapMove={handleMapMove} // Funzione da chiamare quando la mappa si sposta
            onMapZoom={handleMapZoom} // Funzione per aggiornare il livello di zoom
          />
        </div>
      </div>
      <div className="svg-divider-shops">
        <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
        </svg>
      </div>

      <div className="cards-shop-container">
        <CardLongList
          /*title={selectedStoreId
            ? `Negozi Vicini a "${stores.find((store) => store.id === selectedStoreId)?.name}"`
            : "Negozi Vicini al Centro della Mappa"} */
          shops={sortedStores}
          type="shop"
        />
      </div>
    </div>
  );
};

export default Stores


/*
quando fai richiesta al db, fai richiesta con cordinate di ne4j, per vicinanza, ma metti limite di quantita negozi dopo aver ordinato

Quando cerchi un negozio, da quary fai restituire coordinate e non direttamente negozio

Se riesci, quando clicchi negozio su lista, ti appare in mappa
*/

/*
 // Funzione per caricare i negozi dal backend
  const fetchStores = async () => {
    try {
      // Effettua una richiesta GET al backend con i parametri delle coordinate
      const response = await axios.get("/api/stores", {
        params: {
          latitude: mapCenter[0],
          longitude: mapCenter[1],
          maxDistance: 5000, // Distanza massima in metri
        },
      });

      // Salva i negozi vicini nello stato
      const nearbyStores = response.data;
      setStores(nearbyStores);

      // Ordina i negozi per distanza
      const sortedByDistance = [...nearbyStores].sort((a, b) => a.distance - b.distance);
      setSortedStores(sortedByDistance);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Effetto per aggiornare i negozi quando cambia il centro della mappa
  useEffect(() => {
    fetchStores();
  }, [mapCenter]); // Dipendenza: mapCenter
*/