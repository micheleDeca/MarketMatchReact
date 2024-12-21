import { useState, useContext } from 'react';  // Importazione separata

import NavBar from './Components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import { useUserContext } from './Context/UserContext';
import Reservation from './Pages/Reservation/Reservation';
import TestAntonio from './Pages/Test/TestAntonio/TestAntonio';
import TestMichele from './Pages/Test/TestMichele/TestMichele';
import TestIsa from './Pages/Test/TestIsa/TestIsa';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Product from './Pages/Product/Product';
import Negozio from './Pages/Negozio/Negozio';
import Prodotto from './Pages/Prodotto/Prodotto';
import Reservations from './Pages/Reservations/Reservations';
import Settings from './Pages/Settings/Settings';
import Ricetta from "./Pages/Ricetta/Ricetta.jsx";
import Account from './Pages/Account/Account.jsx';


/*
*    - "NoAccesso" (utente non loggato)
 *    - "ConA" (consumatore)
 *    - "AmmA" (amministratore)
 *    - "NegA" (negoziante)
*/

const App = () => {
  const [navColorState, setNavColor] = useState("");

  const { userType, setUserType } = useUserContext();

  // Simulazione login
  const handleLogin = (type) => {
    setUserType(type);
  };



  setUserType("ConA");   //NON va settato qui. solo prove

  return (
    <div>
      <NavBar navColor={navColorState} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prenotazioni' element={<Reservations/>} />
        <Route path='/prenotazione' element={<Reservation/>} />
        <Route path='/prodotti' element={<Product />} />
        <Route path='/antonio' element={<TestAntonio /> } />
        <Route path='/michele' element={<TestMichele/> } />
        <Route path='/isabella' element={<TestIsa /> } />
        <Route path='/negozio' element={<Negozio mode="neg" />}/>
        <Route path='/prodotto' element={<Prodotto />}/>
        <Route path='/Ricetta' element={<Ricetta/>}/>
        <Route path='/impostazioni' element={<Settings /> }/>
        <Route path='*' element={<PageNotFound /> }/>
        <Route path='/account' element={<Account /> }/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App