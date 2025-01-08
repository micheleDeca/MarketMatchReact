import axios from 'axios';
import { BASE_URL } from '../../../config';
import { insertDatabaseKeyUpdater } from './InserDatabaseKey';

export const createConsumerDatabase = async ({ props, goToHome }) => {
  const registerDataConsumer = props;
  let consumerUuid = null;

  console.log("arrivato",registerDataConsumer);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/consumer/CreateConsumer`,
      {
        consInfo: registerDataConsumer,
      },

      {
        headers: {
        },
      }

    );

    console.log("CONSUMATORE CREATO");
    console.log(response.data.consumerUuid);
    consumerUuid = response.data.consumerUuid;

    if(consumerUuid){
      await insertDatabaseKeyUpdater("ConA", consumerUuid, goToHome);
    }


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
      await insertDatabaseKeyUpdater("NegA", storeUuid , goToHome);
    }


  } catch (error) {
    alert(error.message); // Gestisci l'errore
  }

};

