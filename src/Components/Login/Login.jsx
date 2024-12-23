import { Link } from "react-router-dom";
import "./Login.css";
import {useState} from 'react';

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleLoginClick = () => {
        // Trova tutti gli input con attributo "required"
        const inputs = document.querySelectorAll(".InputLogin[required]");
        let isValid = true;

        // Controlla se tutti i campi richiesti sono compilati
        inputs.forEach((input) => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add("errorLogin"); // Aggiunge una classe per evidenziare l'errore (opzionale)
            } else {
                input.classList.remove("errorLogin"); // Rimuove la classe di errore se il campo è valido
            }
        });

        if (isValid) {
            // Aggiorna lo stato con i valori degli input
            setLoginData({
                email: inputs[0].value,
                password: inputs[1].value,
            });
        } else {
            alert("Per favore, compila tutti i campi richiesti.");
        }
    };

    return (
        <>
            <div className="LoginBox">
                <p className="title">Login</p>
                <input type="email" placeholder="Email" className="InputLogin" required/>
                <input type="password" placeholder="Password" className="InputLogin" required/>
                <p className="word">Password dimenticata?</p>
                <input type="button" value="Login" className="buttonLogin" onClick={handleLoginClick}/>
                <p className="word">
                    Non hai un account? <Link to="/registerCons" className="link"> Registrati!</Link>
                </p>
            </div>
        </>
    );
}

export default Login;
