import { useState } from "react";
import Button from "../../Components/Button/Button";
import Caratteristiche from "../../Components/Caratteristiche/Caratteristiche";
import ShopWindow from "../../Components/shop_window/shop_window";
import "./Prodotto.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";

function Prodotto(props) {

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
              badges={prodottoInfo.categorie}
              mode="neg"
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
