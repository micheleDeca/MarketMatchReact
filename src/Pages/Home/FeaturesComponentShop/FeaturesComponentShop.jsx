import React from "react";
import Lottie from "react-lottie-player";
import "./FeaturesComponentShop.css";

// Importa i file JSON delle animazioni
import animation1 from "./assets/sustenable.json";
import animation2 from "./assets/racomander.json";
import animation3 from "./assets/points.json";

const FeaturesComponentShop = () => {
  return (
    <div className="features-container">
      {/* Scopri Prodotti Sostenibili */}
      <div className="feature-box">
        <Lottie
          loop
          animationData={animation1}
          play
          className="feature-animation"
        />
        <h3>Dai Visibilità ai Tuoi Prodotti</h3>
        <p>Sponsorizza i tuoi prodotti biologici, vegani e sostenibili per raggiungere più clienti. Ottieni una maggiore esposizione grazie alle funzionalità premium della piattaforma.</p>
      </div>

      {/* Personalizza la Tua Esperienza */}
      <div className="feature-box">
        <Lottie
          loop
          animationData={animation2}
          play
          className="feature-animation"
        />
        <h3>Gestione Semplificata delle Prenotazioni</h3>
        <p>Accetta e organizza le prenotazioni dei tuoi prodotti direttamente dalla piattaforma. Gestisci conferme e disponibilità in modo rapido ed efficiente.</p>
      </div>

      {/* Premia la Tua Sostenibilità */}
      <div className="feature-box">
        <Lottie
          loop
          animationData={animation3}
          play
          className="feature-animation"
        />
        <h3>Accedi a Statistiche Avanzate</h3>
        <p>Scopri quali prodotti sono più richiesti e analizza le preferenze dei tuoi clienti. Utilizza gli insight per ottimizzare le vendite e le promozioni.</p>
      </div>
    </div>
  );
};

export default FeaturesComponentShop;
