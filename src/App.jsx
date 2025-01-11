import { useState } from 'react'; // Importazione separata
import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import { useUserContext } from './Context/UserContext';
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton.jsx';
import { Suspense, lazy } from 'react';
import CategoryUpdater from './Context/Updater/CategoryUpdater.jsx';
import LoadingPage from './Pages/LoadingPage/LoadingPage.jsx';
import UserUpdater from './Context/Updater/UserUpdater.jsx';
import { IS_MOCKKED } from './config';

/*
 * React.lazy:  
 * React.lazy permette di caricare i componenti in modo "pigro" (lazy loading), ovvero solo quando necessario.
 * Questo è utile per ridurre il tempo di caricamento iniziale dell'applicazione (bundle size) 
 * e migliorare le performance, specialmente in applicazioni con molte pagine o componenti pesanti.
 *
 * Suspense:
 * Suspense è un componente di React che serve a gestire il caricamento dei componenti lazy.
 * Avvolge i componenti pigramente caricati (lazy-loaded) e mostra un contenuto di fallback 
 * (es. "Loading...") fino a quando il componente non è pronto. 
 * È essenziale utilizzare Suspense con React.lazy per garantire che l'utente non veda una pagina vuota durante il caricamento.
 */


// Lazy loading dei componenti
const Home = lazy(() => import('./Pages/Home/Home'));
const Reservation = lazy(() => import('./Pages/Reservation/Reservation'));
const Reservations = lazy(() => import('./Pages/Reservations/Reservations'));
const Product = lazy(() => import('./Pages/Product/Product'));
const Negozio = lazy(() => import('./Pages/Negozio/Negozio'));
const Prodotto = lazy(() => import('./Pages/Prodotto/Prodotto'));
const Ricetta = lazy(() => import('./Pages/Ricetta/Ricetta.jsx'));
const Stores = lazy(() => import('./Pages/Stores/Stores.jsx'));
const SettingsShop = lazy(() => import('./Pages/Settings/Shop/Settings.jsx'));
const SettingsConsumer = lazy(() => import('./Pages/Settings/Consumer/Settings.jsx'));
const Account = lazy(() => import('./Pages/Account/Account.jsx'));
const LoginRegister = lazy(() => import('./Pages/LoginRegister/LoginRegister.jsx'));
const Recipes = lazy(() => import('./Pages/Recipes/Recipes.jsx'));
const Carrello = lazy(() => import('./Pages/Carrello/Carrello.jsx'));
const Punti = lazy(() => import('./Pages/Punti/Punti.jsx'));
const TestAntonio = lazy(() => import('./Pages/Test/TestAntonio/TestAntonio'));
const TestMichele = lazy(() => import('./Pages/Test/TestMichele/TestMichele'));
const TestIsa = lazy(() => import('./Pages/Test/TestIsa/TestIsa'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound/PageNotFound'));
const RetardPage = lazy(() => import( './Components/CardBrutto/RetardPage/RetardPage.jsx'));
const AboutUs = lazy(() => import( './Pages/AboutUs/AboutUs.jsx'));

import { getToken, saveToken } from './LocalStorage/TokenStorage.jsx';
/*
*    - "NoAccesso" (utente non loggato)
 *    - "ConA" (consumatore)
 *    - "AmmA" (amministratore)
 *    - "NegA" (negoziante)
*/

const App = () => {
  const tokenConsumer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2NTg3OTgwLCJleHAiOjE3MzkxNzk5ODB9.IPMBYEbTud5-SesG7TUUB5UTVll3Qn1ZP0Q3YN1aLTc";
  const tokenStore = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzM1OTE5MzQxLCJleHAiOjE3Mzg1MTEzNDF9.BKPA6V5xJsj-peErhycpUe_2-ClygTdCuc04GhTaIMU"; 
  if(IS_MOCKKED)
    saveToken(tokenConsumer,30); //NON FARLO ASSOLUTAMENTE COSì IN PRODUZIONE
  // PER MODIFICARE UTENTE, recarsi in componente "UserUpdater", puoi cliccare control+click qui sott
  return (
    <div>
      <CategoryUpdater />
      <UserUpdater />  
      <NavBar />
      <Suspense fallback={<LoadingPage/>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prenotazioni' element={<Reservations />} />
          <Route path='/prenotazione' element={<Reservation />} />
          <Route path='/prodotti' element={<Product />} />
          <Route path='/antonio' element={<TestAntonio />} />
          <Route path='/michele' element={<TestMichele />} />
          <Route path='/isabella' element={<TestIsa />} />
          <Route path='/negozio' element={<Negozio />} />
          <Route path='/prodotto' element={<Prodotto />} />
          <Route path='/Ricetta' element={<Ricetta />} />
          <Route path='/negozi' element={<Stores />} />
          <Route path='/impostazioni/negozio' element={<SettingsShop />} />
          <Route path='/impostazioni/consumatore' element={<SettingsConsumer />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<LoginRegister mode="Login" />} />
          <Route path='/registerNeg' element={<LoginRegister mode="Register" tipo="neg" />} />
          <Route path='/registerCons' element={<LoginRegister mode="Register" />} />
          <Route path='/ricette' element={<Recipes />} />
          <Route path='/carrello' element={<Carrello />} />
          <Route path='/punti' element={<Punti />} />
          <Route path='/retard' element={<RetardPage />} />
          <Route path='/chiSiamo' element={<AboutUs />} />
         </Routes>
      </Suspense>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
