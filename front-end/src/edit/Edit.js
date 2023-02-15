import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import CreateForm from "../reusecomponents/CreateForm"
import moment from "moment"
import Loader from "..//layout/Loader"
import FormDataError from "../errors/FormDataError";
import { phoneConvert } from "../utils/api";
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


        const { first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people
        } = reservationFormData

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
            setError("must be a valid usa mobile format ex: 800-555-1212 or 1234567890 format")
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
                history.push(`/dashboard/?date=${reservation_date}`)
            } catch (error) {

                setError(error)
            }

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