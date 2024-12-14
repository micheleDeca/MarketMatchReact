import Orari from "../../Components/orari_negozio/orari_negozio";
import ProductLongList from "../../Components/ProductLongList/ProductLongList";
import ShopWindow from "../../Components/shop_window/shop_window";
import "./Negozio.css";

// Simula un database di prodotti
const mockProducts = Array.from({ length: 15 }, (_, index) => {
  const hasDiscount = Math.random() > 0.4; // 50% di probabilità di avere uno sconto
  return {
    id: index + 1,
    name: `Prodotto ${index + 1}`,
    detail: `Dettaglio del prodotto ${index + 1}`,
    currentPrice: (Math.random() * 100).toFixed(2),
    originalPrice: hasDiscount ? (Math.random() * 100 + 100).toFixed(2) : null, // Solo se ha sconto
    image: `https://via.placeholder.com/150?text=Prodotto+${index + 1}`,
  };
});

function Negozio(props) {
  return (
    <>
      <div className="boxNegozio">
        <span>&nbsp;</span>
        <ShopWindow
          Description="Una bottiglia riutilizzabile ed ecologica realizzata in acciaio inossidabile di alta qualità, progettata per mantenere le bevande calde per 12 ore e fredde per 24 ore. Leggera, resistente e priva di BPA, è ideale per l'uso quotidiano e le attività outdoor. Disponibile in vari colori."
          ImageDescription="immagine prodotto"
          Name="nome prodotto"
          tipo="prodotto"
          Prezzo="prezzo prodotto"
        />
        <span>&nbsp;</span>
        <Orari
          mode="neg"
          lunedi="09:00-13:00/15:30-19:00"
          martedi="09:00-13:00/15:30-19:00"
          mercoledi="09:00-13:00/15:30-19:00"
          giovedi="09:00-13:00/15:30-19:00"
          venerdi="09:00-13:00/15:30-19:00"
          sabato="09:00-13:00/15:30-19:00"
          domenica="chiuso"
          posizione="Lombardia,Mi,20100,Milano,Via Roma 1"
          contatti="02 1234567"
        />
        <span>&nbsp;</span>
        <ProductLongList 
        products= {mockProducts}
        
        />
      </div>
    </>
  );
}

export default Negozio;
