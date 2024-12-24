import "./Counter.css";
import {useState, useEffect} from 'react';
import Add from "./add.png";
import Sub from "./sub.png";

function Counter({initialQuantity, getCounter}) {

    const [contatore, setContatore] = useState(0);
    const incrementa = () => setContatore(contatore + 1);
    const decrementa = () => setContatore(contatore > 0 ? contatore - 1 : 0);

    
    useEffect(() =>{
        setContatore(initialQuantity);
     }, []);

     useEffect(() =>{
        getCounter(contatore);
     }, [contatore]);
     

    return (
        <>
            <div className="CounterBox">
                <img src={Sub} alt="sub" className="ImgCounter" onClick={decrementa}/>
                <p className="value">{contatore}</p>
                <img src={Add} alt="add" className="ImgCounter" onClick={incrementa}/>

            </div>
        </>
    );
}

export default Counter;
