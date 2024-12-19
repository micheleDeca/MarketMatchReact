import React from "react";
import Lottie from "react-lottie-player";
import "./FeaturesComponent.css";

// Importa i file JSON delle animazioni
import animation1 from "./assets/sustenable.json";
import animation2 from "./assets/racomander.json";
import animation3 from "./assets/points.json";

const FeaturesComponent = () => {
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
        <h3>Scopri Prodotti Sostenibili</h3>
        <p>Trova prodotti biologici, senza glutine, senza lattosio e vegani vicino a te.</p>
      </div>

      {/* Personalizza la Tua Esperienza */}
      <div className="feature-box">
        <Lottie
          loop
          animationData={animation2}
          play
          className="feature-animation"
        />
        <h3>Personalizza la Tua Esperienza</h3>
        <p>Ricevi consigli e promozioni personalizzate basate sui tuoi gusti.</p>
      </div>

      {/* Premia la Tua Sostenibilità */}
      <div className="feature-box">
        <Lottie
          loop
          animationData={animation3}
          play
          className="feature-animation"
        />
        <h3>Premia la Tua Sostenibilità</h3>
        <p>Accumula Green Points acquistando prodotti sostenibili.</p>
      </div>
    </div>
  );
};

export default FeaturesComponent;
