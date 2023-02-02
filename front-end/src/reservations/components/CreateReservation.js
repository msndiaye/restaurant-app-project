import React, { useState, useEffect } from "react";
import CreateForm from "../../reusecomponents/CreateForm";
import FormDataError from "../../errors/FormDataError";
import { createReservationService } from "../../services/createReservationService";
import { useHistory } from "react-router";

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

        try {
            const { error } = await createReservationService(reservationFormData)

            if (error) {
                throw error
            }

            history.push(`/dashboard?date=${reservationFormData.reservation_date}`)

        } catch (error) {

            setError(error)

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