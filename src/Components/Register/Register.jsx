import "./Register.css";
import { Link } from "react-router-dom";
import {useState} from 'react';

function Register(props) {
    const [registerDataUser, setregisterDataUser] = useState({
        nome: "",
        cognome: "",
        dataNascita: "",  //opzionale
        email: "",
        password: "",
        genere: "", //non opzionale, ma preferisco non specificare
        Regione: "",
        Provincia: "",
        cap: "",
        citta: "",
        indirizzo: "", //opzionale
        cellulare : "", //opzionale
        privacy: false, //SENZA NO PROFILO
        statistiche: false, //SENZA NO PROFILO
        profilazione: false,
        newsLetter: false,
    });

    const [registerDataShop, setregisterDataShop] = useState({
        ragioneSociale: "",
        pIva: "",
        email: "",
        password: "",
        Regione: "",
        Provincia: "",
        cap: "",
        citta: "",
        indirizzo: "", 
        longitudine: "",    //senza api vanno messe da utente per forza
        latitudine: "", //senza api vanno messe da utente per forza
        cellulare : "",
        privacy: false, //SENZA NO PROFILO
        statistiche: false, //SENZA NO PROFILO
        sconti: "",
        prenotazione: ""
    });

    return (
        <>
            {props.tipo === "neg" ? (
                <div className="RegisterBox">
                    <p className="tipeRegister">
                        <Link to="/RegisterCons" className="link">Sono un consumatore</Link>
                    </p>
                    <p className="title">Register</p>
                    <div className="rowLogin">
                        <input type="text" placeholder="Ragione sociale" className="RegisterInput" required/>
                        <input type="text" placeholder="P.IVA" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="text" placeholder="Regione" className="RegisterInput" required/>
                        <input type="text" placeholder="Provincia" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="text" placeholder="Cap" className="RegisterInput" required/>
                        <input type="text" placeholder="Città" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="text" placeholder="Indirizzo" className="RegisterInput" required/>
                        <input type="text" placeholder="Email" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="email" placeholder="Password" className="RegisterInput" required/>
                        <input type="password" placeholder="Conferma password" className="RegisterInput" required/>
                    </div>
                    <p className="word">Consensi:</p>
                    <div className="rowLogin">
                        <div className="rowCheck">
                            <label>Privacy policy</label>
                            <input type="checkbox" name="option1" value="1" required/>
                        </div>
                        <div className="rowCheck">
                            <label>Analisti statistiche</label>
                            <input type="checkbox" name="option2" value="2" required/>
                        </div>
                    </div>
                    <div className="rowLogin">
                        <div className="rowCheck">
                            <label>Generazione sconti</label>
                            <input type="checkbox" name="option3" value="3" required/>
                        </div>
                        <div className="rowCheck">
                            <label>Utilizzo prenotazioni</label>
                            <input type="checkbox" name="option4" value="4" required/>
                        </div>
                    </div>
                    <input type="button" value="Register" className="buttonRegister"/>
                    <p className="word">Hai già un account?
                        <Link to="/Login" className="link"> Accedi qui!</Link>
                    </p>
                </div>
            ) : (
                <div className="RegisterBox">
                    <p className="tipeRegister">
                        <Link to="/RegisterNeg" className="link">Sono un Negoziante</Link>
                    </p>
                    <p className="title">Register</p>
                    <div className="rowLogin">
                        <input type="text" placeholder="Nome" className="RegisterInput" required/>
                        <input type="text" placeholder="Cognome" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="text" placeholder="Regione" className="RegisterInput" required/>
                        <input type="text" placeholder="Provincia" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="text" placeholder="Cap" className="RegisterInput" required/>
                        <input type="text" placeholder="Città" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="text" placeholder="Cellulare" className="RegisterInput"/>
                        <input type="date" placeholder="Data Nascita" className="RegisterInput"/>
                    </div>
                    <div className="rowLogin">
                        <input type="text" placeholder="Genere" className="RegisterInput" required/>
                        <input type="email" placeholder="Email" className="RegisterInput" required/>
                    </div>
                    <div className="rowLogin">
                        <input type="password" placeholder="Password" className="RegisterInput" required/>
                        <input type="password" placeholder="Conferma password" className="RegisterInput" required/>
                    </div>
                    <p className="word">Consensi:</p>
                    <div className="rowLogin">
                        <div className="rowCheck">
                            <label>Privacy policy</label>
                            <input type="checkbox" name="Option1" value="1" required/>
                        </div>
                        <div className="rowCheck">
                            <label>Analisi statistiche</label>
                            <input type="checkbox" name="Option2" value="2" required/>
                        </div>
                    </div>
                    <div className="rowLogin">
                        <div className="rowCheck">
                            <label>Profilazione</label>
                            <input type="checkbox" name="Option1" value="1"/>
                        </div>
                        <div className="rowCheck">
                            <label>NewsLetter</label>
                            <input type="checkbox" name="Option2" value="2"/>
                        </div>
                    </div>
                    <input type="button" value="Register" className="buttonRegister"/>
                    <p className="word">Hai già un account?
                        <Link to="/Login" className="link"> Accedi qui!</Link>
                    </p>
                </div>
            )}
        </>
    );
};
export default Register;
