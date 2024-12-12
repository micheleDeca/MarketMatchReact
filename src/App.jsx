import { useState, useContext } from 'react';  // Importazione separata

import NavBar from './Components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import { useUserContext } from './Context/UserContext';
import Slider from './Components/Slider/Slider';

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

  const initialStates = [
    { key: 'prenotato', label: 'Prenotato', date: "12/12/2024, 11:36" },
    { key: 'accettato', label: 'Accettato', date: "12/12/2024, 11:36" },
    { key: 'da_ritirare', label: 'Da ritirare', date: null },
    { key: 'annullato', label: 'Annullato', date: null },
    
  ];

  setUserType("ConA");   //NON va settato qui. solo prove

  return (
    <div>
      <NavBar navColor={navColorState} />
      <Routes>
        <Route path='/' element={<Home setNavColor={setNavColor} />} />
        <Route path='/test' element={<Slider initialState={initialStates} canGoBack={true} initialValue={1}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App