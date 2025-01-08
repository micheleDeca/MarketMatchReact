## Progetto Frontend - MarketMatch (Gruppo 2)

Questo repository contiene il **progetto frontend** del gruppo **MarketMatch**, sviluppato come parte del lavoro del **Gruppo 2**.  
Il frontend è stato realizzato con l'obiettivo di fornire un'interfaccia utente intuitiva e funzionale per il sistema MarketMatch.

### Membri del Gruppo 2:
- **Antonio Bottalico**  
- **Michele De Carolis**  
- **Isabella Balestrucci**

Il progetto rappresenta un lavoro collaborativo volto a soddisfare le specifiche richieste e fornire una soluzione frontend efficiente e scalabile.

# React + Vite

Questo template fornisce una configurazione minima per utilizzare React con Vite, includendo HMR e alcune regole ESLint.

Attualmente, sono disponibili due plugin ufficiali:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utilizza [Babel](https://babeljs.io/) per Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utilizza [SWC](https://swc.rs/) per Fast Refresh

## Configurazione e Personalizzazione

### URL Base delle API e Dati Mocked

Nel file `config.js`, puoi modificare le seguenti variabili:

```javascript
// Decommenta l'URL BASE desiderato per cambiare ambiente
// export const BASE_URL = 'http://localhost:1337';
export const BASE_URL = 'http://4.232.65.20:1337';

export const IS_MOCKED = true; // Imposta a true per utilizzare dati mocked
```

Queste variabili ti permettono di:
- Cambiare l'URL base delle API.
- Abilitare o disabilitare i dati mocked impostando `IS_MOCKED` a `true` o `false`.
- (Da aggiungere) Impostare l'URL base per le immagini.

### Configurazione del Tipo di Utente

Nel file `src/context/updater/userUpdater` puoi configurare il tipo di utente. Questa è una configurazione temporanea e potrebbe subire modifiche con l'evolversi del progetto.

### Configurazione Temporanea del Token

Nel file `App.jsx`, il token di accesso ai dati è impostato in modo temporaneo. Questa configurazione è strettamente provvisoria e sarà sostituita da un meccanismo di autenticazione più robusto in futuro.

---

Sentiti libero di aggiornare ed estendere questo README man mano che il progetto avanza, garantendo chiarezza e manutenibilità.

