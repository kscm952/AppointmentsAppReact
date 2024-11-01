// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, titleInput, dateInput, isStarred} = appointmentDetails
  const appointmentDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-details">
        <p className="appointment-title">{titleInput}</p>
        <button
          data-testid="star"
          type="button"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="appointment-date">Date: {appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
