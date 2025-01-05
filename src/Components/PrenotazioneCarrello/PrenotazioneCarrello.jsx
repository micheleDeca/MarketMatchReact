
import ButtonSave from "../ButtonSave/ButtonSave";
import CardLongList from "../CardLongList/CardLongList";
import LuogoDataRitiro from "./Luogo/LuogoDataRitiro";
import './PrenotazioneCarrello.css'

export default function PrenotazioneCarrello(value) {

    const getCounter = (aa) => {
        console.log(aa);
    }

    return (
        <>
            <div className="prenotationBox">
                <div className="contentBox">
                    <div className="productList">
                        <CardLongList title={value.nameNeg} products={value.products.map((product)=>(product.product))}
                         getCounter={getCounter} type={"product"} />
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
                        <ButtonSave name={"PRENOTA ordine"} />
                    </div>
                </div>
            </div>
        </>
    )
}