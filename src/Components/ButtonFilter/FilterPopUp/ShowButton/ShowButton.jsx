import './ShowButton.css'

export default function ShowButton(value){
    return(
        <button type="submit" className="showButton" onClick={value.onclick}>  {/* quando si aggiungerà il submit vero fare un handler che
                                                                                    chiude il popUp e manda i dati */}
            Mostra tutti i risultati
        </button>
    )
}