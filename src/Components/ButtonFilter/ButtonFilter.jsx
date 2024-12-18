import './ButtonFilter.css'

export default function ButtonFilter(value){
    return(
      <button className="filter" onClick={value.onclick}>
        Filtra i contenuti
      </button>
    )
   }