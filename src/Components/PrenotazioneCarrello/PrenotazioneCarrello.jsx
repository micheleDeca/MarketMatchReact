
import ButtonSave from "../ButtonSave/ButtonSave";
import CardLongList from "../CardLongList/CardLongList";
import LuogoDataRitiro from "./Luogo/LuogoDataRitiro";
import './PrenotazioneCarrello.css'

export default function PrenotazioneCarrello(value) {

    const getCounter = (aa) => {
        console.log(aa);
    }

    const products = value.products.map((product) => (product.product));
    const idQuantity = products.map((prodotto) => ({
        id: prodotto.id,
        quantity: prodotto.quantity
    }))
   
    
    return (
        <>
            <div className="prenotationBox">
                <div className="contentBox">
                    <div className="productList">
                        <CardLongList title={value.nameNeg} products={products}
                            getCounter={getCounter} type={"product"} onChangeQuantity={value.onChangeQuantity} />
                    </div>

                    <div className="dateBox">
                        <LuogoDataRitiro nameNeg={value.nameNeg} provincia={value.luogoDataInfo.province} citta={value.luogoDataInfo.city}
                            cap={value.luogoDataInfo.cap} indirizzo={value.luogoDataInfo.address}
                            contatti={value.luogoDataInfo.cell}
                            orari={value.luogoDataInfo.storeHours} />
                    </div>
                </div>
                <div className="totalBox">
                    <h1>TOTALE: {value.luogoDataInfo.totalPrice} €</h1>
                    <div className="prenoteButton">
                        <ButtonSave name={"PRENOTA ordine"} type="prenotation" idNegozio={value.luogoDataInfo.uuid}
                            prodotti={idQuantity} />
                    </div>
                </div>
            </div>
        </>
    )
}