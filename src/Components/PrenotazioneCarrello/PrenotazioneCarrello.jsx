
import ButtonSave from "../ButtonSave/ButtonSave";
import CardLongList from "../CardLongList/CardLongList";
import LuogoDataRitiro from "./LuogoDataRitiro/LuogoDataRitiro";
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
    const id = products.map((prodotto) => ({
        id: prodotto.id
    })).map(item => item.id)
   
    
    return (
        <>
            <div className="prenotationBox">
                <div className="contentBox">
                    <div className={products.length === 1 ? "productList2" : "productList"} >
                        <CardLongList title={value.nameNeg} products={products}
                            getCounter={getCounter} type={"product"} onChangeQuantity={value.onChangeQuantity} setUpdatePage={value.updatePage}/>
                    </div>

                    <div className={products.length === 1 ? "dateBox2" : "dateBox"}>
                        <LuogoDataRitiro nameNeg={value.nameNeg} provincia={value.luogoDataInfo.province} citta={value.luogoDataInfo.city}
                            cap={value.luogoDataInfo.cap} indirizzo={value.luogoDataInfo.address}
                            contatti={value.luogoDataInfo.cell}
                            orari={value.luogoDataInfo.storeHours} />
                    </div>
                </div>
                <div className="totalBox">
                    <h1>TOTALE: {value.luogoDataInfo.totalPrice} €</h1>
                    <div className="prenoteButton">
                        <ButtonSave name="PRENOTA ordine" type="prenotation" idNegozio={value.luogoDataInfo.uuid}
                            prodottiId={id} prodottiIdQuantity={idQuantity} importo={value.luogoDataInfo.totalPrice} setUpdatePage={value.updatePage}/>
                    </div>
                </div>
            </div>
        </>
    )
}