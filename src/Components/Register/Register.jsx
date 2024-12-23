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

const handleShopRegister = () => {
    const inputs = document.querySelectorAll(".RegisterInput[required]");
    const checkboxes = document.querySelectorAll(".rowCheck input[required]");
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("errorRegister");
        } else {
            input.classList.remove("errorRegister");
        }
    });

    checkboxes.forEach((checkbox) => {
        if (!checkbox.checked) {
            isValid = false;
            checkbox.classList.add("errorRegister");
        } else {
            checkbox.classList.remove("errorRegister");
        }
    });

    if (isValid) {
        setregisterDataShop({
            ragioneSociale: inputs[0].value,
            pIva: inputs[1].value,
            Regione: inputs[2].value,
            Provincia: inputs[3].value,
            cap: inputs[4].value,
            citta: inputs[5].value,
            indirizzo: inputs[6].value,
            email: inputs[7].value,
            password: inputs[8].value,
            longitudine: "", // Add logic to get this value if needed
            latitudine: "", // Add logic to get this value if needed
            cellulare: "", // Add logic to get this value if needed
            privacy: checkboxes[0].checked,
            statistiche: checkboxes[1].checked,
            sconti: checkboxes[2].checked,
            prenotazione: checkboxes[3].checked,
        });
    } else {
        alert("Per favore, compila tutti i campi richiesti.");
    }
};

const handleConsumerRegister = () => {
    const inputs = document.querySelectorAll(".RegisterInput");
    const checkboxes = document.querySelectorAll(".rowCheck input");
    const inputsR = document.querySelectorAll(".RegisterInput[required]");
    const checkboxesR = document.querySelectorAll(".rowCheck input[required]");
    const labels = document.querySelectorAll(".rowCheck label");
    let isValid = true;
    let isValid2 = true;

    inputsR.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("errorRegisterInput");
        } else {
            input.classList.remove("errorRegisterInput");
        }
    });

    checkboxesR.forEach((checkbox, index) => {
        if (!checkbox.checked) {
            isValid = false;
            labels[index].classList.add("errorRegisterCheck");
        } else {
            labels[index].classList.remove("errorRegisterCheck");
        }
    });

    if(inputs[10].value !== inputs[11].value){
        isValid2 = false;
        inputs[10].classList.add("errorRegisterInputInequal");
        inputs[11].classList.add("errorRegisterInputInequal");
        alert("Le password non corrispondono");
    }
    else{
        inputs[10].classList.remove("errorRegisterInputInequal");
        inputs[11].classList.remove("errorRegisterInputInequal");
    }

    if (isValid && isValid2) {
        setregisterDataUser({
            nome: inputs[0].value,
            cognome: inputs[1].value,
            Regione: inputs[2].value,
            Provincia: inputs[3].value,
            cap: inputs[4].value,
            citta: inputs[5].value,
            cellulare: inputs[6].value,
            dataNascita: inputs[7].value,
            genere: inputs[8].value,
            email: inputs[9].value,
            password: inputs[10].value,
            privacy: checkboxes[0].checked,
            statistiche: checkboxes[1].checked,
            profilazione: checkboxes[2].checked,
            newsLetter: checkboxes[3].checked,
        });
        console.log(registerDataUser);
    } else if(!isValid){
        alert("Per favore, compila tutti i campi richiesti.");
    }
};

    return (
        <>
            {props.tipo === "neg" ? (
                <div className="RegisterBox">
                    <p className="tipeRegister">
                        <Link to="/registerCons" className="link">Sono un consumatore</Link>
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
                        <Link to="/login" className="link"> Accedi qui!</Link>
                    </p>
                </div>
            ) : (
                <div className="RegisterBox">
                    <p className="tipeRegister">
                        <Link to="/registerNeg" className="link">Sono un Negoziante</Link>
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
                    <input type="button" value="Register" className="buttonRegister" onClick={handleConsumerRegister}/>
                    <p className="word">Hai già un account?
                        <Link to="/login" className="link"> Accedi qui!</Link>
                    </p>
                </div>
            )}
        </>
    );
};
export default Register;
