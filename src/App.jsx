import { useState, useContext } from 'react';  // Importazione separata

import NavBar from './Components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import { useUserContext } from './Context/UserContext';
import SliderContainer from './Components/SliderContainer/SliderContainer';
import Reservation from './Pages/Reservation/Reservation';

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
        <Route path='/prenotazione' element={<Reservation/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App