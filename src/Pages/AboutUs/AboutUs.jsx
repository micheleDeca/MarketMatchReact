import "./AboutUs.css"
const AboutUs = () => {
    return (
      <section className="about-us">
        <div className="container">
          <h1 className="about-title">Chi Siamo</h1>
          <p className="about-tagline">
            Inclusivi per natura, sostenibili per scelta. <strong>MarketMatch</strong> è la piattaforma che trasforma il modo in cui trovi e acquisti prodotti eco-sostenibili e specializzati, creando un ecosistema che supporta consumatori, negozi locali e il nostro pianeta.
          </p>
          <div className="about-content-container">
          <div className="about-content">
            <div className="about-card">
              <h2 className="about-card-title">La nostra missione</h2>
              <p className="about-card-content">
                Vogliamo semplificare la vita di chi cerca prodotti biologici, vegani, senza glutine o senza lattosio, garantendo un accesso rapido e intuitivo a soluzioni che rispettano la salute personale e il benessere ambientale. MarketMatch connette persone e negozi locali, promuovendo un consumo consapevole e sostenibile.
              </p>
            </div>
            <div className="about-card">
              <h2 className="about-card-title">Il nostro impatto</h2>
              <p className="about-card-content">
                Supportiamo l'economia locale dando visibilità ai negozi che offrono soluzioni eco-friendly. Attraverso tecnologie avanzate e strumenti di marketing personalizzati, aiutiamo i commercianti a raggiungere un pubblico più ampio e a competere nel mercato digitale.
              </p>
            </div>
            <div className="about-card">
              <h2 className="about-card-title">Perché MarketMatch</h2>
              <p className="about-card-content">
                Offriamo un’esperienza utente intuitiva e innovativa. Con funzionalità come geolocalizzazione, suggerimenti personalizzati, ricette ispirate ai tuoi gusti e un sistema di ricompense green, vogliamo rendere ogni acquisto un passo verso un futuro più sostenibile.
              </p>
            </div>
          </div>
          </div>
          <div className="about-highlights">
            <h2>Le nostre funzionalità</h2>
            <p>
              MarketMatch combina tecnologia, sostenibilità e accessibilità per offrire un’esperienza unica:
            </p>
            <ul>
              <li>🌍 <strong>Geolocalizzazione</strong>: trova negozi e prodotti vicino a te.</li>
              <li>📋 <strong>Suggerimenti personalizzati</strong>: basati su preferenze e cronologia.</li>
              <li>🎁 <strong>Green Points</strong>: sistema di ricompensa per acquisti sostenibili.</li>
              <li>🛒 <strong>Prenotazioni online</strong>: riserva prodotti comodamente.</li>
              <li>🍳 <strong>Ricette su misura</strong>: crea piatti sani e gustosi con i prodotti locali.</li>
              <li>💡 <strong>Offerte e promozioni</strong>: risparmia mentre supporti negozi eco-friendly.</li>
            </ul>
          </div>
          <div className="about-vision">
            <h2>Il nostro obiettivo</h2>
            <p>
              Crediamo in un futuro dove ogni scelta di acquisto può fare la differenza. Il nostro obiettivo è creare un mondo in cui:
            </p>
            <ul>
              <li>I consumatori trovano con facilità prodotti adatti a diete specifiche, allergie o intolleranze.</li>
              <li>I negozi locali ottengono visibilità e strumenti per crescere.</li>
              <li>Il benessere personale e ambientale sono al centro di ogni decisione.</li>
            </ul>
          </div>
          <div className="about-values">
            <h2>I nostri valori</h2>
            <p>
              Ogni funzionalità e decisione che prendiamo si basa su valori fondamentali:
            </p>
            <ul>
              <li><strong>Sostenibilità:</strong> incoraggiamo pratiche che riducono l’impatto ambientale.</li>
              <li><strong>Inclusività:</strong> soddisfiamo le esigenze di ogni utente, dalle intolleranze alimentari a preferenze di dieta.</li>
              <li><strong>Innovazione:</strong> utilizziamo tecnologie avanzate per personalizzare l’esperienza utente.</li>
              <li><strong>Comunità:</strong> sosteniamo i piccoli commercianti e rafforziamo le economie locali.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  