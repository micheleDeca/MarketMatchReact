import "./LoginRegister.css";
import Login from "../../Components/Login/Login.jsx";
import Register from "../../Components/Register/Register.jsx";

function LoginRegister(props) {

    return (
        <>
           <div className="LoginRegisterBack">
               {props.mode === "Login" ? (
                    <Login />
               ) : (
                   <Register tipo={props.tipo}/>
               )}
           </div>
        </>
    );
}

export default LoginRegister;
