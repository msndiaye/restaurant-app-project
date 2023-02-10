import React, { useState } from "react";
import FormDataError from "../../errors/FormDataError";
import ReservationsCard from "../../reservations/components/ReservationsCard";
import SearchForm from "./SearchForm";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";


function Search() {

    const [search, setSearch] = useState("")
    const [reservations, setReservations] = useState([])
    const [reservationsError, setReservationsError] = useState(null)

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

    return (
        <div>
            <SearchForm
                handleSearchChange={handleSearchChange}
                handleSubmitSearchForm={handleSubmitSearchForm}
                search={search} />

            <ReservationsCard
                reservations={reservations}
                reservationsError={reservationsError} />

            <FormDataError error={reservationsError} />
        </div>
    )
}



export default Search