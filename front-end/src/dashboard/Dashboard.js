import React, { useEffect, useState } from "react";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationsCard from "../reservations/components/ReservationsCard"
import ReservationsButtons from "../reservations/components/ReservationsButton"
import moment from "moment"
import Loader from "../layout/Loader"
import "./styles/style.css"
import ErrorAlertContainer from "../errors/ErrorAlertContainer";
import TablesCards from "../tables/components/TableCards";
import { useHistory } from "react-router-dom";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function Dashboard() {

  // this will get the date in the query string or defaulted to today's date
  const reservationDate = useQuery().get("date") || today()

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null)
  const [changeDate, setChangeDate] = useState(reservationDate)
  const [tables, setTables] = useState([])
  const [removeTableError, setRemoveTableError] = useState(null)

  const history = useHistory()
  // for loading reservations data
  useEffect(() => {
    const abortController = new AbortController()
    setReservationsError(null);
    setReservations([])
    async function loadReservation() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/reservations?date=${changeDate}`,
          { signal: abortController.signal }
        );
        const { data, error } = await response.json();
        if (error) {
          throw { message: error }
        }
        if (data.length === 0) {
          throw { message: `No reservation is picked for this ${moment(changeDate).format("MM-DD-YYYY")}` }
        }
        setReservations(data)
      }
      catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          setReservationsError(error)
        }
      }

    }

    loadReservation()
    return () => {
      console.log("cleanup");
      abortController.abort(); // Cancels any pending request or response
    };
  }, [changeDate])




  useEffect(() => {
    const abortController = new AbortController()
    setTables([])
    setReservationsError(null);

    async function loadTables() {

      try {
        const response = await fetch(
          `${API_BASE_URL}/tables`,
          { signal: abortController.signal }
        );
        const { data, error } = await response.json();
        if (error) {
          throw { message: error }
        }
        if (data.length === 0) {
          throw { message: "No table available at this time" }
        }
        setTables(data)
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


  async function removeTable(table_id, reservation_id) {
    setRemoveTableError(null)

    try {
      const response = await fetch(
        `${API_BASE_URL}/tables/${table_id}/seat`, {

        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }

      );
      const { data, error } = await response.json();

      if (error) {

        throw { message: error }
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
              status: "finished"
            }
          }),
        }
      );


      history.push("/reservations")

    }
    catch (error) {

      setRemoveTableError(error)
    }

  }

  function handleNextDate() { setChangeDate((changeDate) => next(changeDate)) }
  function handleTodayDate() { setChangeDate(() => today()) }
  function handlePreviousDate() { setChangeDate((changeDate) => previous(changeDate)) }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>

      <ErrorAlertContainer
        reservationsError={reservationsError}
        tablesError={tablesError}
        removeTableError={removeTableError}
      />

      <ReservationsButtons
        handleNextDate={handleNextDate}
        handleTodayDate={handleTodayDate}
        handlePreviousDate={handlePreviousDate} />

      {reservations.length === 0 && !reservationsError ? <Loader /> : null}

      <ReservationsCard
        reservations={reservations}
        reservationsError={reservationsError}
      />
      <TablesCards
        tables={tables}
        tablesError={tablesError}
        removeTable={removeTable}
      />

    </main>
  );
}

export default Dashboard;
