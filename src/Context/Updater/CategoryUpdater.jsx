import { useEffect } from 'react';
import { useCategoryContext } from '../CategoryContex';
import axios from 'axios'; // Importa Axios
import { BASE_URL,IS_MOCKKED } from '../../config';



const CategoryUpdater = () => {
    const { category, setCategory } = useCategoryContext();

    useEffect(() => {
        const fetchCategories = async () => {
           // const token = localStorage.getItem('authToken'); // Recupera il token dal localStorage

            console.log("richiesta effettuata");
            const response = await axios.get(`${BASE_URL}/api/category/getCategories`, {
                headers: {
                        
                    },
                });
                const data = response.data;

                const filteredData = data.filter(item => item.categoryName && item.categoryColor);
                setCategory(filteredData);
         };

        if (category.length === 0) {
            if(IS_MOCKKED){
                setCategory([
                    { categoryName: 'Vegano', categoryColor: '#0ADEA5' },  
                    { categoryName: 'Vegetariano', categoryColor: '#FF9800' },  
                    { categoryName: 'Senza glutine', categoryColor: '#812B9B' },  
                    { categoryName: 'Senza lattosio', categoryColor: '#039BE5' },  
                    { categoryName: 'Bio', categoryColor: 'red' }, 
                    { categoryName: 'Km0', categoryColor: '#CDDC39' },  
                    { categoryName: 'Sostenibile', categoryColor: '#cb4f3e' }
                ]);
            }
            else{
                fetchCategories();
            }
  
        }
    }, []);

    return null;
};


export default CategoryUpdater
