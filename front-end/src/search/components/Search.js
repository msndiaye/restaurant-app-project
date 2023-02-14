import React, { useState } from "react";
import FormDataError from "../../errors/FormDataError";
import ReservationsCard from "../../reservations/components/ReservationsCard";
import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";


function Search() {

    const [search, setSearch] = useState("")
    const [reservations, setReservations] = useState([])
    const [reservationsError, setReservationsError] = useState(null)
    const history = useHistory()
    function handleSearchChange({ target: { value } }) {
        setReservationsError(null)
        setSearch(value)
    }

    async function handleSubmitSearchForm(e) {
        e.preventDefault()
        setSearch("")
        setReservationsError(null)
        setReservations([])

        // console.log(search)
        try {
            const response = await fetch(`${API_BASE_URL}/reservations/?mobile_number=${search}`);
            const { data } = await response.json()
            if (data.length === 0) {
                setReservationsError("No reservations found by this number")
            } else {
                setReservations(data)

            }

        } catch (error) {

            setReservationsError("invalid phone number")

        }

    }


    async function handleCancelReservation(reservation_id) {
        await fetch(
            `${API_BASE_URL}/reservations/${reservation_id}/status`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        status: "cancelled"
                    }
                }),
            }
        );


        history.push("/reservations")

    }

    return (
        <div>
            <SearchForm
                handleSearchChange={handleSearchChange}
                handleSubmitSearchForm={handleSubmitSearchForm}
                search={search} />

            <ReservationsCard
                reservations={reservations}
                reservationsError={reservationsError}
                handleCancelReservation={handleCancelReservation} />

            <FormDataError error={reservationsError} />
        </div>
    )
}



export default Search