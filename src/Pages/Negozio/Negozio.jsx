import Orari from "../../Components/orari_negozio/orari_negozio";
import ProductLongList from "../../Components/CardLongList/CardLongList";
import ShopWindow from "../../Components/shop_window/shop_window";
import Stelle from "../../Components/Stelle/Stelle";
import "./Negozio.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify";
import { useEffect, useState} from 'react';

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

function Negozio(props) {

  const [negozioInfo, setNegozioInfo] = useState({
    nome: "Nome Negozio",
    foto: "url_della_foto.jpg",
    descrizione:
      "Descrizione Negozio, Descrizione Negozio, Descrizione Negozio...",
    categorie: ["Bio", "Senza lattosio","Vegan","Senza glutine","Km0","Vegetariano"],
    orari: [
      { giorno: "Lunedì", orario: "09:00 - 13:00 / 15:30 - 19:30" },
      { giorno: "Martedì", orario: "09:00 - 13:00 / 15:30 - 19:30" },
      { giorno: "Mercoledì", orario: "09:00 - 13:00 / 15:30 - 19:30" },
      { giorno: "Giovedì", orario: "09:00 - 13:00 / 15:30 - 19:30" },
      { giorno: "Venerdì", orario: "09:00 - 13:00 / 15:30 - 19:30" },
      { giorno: "Sabato", orario: "09:00 - 13:00 / Chiuso" },
      { giorno: "Domenica", orario: "Chiuso" },
    ],
    posizione: {
      regione: "Regione",
      provincia: "Provincia",
      cap: "CAP",
      indirizzo: "Indirizzo - numero civico",
    },
    contatti: {
      telefono: "Telefono",
      mail: "Mail",
    },
    valutazione: 2,
  });

  const [modify, setModify] = useState("");

  return (
    <>  
      <PopUpModify modify={modify} negozioInfo={negozioInfo} setNegozioInfo={setNegozioInfo}/>
      <div className="boxNegozio">
        <Stelle starNumber={1} />
        <span>&nbsp;</span>
        <ShopWindow
          Description={negozioInfo.descrizione}
          ImageDescription="immagine prodotto"
          Name={negozioInfo.nome}
          mode="neg"
          modify={setModify}
          badges={negozioInfo.categorie}
        />
        <span>&nbsp;</span>
        <Orari
          mode="neg"
          lunedi={negozioInfo.orari[0].orario}
          martedi={negozioInfo.orari[1].orario}
          mercoledi={negozioInfo.orari[2].orario}
          giovedi={negozioInfo.orari[3].orario}
          venerdi={negozioInfo.orari[4].orario}
          sabato={negozioInfo.orari[5].orario}
          domenica={negozioInfo.orari[6].orario}
          posizione={
            negozioInfo.posizione.regione +', '+
            negozioInfo.posizione.provincia +', '+
            negozioInfo.posizione.cap +', '+
            negozioInfo.posizione.indirizzo
          }
          contatti={negozioInfo.contatti.telefono +', '+  negozioInfo.contatti.mail}
          modify={setModify}
        />
        <span>&nbsp;</span>
        <ProductLongList title="Prodotti in vendita" products={mockProducts} />
      </div>
    </>
  );
}

export default Negozio;
