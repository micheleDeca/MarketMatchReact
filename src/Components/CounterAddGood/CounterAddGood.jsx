import "./CounterAddGood.css";
import Counter from "../Counter/Counter.jsx";
import AddGood from "../AddGood/AddGood.jsx";

function CounterAddGood() {

    return (
        <>
            <div className="CounterAddGoodBox">
                <div className="counter"><Counter/></div>
                <div className="AddGood"><AddGood/></div>
            </div>
        </>
    );
}

export default CounterAddGood;
