import SezioneAccount from "../../Components/SezioneAccount/SezioneAccount"
import './Account.css'
import animation1 from "./assets/5oakBWG66Z.json"
import animation2 from "./assets/xbjrmvz4zi.json"
import animation3 from "./assets/Zxcvc5b9DH.json"
import animation4 from "./assets/vJtKTxTsTl.json"
import { Link } from "react-router"

const Account = () => {

    const gestioneNeg = {
        name: "GESTIONE NEGOZIO",
        descrizione: "Organizza il tuo negozio, gestisci orari, informazioni, categorie e monitoraggio delle attività in semplici passi",
        animation: animation2
    }

    const prodotti = {
        name: "PRODOTTI",
        descrizione: "Gestisci il catalogo dei tuoi prodotti, aggiungi dettagli, prezzi e categorie per ottimizzare le vendite sulla piattaforma",
        animation: animation4
    }

    const prenotazioni = {
        name: "PRENOTAZIONI",
        descrizione: "Monitora e gestisci le prenotazioni ricevute dai clienti, garantendo un servizio puntuale ed efficiente",
        animation: animation1
    }

    const impostazioni = {
        name: "IMPOSTAZIONI",
        descrizione: "Aggiorna le informazioni del tuo profilo, gestisci i dati personali e le impostazioni dell'account",
        animation: animation3
    }

    return (
        <>
            <div className="accountHeader">
                <h1>
                    Il mio Account
                </h1>
            </div>
            <div className="sezButtons">
                <Link to="/negozio" >
                    <SezioneAccount info={gestioneNeg} />
                </Link>
                <Link to="/prodotti">
                <SezioneAccount info={prodotti} />
                </Link>
                <Link to="/prenotazioni">
                <SezioneAccount info={prenotazioni} />
                </Link>
                <Link to="/impostazioni">
                <SezioneAccount info={impostazioni} />
                </Link>
            </div>
        </>
    )
}

export default Account;