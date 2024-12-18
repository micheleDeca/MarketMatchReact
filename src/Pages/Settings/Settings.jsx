import React, { useState, useEffect } from "react";
import './Settings.css'

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Profilo");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vat: "",
  });

  // Gestione della vista mobile
  useEffect(() => {
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

  // Gestione input e checkbox
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dati inviati:", formData);
    alert("Form inviato con successo!");
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
            {/* Ragione Sociale e P.IVA */}
            <div className="form-row">
              <div className="form-group">
                <label>Ragione sociale *</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="BioShop Tagine More"
                  value={formData.companyName || ""}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>P. IVA *</label>
                <input
                  type="text"
                  name="vat"
                  placeholder="123456789"
                  value={formData.vat || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
  
            {/* Cellulare e Informazioni Pagamento */}
            <div className="form-row">
              <div className="form-group">
                <label>Cellulare *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+39 123 456 7894"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Informazioni Pagamento</label>
                <input
                  type="text"
                  name="paymentInfo"
                  placeholder="Carta, contanti e app"
                  value={formData.paymentInfo || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
  
            {/* Descrizione */}
            <div className="form-row">
              <div className="form-group">
                <label>Descrizione *</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Descrizione negozio, Descrizione negozio, Descrizione negozio"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
  
            {/* Mail */}
            <div className="form-row">
              <div className="form-group">
                <label>Mail *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="BioShop Tagine More"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
  
            {/* Password e Conferma Password */}
            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Inserire password.."
                  value={formData.password || ""}
                  onChange={handleInputChange}
                />
              </div>
  
              <div className="form-group">
                <label>Conferma Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Conferma password.."
                  value={formData.confirmPassword || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
  
            {/* Pulsante di aggiornamento */}
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
            {/* Regione e Provincia */}
            <div className="form-row">
              <div className="form-group">
                <label>Regione *</label>
                <input
                  type="text"
                  name="region"
                  placeholder="Regione"
                  value={formData.region || ""}
                  onChange={handleInputChange}
                  disabled
                />
                <small>Questa informazione si modifica dalla pagina Negozio</small>
              </div>
              <div className="form-group">
                <label>Provincia *</label>
                <input
                  type="text"
                  name="province"
                  placeholder="Provincia"
                  value={formData.province || ""}
                  onChange={handleInputChange}
                  disabled
                />
                <small>Questa informazione si modifica dalla pagina Negozio</small>
              </div>
            </div>
            
            {/* CAP e Città */}
            <div className="form-row">
              <div className="form-group">
                <label>CAP *</label>
                <input
                  type="text"
                  name="cap"
                  placeholder="CAP"
                  value={formData.cap || ""}
                  onChange={handleInputChange}
                  disabled
                />
                <small>Questa informazione si modifica dalla pagina Negozio</small>
              </div>
              <div className="form-group">
                <label>Città *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Città"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                  disabled
                />
                <small>Questa informazione si modifica dalla pagina Negozio</small>
              </div>
            </div>
  
            {/* Indirizzo */}
            <div className="form-row">
              <div className="form-group">
                <label>Indirizzo *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Indirizzo"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  disabled
                />
                <small>Questa informazione si modifica dalla pagina Negozio</small>
              </div>
            </div>
  
            {/* Latitudine e Longitudine */}
            <div className="form-row">
              <div className="form-group">
                <label>Latitudine</label>
                <input
                  type="text"
                  name="latitude"
                  placeholder="Latitudine"
                  value={formData.latitude || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Longitudine</label>
                <input
                  type="text"
                  name="longitude"
                  placeholder="Longitudine"
                  value={formData.longitude || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
  
            {/* Pulsante di aggiornamento */}
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
                <label>Preferenza Sconti</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="preferenzaSconti"
                    checked={formData.preferenzaSconti}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Preferenza Prenotazioni</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="preferenzaPrenotazioni"
                    checked={formData.preferenzaPrenotazioni}
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
            <li onClick={() => handleSectionClick("Negozio")}>
              <span>Impostazioni Negozio</span>
              <span className="arrow-icon">&gt;</span>
            </li>
            <div className="divider"></div>
            <li onClick={() => handleSectionClick("Abbonamento")}>
              <span>Abbonamento</span>
              <span className="arrow-icon">&gt;</span>
            </li>
            <div className="divider"></div>
            <li onClick={() => handleSectionClick("Consensi")}>
              <span>Preferenze e Consensi</span>
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
