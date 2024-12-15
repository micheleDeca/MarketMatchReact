import './Prenotation_status_filter.css'

/**
 * A component to display a filter for reservation statuses with visual feedback.
 *
 * @component
 * @param {Object} props - The props object for the PrenStatusFilter component.
 * @param {string} props.first - Label for the first filter option.
 * @param {string} props.second - Label for the second filter option.
 * @param {string} props.third - Label for the third filter option.
 * @param {string} props.fourth - Label for the fourth filter option.
 * @param {string} props.fifth - Label for the fifth filter option.
 *
 * @returns {JSX.Element} A component displaying clickable filter options with styled borders.
 */

function PrenStatusFilter(props) {

  const border = (mode) => {
    const span = document.querySelectorAll(".PrenStatusFilterSpan");
    switch (mode) {
      case "1":
        span[0].style.borderBottom = "3px solid darkslateblue";
        span[1].style.borderBottom = "";
        span[2].style.borderBottom = "";
        span[3].style.borderBottom = "";
        span[4].style.borderBottom = "";
        span[5].style.borderBottom = "";
        break;

      case "2":
        span[0].style.borderBottom = "";
        span[1].style.borderBottom = "3px solid darkslateblue";
        span[2].style.borderBottom = "";
        span[3].style.borderBottom = "";
        span[4].style.borderBottom = "";
        span[5].style.borderBottom = "";
        break;

      case "3":
        span[0].style.borderBottom = "";
        span[1].style.borderBottom = "";
        span[2].style.borderBottom = "3px solid darkslateblue";
        span[3].style.borderBottom = "";
        span[4].style.borderBottom = "";
        span[5].style.borderBottom = "";
        break;

      case "4":
        span[0].style.borderBottom = "";
        span[1].style.borderBottom = "";
        span[2].style.borderBottom = "";
        span[3].style.borderBottom = "3px solid darkslateblue";
        span[4].style.borderBottom = "";
        span[5].style.borderBottom = "";
        break;

      case "5":
        span[0].style.borderBottom = "";
        span[1].style.borderBottom = "";
        span[2].style.borderBottom = "";
        span[3].style.borderBottom = "";
        span[4].style.borderBottom = "3px solid darkslateblue";
        span[5].style.borderBottom = "";
        break;

      case "6":
        span[0].style.borderBottom = "";
        span[1].style.borderBottom = "";
        span[2].style.borderBottom = "";
        span[3].style.borderBottom = "";
        span[4].style.borderBottom = "";
        span[5].style.borderBottom = "3px solid darkslateblue";
        span[5].style.borderBottom = "";
        break;

      default:
        span[0].style.borderBottom = "";
        span[1].style.borderBottom = "";
        span[2].style.borderBottom = "";
        span[3].style.borderBottom = "";
        span[4].style.borderBottom = "";
        span[5].style.borderBottom = "";
    }
  };

  return (
    <>
      <div className='PrenStatusFilterBox'>
        <span className='PrenStatusFilterSpan' onClick={() => border("1")}><p className='PrenStatusFilterP'>{props.first}</p></span>
        <span className='PrenStatusFilterSpan' onClick={() => border("2")}><p className='PrenStatusFilterP'>{props.second}</p></span>
        <span className='PrenStatusFilterSpan' onClick={() => border("3")}><p className='PrenStatusFilterP'>{props.third}</p></span>
        <span className='PrenStatusFilterSpan' onClick={() => border("4")}><p className='PrenStatusFilterP'>{props.fourth}</p></span>
        <span className='PrenStatusFilterSpan' onClick={() => border("5")}><p className='PrenStatusFilterP'>{props.fifth}</p></span>
        <span className='PrenStatusFilterSpan' onClick={() => border("6")}><p className='PrenStatusFilterP'>{props.sixth}</p></span>
      </div>
    </>
  )
}

export default PrenStatusFilter
