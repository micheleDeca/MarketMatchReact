
import ButtonSave from "../ButtonSave/ButtonSave";
import CardLongList from "../CardLongList/CardLongList";
import LuogoDataRitiro from "./Luogo/LuogoDataRitiro";
import './PrenotazioneCarrello.css'

export default function PrenotazioneCarrello(value) {

    return (
        <>
            <div className="prenotationBox">
                <div className="contentBox">
                    <div className="productList">
                        <CardLongList title={"Negozio " + value.numNeg} products={value.products}/>
                    </div>

                    <div className="dateBox">
                        <LuogoDataRitiro numNeg={value.numNeg} provincia={value.luogoDataInfo.provincia} citta={value.luogoDataInfo.citta} 
                        cap={value.luogoDataInfo.cap} indirizzo={value.luogoDataInfo.indirizzo} civico={value.luogoDataInfo.civico} 
                        contatti={value.luogoDataInfo.contatti} data={value.luogoDataInfo.data} descrizione={value.luogoDataInfo.descrizione}
                        orari={value.luogoDataInfo.orari} />
                    </div>
                </div>
                <div className="totalBox">
                    <h1>TOTALE: 20.98 € </h1>
                    <div className="prenoteButton">
                        <ButtonSave name={"PRENOTA ordine NEGOZIO " + value.numNeg}/>
                    </div>
                </div>
            </div>
        </>
    )
}