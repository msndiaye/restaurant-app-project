import React, { useState, useEffect } from "react"
import TableDataError from "../errors/FormDataError"
import Tables from "./Tables";
import Loader from "../layout/Loader"
import { useParams, useHistory } from "react-router-dom"
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";


function Choosetables() {

    const [tables, setTables] = useState([])
    const [tablesError, setTablesError] = useState(null)
    const [reservation, setReservation] = useState({})
    const [table, setTable] = useState("")
    const [freeTable, setFreeTable] = useState("")
    const { reservation_id } = useParams()
    const history = useHistory()
    // console.log(reservation_id)
    // console.log("reservation_id", reservation_id, useParams(), useRouteMatch())

    useEffect(() => {
        const abortController = new AbortController()
        setTables([])
        setTablesError(null);

        async function loadTables() {

            try {
                const response = await fetch(
                    `${API_BASE_URL}/tables`,
                    { signal: abortController.signal }
                );
                const { data, error } = await response.json();
                if (error) {
                    throw error
                }
                if (data.length === 0) {
                    throw "No table available at this time"
                }
                setTables(data)

                // this allow me to have my first option in my drop down list to be the
                // first element in the tables date
                // to have a default value
                const { table_id } = data[0]
                setTable(table_id)
            }
            catch (error) {
                if (error.name === "AbortError") {
                    // Ignore `AbortError`
                    // console.log("Aborted");
                } else {
                    setTablesError(error)
                }
            }
        }
        loadTables()
        return () => {
            // console.log("cleanup");
            abortController.abort(); // Cancels any pending request or response
        };

    }, [])


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
                    throw error
                }

                setReservation(data)
            }
            catch (error) {
                if (error.name === "AbortError") {
                    // Ignore `AbortError`
                    console.log("Aborted");
                } else {

                }
            }
        }

        loadReservation()


        return () => {
            console.log("cleanup");
            abortController.abort(); // Cancels any pending request or response
        };

    }, [reservation_id]) // i can still omit the reservation_id on the dependency array



    function handleTableChange({ target: { value } }) {
        setFreeTable("")
        setTable(value)
    }

    async function handleSubmitTableForm(e) {
        e.preventDefault()
        const { people } = reservation
        const { capacity, reservation_id: tableReservationId } = tables.find(({ table_id }) => table_id === Number(table))


        if (tableReservationId) {
            setFreeTable("the table seat is taken")


        } else if (people <= capacity) {

            try {
                const response = await fetch(
                    `${API_BASE_URL}/tables/${table}/seat`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: {
                                reservation_id
                            }
                        }),
                    }
                );
                const { error } = await response.json();
                if (error) {
                    throw error
                }

                await fetch(
                    `${API_BASE_URL}/reservations/${reservation_id}/status`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: {
                                status: "seated"
                            }
                        }),
                    }
                );
                history.push("/dashboard")
            }
            catch (error) {

                setFreeTable(error)

            }


        }
        else {

            setFreeTable("there is not enough capacity to host")
        }


    }


    return (
        <div>
            <h1>Hello seat</h1>
            {/* TableDataError is when there is no more table available */}
            <TableDataError error={tablesError} />

            {tables.length ? <Tables tables={tables}
                handleTableChange={handleTableChange}
                handleSubmitTableForm={handleSubmitTableForm}
                table={table}
            /> : null}

            {!tablesError && !tables.length ? <Loader /> : null}
            {freeTable && freeTable}
        </div>
    )

}





export default Choosetables