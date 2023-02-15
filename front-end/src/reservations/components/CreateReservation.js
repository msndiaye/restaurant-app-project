import React, { useState } from "react";
import CreateForm from "../../reusecomponents/CreateForm";
import FormDataError from "../../errors/FormDataError";
import { create } from "../../services/create";
import { useHistory } from "react-router";
import moment from "moment"
import { phoneConvert } from "../../utils/api";

function CreateReservation() {
    const [reservationFormData, setReservationFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    })
    const [error, setError] = useState(null)
    const history = useHistory()

    // this handle form input change
    function handleReservationDataChange({ target }) {
        setError(null)
        setReservationFormData((reservationFormData) => {
            return {
                ...reservationFormData,
                [target.name]: target.name === "people" ? Number(target.value) : target.value.trim()
            }
        })
    }


    async function handleSubmitReservationForm(e) {
        e.preventDefault()

        const { first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people
        } = reservationFormData

        // this allows us to check if the current date is a Tuesday
        const currentDate = moment(reservation_date, "YYYY-MM-DD").format('dddd')
        // this allows to check if the choose date is past
        const pastDate = moment(reservation_date, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"))


        const openTime = moment("10:29", "HH:mm")
        const beforeClosedTime = moment("21:29", "HH:mm")
        // converting the reservation time in 24h format
        const reservationTime = moment(reservation_time, "HH:mm") //24h
        const validReservationTime = reservationTime.isBetween(openTime, beforeClosedTime)

        // error handling on the front end
        if (!first_name.trim()) {
            setError("Please provide the first name")
        } else if (!last_name.trim()) {
            setError("Please provide the last name")
        } else if (!mobile_number.trim() || !phoneConvert(mobile_number)) {
            setError("must be a valid usa mobile number format ex: 800-555-1212 or 1234567890")
        } else if (currentDate === "Tuesday") {
            setError("Please choose different day, the restaurant is closed on Tuesday.")
        } else if (pastDate) {
            setError("Please choose a different date. Past date is not allowed")
        } else if (!validReservationTime) {
            setError("Please choose a time between 10:30am to 21:30 pm")
        } else if (!people || Number(people) <= 0 || Number.isNaN(Number(people))) {
            setError("please provide a positive number greater than equal to 1")
        } else {
            try {
                const { error } = await create(reservationFormData, "reservations")
                if (error) {
                    throw error
                }
                history.push(`/dashboard?date=${reservation_date}`)

            } catch (error) {

                setError(error)

            }
        }


    }

    return (
        <>
            <CreateForm handleReservationDataChange={handleReservationDataChange}
                reservationFormData={reservationFormData}
                handleSubmitReservationForm={handleSubmitReservationForm} />
            <FormDataError error={error} />
        </>
    )
}




export default CreateReservation