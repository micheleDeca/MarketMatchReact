import "./Register.css";

function Register() {

    return (
        <>
            <div className="RegisterBox">
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
                    <div className="CheckBox"><input type="checkbox" className="RegisterCheck" required/><label>gggg</label></div>
                    <input type="checkbox" className="RegisterCheck" required/>
                    <input type="checkbox" className="RegisterCheck" required/>
                    <input type="checkbox" className="RegisterCheck" required/>
                </div>
                <input type="button" value="Register" className="buttonRegister"/>
                <p className="word">Hai già un account? Accedi qui!</p>
            </div>
        </>
    );
}

export default Register;
