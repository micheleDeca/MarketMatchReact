import "./Register.css";
import { Link } from "react-router-dom";

function Register(props) {

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
                    <div className="rowLogin">
                        <div className="rowCheck">
                            <label>Accetto Privacy policy</label>
                            <input type="checkbox" name="option1" value="1" required/>
                        </div>
                        <div className="rowCheck">
                            <label>Consento profilazione</label>
                            <input type="checkbox" name="option2" value="2"/>
                        </div>
                    </div>
                    <div className="rowLogin">
                        <div className="rowCheck">
                            <label>Consento sconti</label>
                            <input type="checkbox" name="option3" value="3" required/>
                        </div>
                        <div className="rowCheck">
                            <label>Consento prenotazioni</label>
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
                        <input type="email" placeholder="Email" className="RegisterInput" required/>
                        <input type="password" placeholder="Password" className="RegisterInput" required/>
                    </div>
                    <input type="password" placeholder="Conferma password" className="RegisterInput" required/>
                    <div className="rowLogin">
                        <div className="rowCheck">
                            <label>Accetto Privacy policy</label>
                            <input type="checkbox" name="Option1" value="1" required/>
                        </div>
                        <div className="rowCheck">
                            <label>Consento profilazione</label>
                            <input type="checkbox" name="Option2" value="2"/>
                        </div>
                    </div>
                    <div className="rowCheck">
                        <label>Consento NewsLetter</label>
                        <input type="checkbox" name="Option3" value="3"/>
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
