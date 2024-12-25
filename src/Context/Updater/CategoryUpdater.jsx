import { useEffect } from 'react';
import { useCategoryContext } from '../CategoryContex';

const CategoryUpdater = () => {
    const { category, setCategory } = useCategoryContext();
 
    useEffect(() => {
        if (category.length === 0) {
            setCategory([
                { categoryName: 'Vegano', categoryColor: '#0ADEA5' },  
                { categoryName: 'Vegetariano', categoryColor: '#FF9800' },  
                { categoryName: 'Senza glutine', categoryColor: '#812B9B' },  
                { categoryName: 'Senza lattosio', categoryColor: '#039BE5' },  
                { categoryName: 'Bio', categoryColor: '#4CAF50' }, 
                { categoryName: 'Km0', categoryColor: '#CDDC39' },  
                { categoryName: 'Sostenibile', categoryColor: '#cb4f3e' }
            ]);
        }
    }, []);
    return null;
};

export default CategoryUpdater
