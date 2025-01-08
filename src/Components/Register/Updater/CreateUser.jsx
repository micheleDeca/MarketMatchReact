import axios from 'axios';
import { BASE_URL } from '../../../config';
import { getToken, saveToken } from '../../../LocalStorage/TokenStorage.jsx';
import { createStoreDatabase, createConsumerDatabase } from './CreateDatabaseUser.jsx';

export const createUser = async ({ props, goToHome, userdata, type }) => {
  const requestParam = props;

  console.log(userdata);

  try {

     
    const response = await axios.post(
      `${BASE_URL}/api/auth/local/register`,
      {
        "username": requestParam.username,
        "email": requestParam.email,
        "password": requestParam.password
      },
      {
        headers: {},
      }
    );

    const data = response.data;
    console.log(data);
    saveToken(data.jwt, 30); // Salva il token (non farlo così in produzione)
    console.log(getToken());
   



    if (type === "shop") {
      await createStoreDatabase({
        props: userdata,
        goToHome: goToHome
      });
    } else if (type === "consumer") {
      await createConsumerDatabase({
        props: userdata,
        goToHome: goToHome
      });
    }


  } catch (error) {
    console.error('Errore operazione:', error);
    alert('Errore operazione:', error.message);
    throw error;
  }
};
