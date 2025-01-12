import "./Register.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser } from "./Updater/CreateUser";
import { useNavigate } from "react-router-dom";
import { getCoordinateStore } from "./Updater/GetCoordinateStore";

/**
 * Register component that handles the registration of either a shop (neg) or consumer.
 * It validates the form fields, handles user data, and calls API to create the user.
 * Also fetches store coordinates based on the address input.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.tipo - Specifies whether the user is a "neg" (shop owner) or "cons" (consumer).
 * @returns {JSX.Element} The rendered register form.
 */

function Register(props) {
  const navigate = useNavigate(); // Hook per navigazione

  const [registerDataUser, setregisterDataUser] = useState({});

  const [registerDataShop, setregisterDataShop] = useState({});

  const handleShopRegister = () => {
    const inputs = document.querySelectorAll(".RegisterInput");
    const checkboxes = document.querySelectorAll(".rowCheck input");
    const inputsR = document.querySelectorAll(".RegisterInput[required]");
    const checkboxesR = document.querySelectorAll(".rowCheck input[required]");
    const labels = document.querySelectorAll(".rowCheck label");
    const categories = [];
    const rows = document.querySelectorAll(".rowCat");
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

    rows.forEach((row) => {
      const checkbox = row.querySelector("input[type='checkbox']");
      const label = row.querySelector("label");

      if (checkbox.checked) {
        categories.push(label.textContent);
      }
    });

    if (inputs[8].value !== inputs[9].value) {
      isValid2 = false;
      inputs[8].classList.add("errorRegisterInputInequal");
      inputs[9].classList.add("errorRegisterInputInequal");
      alert("Le password non corrispondono");
    } else if (inputs[8].value.length < 6) {
      isValid2 = false;
      inputs[8].classList.add("errorRegisterInputShort");
      alert("La password deve essere di almeno 6 caratteri");
    } else {
      inputs[8].classList.remove("errorRegisterInputInequal");
      inputs[9].classList.remove("errorRegisterInputInequal");
    }

    if (isValid && isValid2) {
      setregisterDataShop((prevState) => ({
        ...prevState,
        ragioneSociale: inputs[0].value,
        pIva: inputs[1].value,
        Regione: inputs[2].value,
        Provincia: inputs[3].value,
        cap: inputs[4].value,
        citta: inputs[5].value,
        indirizzo: inputs[6].value,
        email: inputs[7].value,
        password: inputs[8].value,
        privacy: checkboxes[0].checked,
        statistiche: checkboxes[1].checked,
        sconti: checkboxes[2].checked,
        prenotazione: checkboxes[3].checked,
        categorie: categories.length > 0 ? categories : ["Inserire categorie"],
        ready: true,
      }));
    } else if (!isValid) {
      alert("Per favore, compila tutti i campi richiesti.");
    }
  };

  const handleConsumerRegister = () => {
    const inputs = document.querySelectorAll(".RegisterInput");
    const checkboxes = document.querySelectorAll(".rowCheck input");
    const inputsR = document.querySelectorAll(".RegisterInput[required]");
    const checkboxesR = document.querySelectorAll(".rowCheck input[required]");
    const labels = document.querySelectorAll(".rowCheck label");
    const categories = [];
    const rows = document.querySelectorAll(".rowCat");
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

    rows.forEach((row) => {
      const checkbox = row.querySelector("input[type='checkbox']");
      const label = row.querySelector("label");

      if (checkbox.checked) {
        categories.push(label.textContent);
      }
    });

    if (inputs[10].value !== inputs[11].value) {
      isValid2 = false;
      inputs[10].classList.add("errorRegisterInputInequal");
      inputs[11].classList.add("errorRegisterInputInequal");
      alert("Le password non corrispondono");
    } else if (inputs[10].value.length < 6) {
      isValid2 = false;
      inputs[10].classList.add("errorRegisterInputShort");
      alert("La password deve essere di almeno 6 caratteri");
    } else {
      inputs[10].classList.remove("errorRegisterInputInequal");
      inputs[11].classList.remove("errorRegisterInputInequal");
    }

    if (isValid && isValid2) {
      setregisterDataUser((prevState) => ({
        ...prevState,
        nome: inputs[0].value,
        cognome: inputs[1].value,
        Regione: inputs[2].value,
        Provincia: inputs[3].value,
        cap: inputs[4].value,
        citta: inputs[5].value,
        cellulare:
          inputs[6].value === "" || inputs[6].value === null
            ? null
            : inputs[6].value,
        dataNascita:
          inputs[7].value === "" || inputs[7].value === null
            ? null
            : inputs[7].value,
        genere: inputs[8].value,
        email: inputs[9].value,
        password: inputs[10].value,
        privacy: checkboxes[0].checked,
        statistiche: checkboxes[1].checked,
        profilazione: checkboxes[2].checked,
        newsLetter: checkboxes[3].checked,
        categorie: categories.length > 0 ? categories : ["Inserire categorie"],
        ready: true,
      }));
    } else if (!isValid) {
      alert("Per favore, compila tutti i campi richiesti.");
    }
  };

  const handleGoToHome = () => {
    navigate("/", { replace: true }); // Naviga verso la home
    window.location.reload(); // Forza l'aggiornamento della pagina
  };

  const handleFetchCoordinates = async () => {
    const storeAddres =
      registerDataShop.indirizzo + ", " + registerDataShop.citta;

    try {
      console.log("Fetching coordinates...");
      const coords = await getCoordinateStore(storeAddres); // Esegui la funzione
      console.log("Coordinates fetched:", coords);

      // Aggiorna lo stato con le coordinate
      setregisterDataShop((prev) => ({
        ...prev,
        latitudine: coords.lat,
        longitudine: coords.lon,
      }));
    } catch (err) {
      console.error("Error fetching coordinates:", err);
    }
  };

  useEffect(() => {
    if (registerDataShop.ready) {
      if (!registerDataShop.latitudine) {
        handleFetchCoordinates();
      }
    }
  }, [registerDataShop]);

  useEffect(() => {
    if (registerDataShop.latitudine) {
      // Chiama createUser dopo che le coordinate sono state salvate
      createUser({
        props: {
          username: registerDataShop.email,
          email: registerDataShop.email,
          password: registerDataShop.password,
        },
        goToHome: handleGoToHome,
        userdata: registerDataShop,
        type: "shop",
      });
    }
  }, [registerDataShop.latitudine]);

  useEffect(() => {
    if (registerDataUser.ready) {
      createUser({
        props: {
          username: registerDataUser.email,
          email: registerDataUser.email,
          password: registerDataUser.password,
        },
        goToHome: handleGoToHome,
        userdata: registerDataUser,
        type: "consumer",
      });
    }
  }, [registerDataUser]);

  return (
    <>
      <div className="form-popup" id="myForm">
        <div className="columnCat">
          <div className="rowCat">
            <label>Bio</label>
            <input type="checkbox" name="Option1" value="1" />
          </div>
          <div className="rowCat">
            <label>Senza Lattosio</label>
            <input type="checkbox" name="Option2" value="2" />
          </div>
          <div className="rowCat">
            <label>Vegano</label>
            <input type="checkbox" name="Option1" value="1" />
          </div>
          <div className="rowCat">
            <label>Vegetariano</label>
            <input type="checkbox" name="Option2" value="2" />
          </div>
          <div className="rowCat">
            <label>Senza Glutine</label>
            <input type="checkbox" name="Option1" value="1" />
          </div>
          <div className="rowCat">
            <label>Km0</label>
            <input type="checkbox" name="Option2" value="2" />
          </div>
          <div className="rowCat">
            <label>Sostenibile</label>
            <input type="checkbox" name="Option2" value="2" />
          </div>
          <input
            type="button"
            value="Chiudi"
            className="buttonRegisterCat"
            onClick={() =>
              (document.getElementById("myForm").style.display = "none")
            }
          />
        </div>
      </div>
      {props.tipo === "neg" ? (
        <div className="RegisterBox">
          <p className="tipeRegister">
            <Link to="/registerCons" className="link">
              Sono un consumatore
            </Link>
          </p>
          <p className="title">Register Negoziante</p>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Ragione sociale"
              className="RegisterInput"
              required
            />
            <input
              type="text"
              placeholder="P.IVA"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Regione"
              className="RegisterInput"
              required
            />
            <input
              type="text"
              placeholder="Provincia"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Cap"
              className="RegisterInput"
              required
            />
            <input
              type="text"
              placeholder="Città"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Indirizzo"
              className="RegisterInput"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="password"
              placeholder="Password"
              className="RegisterInput"
              required
            />
            <input
              type="password"
              placeholder="Conferma password"
              className="RegisterInput"
              required
            />
          </div>
          <p className="word">Consensi:</p>
          <div className="rowLogin">
            <div className="rowCheck">
              <label>Privacy policy</label>
              <input type="checkbox" name="option1" value="1" required />
            </div>
            <div className="rowCheck">
              <label>Analisti statistiche</label>
              <input type="checkbox" name="option2" value="2" required />
            </div>
          </div>
          <div className="rowLogin">
            <div className="rowCheck">
              <label>Generazione sconti</label>
              <input type="checkbox" name="option3" value="3" />
            </div>
            <div className="rowCheck">
              <label>Utilizzo prenotazioni</label>
              <input type="checkbox" name="option4" value="4" />
            </div>
          </div>
          <input
            type="button"
            value="Scegli categorie"
            className="buttonRegister"
            onClick={() =>
              (document.getElementById("myForm").style.display = "flex")
            }
          />
          <input
            type="button"
            value="Register"
            className="buttonRegister"
            onClick={handleShopRegister}
          />
          <p className="word">
            Hai già un account?
            <Link to="/login" className="link">
              {" "}
              Accedi qui!
            </Link>
          </p>
          <p className="word">
            <Link to="/" className="link">
              Back
            </Link>
          </p>
        </div>
      ) : (
        <div className="RegisterBox">
          <p className="tipeRegister">
            <Link to="/registerNeg" className="link">
              Sono un negoziante
            </Link>
          </p>
          <p className="title">Register Consumatore</p>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Nome"
              className="RegisterInput"
              required
            />
            <input
              type="text"
              placeholder="Cognome"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Regione"
              className="RegisterInput"
              required
            />
            <input
              type="text"
              placeholder="Provincia"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Cap"
              className="RegisterInput"
              required
            />
            <input
              type="text"
              placeholder="Città"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Cellulare"
              className="RegisterInput"
            />
            <input
              type="date"
              placeholder="Data Nascita"
              className="RegisterInput"
            />
          </div>
          <div className="rowLogin">
            <input
              type="text"
              placeholder="Genere"
              className="RegisterInput"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="RegisterInput"
              required
            />
          </div>
          <div className="rowLogin">
            <input
              type="password"
              placeholder="Password"
              className="RegisterInput"
              required
            />
            <input
              type="password"
              placeholder="Conferma password"
              className="RegisterInput"
              required
            />
          </div>
          <p className="word">Consensi:</p>
          <div className="rowLogin">
            <div className="rowCheck">
              <label>Privacy policy</label>
              <input type="checkbox" name="Option1" value="1" required />
            </div>
            <div className="rowCheck">
              <label>Analisi statistiche</label>
              <input type="checkbox" name="Option2" value="2" required />
            </div>
          </div>
          <div className="rowLogin">
            <div className="rowCheck">
              <label>Profilazione</label>
              <input type="checkbox" name="Option1" value="1" />
            </div>
            <div className="rowCheck">
              <label>NewsLetter</label>
              <input type="checkbox" name="Option2" value="2" />
            </div>
          </div>
          <input
            type="button"
            value="Scegli categorie"
            className="buttonRegister"
            onClick={() =>
              (document.getElementById("myForm").style.display = "flex")
            }
          />
          <input
            type="button"
            value="Register"
            className="buttonRegister"
            onClick={handleConsumerRegister}
          />
          <p className="word">
            Hai già un account?
            <Link to="/login" className="link">
              {" "}
              Accedi qui!
            </Link>
          </p>
          <p className="word">
            <Link to="/" className="link">
              Back
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
export default Register;
