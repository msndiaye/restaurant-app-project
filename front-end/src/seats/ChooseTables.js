import React, { useState, useEffect } from "react"
import TableDataError from "../errors/FormDataError"
import Tables from "./Tables";
import Loader from "../layout/Loader"
import { useParams, useRouteMatch } from "react-router-dom"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";


function Choosetables() {

    const [tables, setTables] = useState([])
    const [tablesError, setTablesError] = useState(null)
    const [reservation, setReservation] = useState({})
    const [table, setTable] = useState("")

    const { reservation_id } = useParams()

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
                    console.log("Aborted");
                } else {
                    setTablesError(error)
                }
            }
        }
        loadTables()
        return () => {
            console.log("cleanup");
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

    }, [])



    function handleTableChange({ target: { value } }) { setTable(value) }

    function handleSubmitTableForm(e) {
        e.prevent()

    }

    console.log(table)

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
        </div>
    )

}

















export default Choosetables