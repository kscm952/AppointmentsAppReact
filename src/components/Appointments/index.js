// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    starredFilter: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  starredAppointments = () => {
    this.setState(prevState => ({starredFilter: !prevState.starredFilter}))
  }

  renderAppointmentsList = () => {
    const {appointmentsList, starredFilter} = this.state
    const filteredAppointments = starredFilter
      ? appointmentsList.filter(each => each.isStarred)
      : appointmentsList

    return filteredAppointments.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleIsStarred={this.toggleIsStarred}
      />
    ))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      titleInput,
      dateInput,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {titleInput, dateInput} = this.state

    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="app-heading">Add Appointment</h1>
          <div className="appointment-input-container">
            <form className="form" onSubmit={this.addAppointment}>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                className="title-input"
                id="title"
                placeholder="Title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <br />
              <label htmlFor="date" className="date">
                DATE
              </label>
              <br />
              <input
                type="date"
                className="date-input"
                id="date"
                placeholder="dd/mm/yyyy"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />
              <br />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="separator" />
          <div className="starred-button-container">
            <h1 className="heading">Appointments</h1>
            <button
              className="starred-button"
              type="button"
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">{this.renderAppointmentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
