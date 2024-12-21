import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import navLogo from "../../assets/logo.png";
import { useUserContext } from '../../Context/UserContext';
import { Link, useLocation } from 'react-router-dom';


/**
 * 
 * @prop {string} userType - Il tipo di utente che determina la visibilità dei link nel menu. Possibili valori:
 *    - "NoAccesso" (utente non loggato)
 *    - "ConA" (consumatore)
 *    - "AmmA" (amministratore)
 *    - "NegA" (negoziante)
 * 
 * @prop {string} navColor - Colore personalizzato per i link di navigazione. (es. "#FF0000") Base nero
 * 
 * @prop {number} cartItems - Numero di articoli presenti nel carrello. (es. 5)
 * 
 * Esempio di utilizzo:
 * <NavBar userType="ConA" navColor="#4CAF50" cartItems={3} />
 */

const NavBar = () => {
    // Stato per controllare l'apertura della sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [cartItems, setCartItems] = useState(5);
    const { userType } = useUserContext();   // Contesto dell'utente, determina userType
    const [navColor, setNavColor] = useState("");    // Stato per il colore dinamico della navbar
    const location = useLocation();
    const [isStyleActive, setIsStyleActive] = useState(false); // Stato per applicare uno stile speciale alla navbar nella home
    1
    const sidebarRef = useRef(null); // Riferimento per la sidebar, usato per controllare i click esterni
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Funzione che chiude la sidebar se si clicca fuori da essa
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    // Aggiunge/rimuove l'event listener per il click esterno quando la sidebar è aperta
    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);

    // Imposta il colore della navbar dinamicamente in base alla pagina corrente
    useEffect(() => {
        if (location.pathname === "/") {
            setNavColor("white");
            setIsStyleActive(true);
        } else {
            setNavColor("");
            setIsStyleActive(false);
        }
    }, [location.pathname]);

    // Funzione helper per controllare la visibilità dei link in base al tipo di utente
    const isVisibleForUserType = (types) => types.includes(userType);

    // Stili dinamici applicati alla navbar
    const styles = {
        nav: {
            ...(isStyleActive && {
                position: "absolute",
                top: 0,
                left: 0,
                backdropFilter: isSidebarOpen ? "" : "brightness(70%)",
            }),
        },
    };



    return (
        <nav className="flex-div"
            style={styles.nav}>
            <div className="nav-left-wrapper flex-div">
                <div className="nav-left-logo flex-div">
                    <button id="buttonSlideBar" className="sidebar-toggle" onClick={toggleSidebar} style={{ color: navColor }}>☰</button>
                    <span className="navLogo"> {location.pathname === "/" ? (
                        <img className="logo" src={navLogo} alt="Logo" />
                    ) : (
                        <Link to="/">
                            <img className="logo" src={navLogo} alt="Logo" />
                        </Link>
                    )}   </span>             </div>
                <div className="nav-left flex-div">
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <Link to="/prodotti" id="prodottiNav" style={{ color: navColor }} >Prodotti</Link>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#negozi" id="negoziNav" style={{ color: navColor }}>Negozi</a>}
                    {isVisibleForUserType(["NegA"]) && <a href="#negozio" id="negozioNav" style={{ color: navColor }}>Negozio</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#ricette" id="ricetteNav" style={{ color: navColor }}>Ricette</a>}
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <a href="#chiSiamo" id="chiSiamoNav" style={{ color: navColor }}>Chi Siamo</a>}
                </div>
            </div>

            <div className="nav-right flex-div">
                {isVisibleForUserType(["ConA", "AmmA", "NegA"]) && <Link to="/prenotazioni" id="prenotazioniNav" style={{ color: navColor }}>Prenotazioni</Link>}
                {isVisibleForUserType(["AmmA"]) && <a href="#consumatori" id="consumatoriNav" style={{ color: navColor }}>Consumatori</a>}
                {isVisibleForUserType(["ConA", "NegA"]) && <Link to="/account" id="accountNav" style={{ color: navColor }}>Account</Link>}
                {isVisibleForUserType(["AmmA"]) && <a href="#pagamenti" id="pagamentiNav" style={{ color: navColor }}>Pagamenti</a>}
                {isVisibleForUserType(["NoAccesso"]) && <a href="#accedi" id="accediNav" style={{ color: navColor }}>Accedi/Registrati</a>}
                <div className="cart-container">
                    {isVisibleForUserType(["ConA"]) && <a href="#carrello" id="carrelloNav" style={{ color: navColor }} >
                        Carrello
                        {cartItems > 0 && (
                            <span hidden className="cart-quantity" style={{ color: navColor }}>({cartItems})</span>
                        )}
                    </a>}
                </div>
            </div>

            {/* Sidebar - visibile solo se isSidebarOpen è true */}
            {isSidebarOpen && (
                <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`} >
                    <button className="close-sidebar" onClick={toggleSidebar}>✖</button>
                    <div onClick={toggleSidebar}>
                        {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <Link to="/prodotti">Prodotti</Link>}
                        {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#negozi">Negozi</a>}
                        {isVisibleForUserType(["NegA"]) && <a href="#negozio">Negozio</a>}
                        {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#ricette">Ricette</a>}
                        {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <a href="#chiSiamo">Chi Siamo</a>}
                        {isVisibleForUserType(["ConA", "AmmA", "NegA"]) && <Link to="/prenotazioni">Prenotazioni</Link>}
                        {isVisibleForUserType(["ConA", "NegA"]) && <a href="#account" id="accountNav" style={{ color: navColor }}>Account</a>}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
