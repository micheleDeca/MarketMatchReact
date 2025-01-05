import './LuogoDataRitiro.css'

export default function LuogoDataRitiro(value) {
    return (
        <div className="luogoDataBox">
            <div className="luogoBox">
                <div className="titleLuogo">
                    <h1>Luogo Ritiro</h1>
                </div>
                <div className="infoLuogo">
                    <h2>{value.nameNeg}</h2>
                    <h3>{value.provincia} - {value.citta} - {value.cap}</h3>
                    <h3>{value.indirizzo}</h3>
                    <h3>{value.contatti}</h3>
                </div>
            </div>
            <div className="dataBox">
                <div className="titleOra">
                    <h1>Orari Ritiro</h1>
                </div>
                <div className="infoOra">
                    {value.orari.map((orario)=>(
                        <h3>{orario}</h3>))}
                </div>
            </div>
        </div>
    )
}