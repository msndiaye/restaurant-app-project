import React, { useState, useEffect } from "react"
import { useParams, history, useHistory } from "react-router-dom";
import CreateForm from "../reusecomponents/CreateForm"
import moment from "moment"
import Loader from "..//layout/Loader"
import FormDataError from "../errors/FormDataError";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function Edit() {

    const [reservationFormData, setReservationFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    })


    const [error, setError] = useState(null)
    const { reservation_id } = useParams()

    const history = useHistory()

    useEffect(() => {
        const abortController = new AbortController()
        async function loadReservation() {

            try {
                const response = await fetch(
                    `${API_BASE_URL}/reservations/${reservation_id}`,
                    { signal: abortController.signal }
                );
                const { data, error } = await response.json();
                if (error) {
                    throw { message: error }
                }


                setReservationFormData({
                    ...data,
                    reservation_date: moment(data.reservation_date).format("YYYY-MM-DD")
                })
            }
            catch (error) {
                if (error.name === "AbortError") {
                    // Ignore `AbortError`
                    // console.log("Aborted");
                } else {
                    setError(error)
                }
            }


        }



        loadReservation()

        return () => {
            // console.log("cleanup");
            abortController.abort(); // Cancels any pending request or response
        };


    }, [reservation_id])   // i can still omit the reservation_id 


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
            const response = await await fetch(
                `${API_BASE_URL}/reservations/${reservation_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        data: reservationFormData
                    }),
                }
            );
            const { error } = await response.json()

            if (error) {
                throw error
            }

            // const date = moment(reservationFormData.reservation_date).format("YYYY-DD-MM")
            history.push(`/dashboard/?date=${reservationFormData.reservation_date}`)
        } catch (error) {

            setError(error)
        }
    }


    const loading = Object.values(reservationFormData).some(reservation => reservation)
    return (
        <div>

            {!loading ? <Loader /> :
                <CreateForm handleReservationDataChange={handleReservationDataChange}
                    reservationFormData={reservationFormData}
                    handleSubmitReservationForm={handleSubmitReservationForm} />}
            <FormDataError error={error} />
        </div>
    )
}





export default Edit