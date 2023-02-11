import React, { useState, useEffect } from "react";
import CreateForm from "../../reusecomponents/CreateForm";
import FormDataError from "../../errors/FormDataError";
import { create } from "../../services/create";
import { useHistory } from "react-router";
import moment from "moment"

function CreateReservation() {

    const history = useHistory()
    const [reservationFormData, setReservationFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    })

    const [error, setError] = useState(null)


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


        // const openTime = moment("10:30", "HH:mm")
        // const beforeClosedTime = moment("21:30", "HH:mm")
        // const reservationTime = moment(reservationFormData.reservation_time, "HH:mm") //24h
        // const validReservationTime = reservationTime.isBetween(openTime, beforeClosedTime)
        // const currentDate = moment(reservationFormData.reservation_date, "YYYY-MM-DD").format('dddd')
        // const pastDate = moment(reservationFormData.reservation_date, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"))



        try {
            const { error } = await create(reservationFormData, "reservations")

            if (error) {
                throw error
            }

            history.push(`/dashboard?date=${reservationFormData.reservation_date}`)

        } catch (error) {

            setError(error)

        }

    }



    console.log(reservationFormData.reservation_date, "date")

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