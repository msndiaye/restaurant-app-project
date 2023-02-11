
import React from "react";
import { useHistory } from "react-router-dom"

function CreateForm({
    handleReservationDataChange,
    reservationFormData,
    handleSubmitReservationForm }) {

    const history = useHistory()



    return (
        <form onSubmit={handleSubmitReservationForm}>
            <div className="row mb-3">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="firstName"
                        name="first_name"
                        onChange={handleReservationDataChange}
                        value={reservationFormData.first_name}
                        required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">last Name:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="lastName"
                        name="last_name"
                        onChange={handleReservationDataChange}
                        value={reservationFormData.last_name}
                        required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="mobileNumber" className="col-sm-2 col-form-label">Mobile Number:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="mobileNumber"
                        name="mobile_number"
                        onChange={handleReservationDataChange}
                        value={reservationFormData.mobile_number}
                        required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="reservationDate" className="col-sm-2 col-form-label">Date of reservation:</label>
                <div className="col-sm-10">
                    <input type="date"
                        //  placeholder="YYYY-MM-DD"
                        //  pattern="\d{4}-\d{2}-\d{2}"
                        name="reservation_date"
                        className="form-control" id="reservationDate"
                        onChange={handleReservationDataChange}
                        value={reservationFormData.reservation_date}
                        required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="timeReservation" className="col-sm-2 col-form-label">Time of reservation:</label>
                <div className="col-sm-10">
                    <input type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}"
                        name="reservation_time"
                        className="form-control" id="timeReservation"
                        onChange={handleReservationDataChange}
                        value={reservationFormData.reservation_time}
                        required />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="numberOfPeople" className="col-sm-2 col-form-label">Number of people:</label>
                <div className="col-sm-10">
                    <input type="number"
                        name="people"
                        className="form-control" id="numberOfPeople"
                        onChange={handleReservationDataChange}
                        value={reservationFormData.people}
                        required />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">submit</button>
            <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Cancel</button>

        </form>
    )
}

export default CreateForm