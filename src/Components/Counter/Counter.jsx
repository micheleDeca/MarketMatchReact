import "./Counter.css";
import {useState} from 'react';
import Add from "./add.png";
import Sub from "./sub.png";

function Counter() {

    const [contatore, setContatore] = useState(0);
    const incrementa = () => setContatore(contatore + 1);
    const decrementa = () => setContatore(contatore > 0 ? contatore - 1 : 0);

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
