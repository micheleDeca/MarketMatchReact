useEffect(() => {
  const CreateCons = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/consumer/CreateConsumer`,
        {
          consInfo: registerDataUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token di autenticazione
          },
        }
      );
    } catch (error) {
      setError(error.message); // Gestisci l'errore
    }
  };
  CreateCons();
}, [registerDataUser]);

useEffect(() => {
  const CreateShop = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/store/CreateStore`,
        {
          negInfo: registerDataShop,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token di autenticazione
          },
        }
      );
    } catch (error) {
      setError(error.message); // Gestisci l'errore
    }
  };
  CreateShop();
}, [registerDataShop]);
