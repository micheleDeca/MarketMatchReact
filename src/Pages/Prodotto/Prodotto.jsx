import Button from "../../Components/Button/Button";
import Caratteristiche from "../../Components/Caratteristiche/Caratteristiche";
import ShopWindow from "../../Components/shop_window/shop_window";
import "./Prodotto.css";

function Prodotto(props) {
  return (
    <>
      <div className="boxProdotto">
        <div className="containerProdotto">
          <span className="spaceProdotto"></span>
          <span className="spaceProdotto2"><Button name="Elimina Prodotto"/></span>
        </div>
        <span>&nbsp;</span>
        <ShopWindow
          Description="Una bottiglia riutilizzabile ed ecologica realizzata in acciaio inossidabile di alta qualità, progettata per mantenere le bevande calde per 12 ore e fredde per 24 ore. Leggera, resistente e priva di BPA, è ideale per l'uso quotidiano e le attività outdoor. Disponibile in vari colori."
          ImageDescription="immagine prodotto"
          Name="nome prodotto"
          tipo="prodotto"
          Prezzo="prezzo prodotto"
          mode="neg"
        />
        <span>&nbsp;</span>
        <Caratteristiche peso="10kg" quantità="100" dimensioni="grandi" />
      </div>
    </>
  );
}

export default Prodotto;
