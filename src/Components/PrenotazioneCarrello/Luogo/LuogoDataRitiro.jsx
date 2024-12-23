import './LuogoDataRitiro.css'

export default function LuogoDataRitiro(value) {
    return (
        <div className="luogoDataBox">
            <div className="luogoBox">
                <div className="titleLuogo">
                    <h1>Luogo Ritiro</h1>
                </div>
                <div className="infoLuogo">
                    <h2>Negozio {value.numNeg}</h2>
                    <h3>{value.provincia} - {value.citta} - {value.cap}</h3>
                    <h3>{value.indirizzo} - {value.civico}</h3>
                    <h3>{value.contatti}</h3>
                </div>
            </div>
            <div className="dataBox">
                <div className="titleOra">
                    <h1>Data Ritiro</h1>
                </div>
                <div className="infoOra">
                    <h2>{value.data}</h2>
                    <h3>{value.descrizione}</h3>
                    <h3>{value.orari}</h3>
                </div>
            </div>
        </div>
    )
}