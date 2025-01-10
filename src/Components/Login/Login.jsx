import { Link } from "react-router-dom";
import "./Login.css";
import {useEffect, useState} from 'react';
import { userLogin } from "./Updater/UserLogin";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); // Hook per navigazione

    const [loginData, setLoginData] = useState({});

    const [isValidLogin, setIsValidLogin] = useState(false);

    const handleGoToHome = () => {
        navigate('/', { replace: true }); // Naviga verso la home
        window.location.reload(); // Forza l'aggiornamento della pagina

    };

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

            setIsValidLogin(true);

        } else {
            alert("Per favore, compila tutti i campi richiesti.");
        }
    };

    useEffect(() => {
        console.log(loginData);
    }, [loginData]);

    
    useEffect(()=>{
        if(isValidLogin){
            setIsValidLogin(false);
            userLogin({
                userdata: loginData,
                goToHome: handleGoToHome,
            }

            )
        }


    }, [isValidLogin])

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
                <p className="word">
                    <Link to="/" className="link">Back</Link>
                </p>
            </div>
        </>
    );
}

export default Login;
