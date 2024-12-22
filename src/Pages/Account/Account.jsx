import SezioneAccount from "../../Components/SezioneAccount/SezioneAccount"
import './Account.css'
import animation1 from "./assets/5oakBWG66Z.json"
import animation2 from "./assets/xbjrmvz4zi.json"
import animation3 from "./assets/Zxcvc5b9DH.json"
import animation4 from "./assets/vJtKTxTsTl.json"
import animation5 from "./assets/UGoyu2qZox.json"
import { Link } from "react-router"
import {useUserContext} from '../../Context/UserContext'


const Account = () => {

    const {userType} = useUserContext();

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

    const punti = {
        name: "PUNTI",
        descrizione: "Monitora e gestisci i punti accumulati con gli acquisti. Scopri il saldo punti, il dettaglio delle operazioni e approfitta delle opportunità di risparmio",
        animation: animation5
    }

    const carrello = {
        name: "CARRELLO",
        descrizione: "Visualizza e gestisci i prodotti selezionati per l'acquisto. Controlla quantità, prezzi e procedi al checkout",
        animation: animation2
    }

    return (
        <>
            <div className="accountHeader">
                <h1>
                    Il mio Account
                </h1>
            </div>
            {userType === "NegA" && ( 
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
            </div> )}

            {userType === "ConA" && ( 
            <div className="sezButtons">
                <Link to="/carrello">
                <SezioneAccount info={carrello} />
                </Link>
                <Link to="/prenotazioni">
                <SezioneAccount info={prenotazioni} />
                </Link>
                <Link to="/punti">
                <SezioneAccount info={punti} />
                </Link>
                <Link to="/impostazioni">
                <SezioneAccount info={impostazioni} />
                </Link>
            </div> )}
        </>
    )
}

export default Account;