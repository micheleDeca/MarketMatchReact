import "./Login.css";

function Login() {

    return (
        <>
            <div className="LoginBox">
                <p className="title">Login</p>
                <input type="email" placeholder="Email" className="InputLogin"/>
                <input type="password" placeholder="Password" className="InputLogin"/>
                <p className="word">Password dimenticata?</p>
                <input type="button" value="Login" className="buttonLogin"/>
                <p className="word">Non hai un account? Registrati!</p>
            </div>
        </>
    );
}

export default Login;
