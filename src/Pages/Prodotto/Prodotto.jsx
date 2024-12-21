import { useState } from "react";
import Button from "../../Components/Button/Button";
import Caratteristiche from "../../Components/Caratteristiche/Caratteristiche";
import ShopWindow from "../../Components/shop_window/shop_window";
import "./Prodotto.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";

function Prodotto(props) {

  const [prodottoInfo, setProdottoInfo] = useState({
    nome: "Inserire nome prodotto",
    foto: "inserire_immagine.jpg",
    descrizione: "Inserire descrizione del prodotto",
    categorie: ["Inserire categoria"],
    prezzo: {
      scontato: "0.00",
      base: "0.00",
    },
    caratteristiche: {
      PesoDimensioniUnitaria: "Inserire unità di misura",
      DescrizioneUnita: "Inserire descrizione unità",
      Quantità: "Inserire quantità",
      disponibile: false,
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
          <ShopWindow
              Description={prodottoInfo.descrizione}
              ImageDescription={prodottoInfo.foto}
              Name={prodottoInfo.nome}
              tipo="prodotto"
              currentPrice={prodottoInfo.prezzo.scontato + "€"}
              originalPrice={prodottoInfo.prezzo.base + "€"}
              modify={setModify}
              badges={prodottoInfo.categorie}
              mode={props.mode}
          />
          <Caratteristiche peso={"Venduto in: " + prodottoInfo.caratteristiche.PesoDimensioniUnitaria}
                           quantita={prodottoInfo.caratteristiche.Quantità + " " + prodottoInfo.caratteristiche.PesoDimensioniUnitaria}
                           dimensioni={prodottoInfo.caratteristiche.DescrizioneUnita}
                           modify={setModify}
                           tipo={props.mode}
                           disponibile={prodottoInfo.caratteristiche.disponibile}/>
        </div>
      </>
  );
}

export default Prodotto;
