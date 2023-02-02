import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationsCard from "../reservations/components/ReservationsCard"
import ReservationsButtons from "../reservations/components/ReservationsButton"
import moment from "moment"
import Loader from "../layout/Loader"
import "./styles/style.css"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function Dashboard({ date }) {

  // this will get the date in the query string or defaulted to today's date
  const reservationDate = useQuery().get("date") || today()

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [changeDate, setChangeDate] = useState(reservationDate)


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




  function handleNextDate() { setChangeDate((changeDate) => next(changeDate)) }
  function handleTodayDate() { setChangeDate(() => today()) }
  function handlePreviousDate() { setChangeDate((changeDate) => previous(changeDate)) }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {!reservationsError && <ReservationsCard reservations={reservations} />}
      {reservations.length === 0 && !reservationsError ? <Loader /> : null}
      <ReservationsButtons
        handleNextDate={handleNextDate}
        handleTodayDate={handleTodayDate}
        handlePreviousDate={handlePreviousDate} />
    </main>
  );
}

export default Dashboard;
