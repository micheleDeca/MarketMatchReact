import { Link } from "react-router-dom";
import "./Login.css";
import {useState} from 'react';

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    return (
        <>
            <div className="LoginBox">
                <p className="title">Login</p>
                <input type="email" placeholder="Email" className="InputLogin" />
                <input type="password" placeholder="Password" className="InputLogin" />
                <p className="word">Password dimenticata?</p>
                <input type="button" value="Login" className="buttonLogin" />
                <p className="word">
                    Non hai un account? <Link to="/RegisterCons" className="link"> Registrati!</Link>
                </p>
            </div>
        </>
    );
}

export default Login;
