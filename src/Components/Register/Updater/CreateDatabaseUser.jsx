import axios from 'axios';
import { BASE_URL } from '../../../config';
import { insertDatabaseKeyUpdater } from './InserDatabaseKey';

export const createConsumerDatabase = async ({ props, goToHome }) => {
  const userData = props;

  try {
    const response = await axios.post(
      `${BASE_URL}/api/consumer/CreateConsumer`,
      {
        consInfo: userData,
      },

      {
        headers: {
        },
      }

    );


  } catch (error) {
    alert(error.message); // Gestisci l'errore
  }

};


export const createStoreDatabase = async ({ props, goToHome }) => {
  const registerDataShop = props;
  let storeUuid = null;

  console.log("arrivato",registerDataShop);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/store/CreateStore`,

      {
        negInfo: registerDataShop,
      },

      {
        headers: {
        },
      }

    );

    console.log("STORE CREATO");
    console.log(response.data.storeUuid);
    storeUuid = response.data.storeUuid;

    if(storeUuid){
      await insertDatabaseKeyUpdater("NegA", storeUuid);
    }


  } catch (error) {
    alert(error.message); // Gestisci l'errore
  }

};

