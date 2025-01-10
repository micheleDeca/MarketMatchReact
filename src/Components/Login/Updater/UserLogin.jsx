import axios from 'axios';
import { BASE_URL } from '../../../config';
import { getToken, saveToken } from '../../../LocalStorage/TokenStorage.jsx';

export const userLogin = async ({ userdata, goToHome }) => {
  
    console.log("arrivato in login");
  try {

     
    const response = await axios.post(
      `${BASE_URL}/api/auth/local/`,
      {
        "identifier": userdata.email,
        "password": userdata.password
      },
      {
        headers: {},
      }
    );

    const data = response.data;
    console.log(data);
    saveToken(data.jwt, 30); // Salva il token (non farlo così in produzione)
    console.log(getToken());
    goToHome();



     


  } catch (error) {
    console.error('Errore operazione:', error);
    alert('Credenziali errate', error.message);
    throw error;
  }
};
