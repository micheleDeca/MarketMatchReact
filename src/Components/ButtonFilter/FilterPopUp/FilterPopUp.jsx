import FilterElement from "./FilterElement/FiilterElement";

function FilterPopUp(elements){
    return(
        <>
        <div>
        <h1>
            Ordina per:
        </h1>
        </div>
        <div>
            {{elements.order}.map((element) => <FilterElement name={element}/>)}
        </div>
        </>
    )
}