import React, { useState, useEffect } from "react";
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Profilo");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [formData, setFormData] = useState({
    name: "BioShop Tagine More",
    surname: "12345687",
    phone: "3332569874",
    birth: "",
    address: "Vendita al dettaglio di nani biologici",
    email: "bioshop@mail.com",
    password: "",
    confirmPassword: "",
    region: "",
    province: "",
    cap: "",
    city: "",
    preferenzaStatistiche: false,
    consensoPrivacy: false,
    consensoProfilazione: false,
    consensoNewsletter: false,
    categories: ["Bio", "Vegan"]
  });

  // Recupera i dati iniziali dal database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/settings"); // Sostituisci con l'endpoint reale
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
      }
    };

    fetchData();

    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (isMobileView) setShowSidebar(false);
  };

  const goBackToSidebar = () => setShowSidebar(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const categories = prevState.categories;
      if (checked) {
        return { ...prevState, categories: [...categories, value] };
      } else {
        return { ...prevState, categories: categories.filter((cat) => cat !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/settings", {
        method: "PUT", // Sostituisci con il metodo corretto
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Modifiche salvate con successo!");
      } else {
        alert("Errore durante il salvataggio delle modifiche.");
      }
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
      alert("Errore durante l'invio dei dati.");
    }
  };

  const renderContent = () => {
    if (activeSection === "Profilo") {
      return (
        <div className="content-box">
          {isMobileView && !showSidebar && (
            <button className="back-button" onClick={goBackToSidebar}>
              &#8592; Indietro
            </button>
          )}
          <h2>Impostazioni Profilo</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nome*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Cognome *</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cellulare *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Data Nascita</label>
                <input
                  type="text"
                  name="birth"
                  value={formData.birth}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Regione *</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Provincia *</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CAP *</label>
                <input
                  type="text"
                  name="cap"
                  value={formData.cap}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Città *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Indirizzo *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Conferma Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <button type="submit" className="update-button">
                Aggiorna informazioni
              </button>
            </div>
          </form>
        </div>
      );
    } else if (activeSection === "Negozio") {
      return (
        <div className="content-box">
          {isMobileView && !showSidebar && (
            <button className="back-button" onClick={goBackToSidebar}>
              &#8592; Indietro
            </button>
          )}
          <h2>Impostazioni Negozio</h2>
          <form onSubmit={handleSubmit}>
          

            <div className="form-row">
              <div className="form-group">
                <label>Latitudine</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Longitudine</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <button type="submit" className="update-button">
                Aggiorna informazioni
              </button>
            </div>
          </form>
        </div>
      );
    } else if (activeSection === "Consensi") {
      return (
        <div className="content-box">
          {isMobileView && !showSidebar && (
            <button className="back-button" onClick={goBackToSidebar}>
              &#8592; Indietro
            </button>
          )}
          <h2>Preferenze e Consensi</h2>
          <form onSubmit={handleSubmit}>
             
            <div className="form-row">
              <div className="form-group">
                <label>Preferenza Statistiche</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="preferenzaStatistiche"
                    checked={formData.preferenzaStatistiche}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Consenso Privacy Policy</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="consensoPrivacy"
                    checked={formData.consensoPrivacy}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Consenso Profilazione</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="consensoProfilazione"
                    checked={formData.consensoProfilazione}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Consenso Newsletter</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="consensoNewsletter"
                    checked={formData.consensoNewsletter}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-row">
              <button type="submit" className="update-button">
                Aggiorna Consensi
              </button>
            </div>
          </form>
        </div>
      );
    } else if (activeSection === "Categorie") {
      return (
        <div className="content-box">
          {isMobileView && !showSidebar && (
            <button className="back-button" onClick={goBackToSidebar}>
              &#8592; Indietro
            </button>
          )}
          <h2>Seleziona Categorie</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-column">
              <div className="form-group">
                <label>Bio</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    value="Bio"
                    checked={formData.categories.includes("Bio")}
                    onChange={handleCategoryChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="form-group">
                <label>Vegan</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    value="Vegan"
                    checked={formData.categories.includes("Vegan")}
                    onChange={handleCategoryChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="form-group">
                <label>Vegetariano</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    value="Vegetariano"
                    checked={formData.categories.includes("Vegetariano")}
                    onChange={handleCategoryChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="form-group">
                <label>Km0</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    value="Km0"
                    checked={formData.categories.includes("Km0")}
                    onChange={handleCategoryChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="form-group">
                <label>Senza Lattosio</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    value="Senza Lattosio"
                    checked={formData.categories.includes("Senza Lattosio")}
                    onChange={handleCategoryChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="form-group">
                <label>Senza Glutine</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    value="Senza Glutine"
                    checked={formData.categories.includes("Senza Glutine")}
                    onChange={handleCategoryChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-row">
              <button type="submit" className="update-button">
                Aggiorna Categorie
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="settings-container">
      {(!isMobileView || showSidebar) && (
        <div className="sidebar-option">
          {/* Sezione icona + titolo */}
          <div className="welcome">
            <img
              src="src\Pages\Test\TestMichele\sadsdasdas.png" /* Sostituisci con l'URL della tua icona */
              alt="Logo Negozio"
              className="shop-icon"
            />
            <div>
              <h3>BioShop Tagine More</h3>
              <p>Codice negozio: #26515</p>
            </div>
          </div>

          {/* Sezioni cliccabili */}
          <ul>
            <li onClick={() => handleSectionClick("Profilo")}>
              <span>Impostazioni Profilo</span>
              <span className="arrow-icon">&gt;</span>
            </li>
            <div className="divider"></div>
            <li onClick={() => handleSectionClick("Consensi")}>
              <span>Preferenze e Consensi</span>
              <span className="arrow-icon">&gt;</span>
            </li>
            <div className="divider"></div>
            <li onClick={() => handleSectionClick("Categorie")}>
              <span>Categorie</span>
              <span className="arrow-icon">&gt;</span>
            </li>
          </ul>
        </div>
      )}
      {!showSidebar && renderContent()}
      {!isMobileView && <div className="main-content">{renderContent()}</div>}
    </div>
  );
};

export default Settings
