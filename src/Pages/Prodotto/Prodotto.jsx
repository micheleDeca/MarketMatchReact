import { useState } from "react";
import Button from "../../Components/Button/Button";
import Caratteristiche from "../../Components/Caratteristiche/Caratteristiche";
import ShopWindow from "../../Components/shop_window/shop_window";
import "./Prodotto.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";

function Prodotto(props) {

  const [prodottoInfo, setProdottoInfo] = useState({
    nome: "Nome Prodotto",
    foto: "url_della_foto.jpg",
    descrizione:
      "Descrizione Prodotto, Descrizione Prodotto, Descrizione Prodotto...",
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

  const [modify, setModify] = useState("");

  return (
      <>
        <div className={`popup-edit${modify === "" ? "" : "-active"}`  /*AGGIUNTO*/}>
          <PopUpModify modify={modify} setModify={setModify} negozioInfo={prodottoInfo}
                       setNegozioInfo={setProdottoInfo}/>
        </div>
        <div className="boxProdotto">
          <div className="containerProdotto">
            <span className="spaceProdotto"></span>
            <span className="spaceProdotto2"><Button name="Elimina Prodotto"/></span>
          </div>
          <span>&nbsp;</span>
          <ShopWindow
              Description={prodottoInfo.descrizione}
              ImageDescription={prodottoInfo.foto}
              Name={prodottoInfo.nome}
              tipo="prodotto"
              currentPrice={prodottoInfo.prezzo.scontato + "€"}
              originalPrice={prodottoInfo.prezzo.base + "€"}
              modify={setModify}
              mode="neg"
              badges={prodottoInfo.categorie}
          />
          <span>&nbsp;</span>
          <Caratteristiche peso={"Venduto in: " + prodottoInfo.caratteristiche.PesoDimensioniUnitaria}
                           quantita={prodottoInfo.caratteristiche.Quantità + " " + prodottoInfo.caratteristiche.PesoDimensioniUnitaria}
                           dimensioni={prodottoInfo.caratteristiche.DescrizioneUnita}
                           modify={setModify}/>
        </div>
      </>
  );
}

export default Prodotto;
