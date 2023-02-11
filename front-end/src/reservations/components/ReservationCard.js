import React from "react";
import { Link } from "react-router-dom"

function ReservationCard({ first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    reservation_id, status,
    handleCancelReservation }) {


    function modalCancel() {

        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            handleCancelReservation(reservation_id)
        }
    }





    return (
        <div className="card" style={{ width: " 18rem" }}>
            <div className="card-header">
                Reservation - {reservation_id}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{first_name}</li>
                <li className="list-group-item">{last_name}</li>
                <li className="list-group-item">{mobile_number}</li>
                <li className="list-group-item">{reservation_date}</li>
                <li className="list-group-item">{reservation_time}</li>
                <li className="list-group-item">{people}</li>
                <li className="list-group-item"
                    data-reservation-id-status={reservation_id}
                >{status}</li>

                {
                    status === "booked" && <li className="list-group-item">
                        <Link to={`/reservations/${reservation_id}/seat`}>
                            <button href={`/reservations/${reservation_id}/seat`}>
                                Seat
                            </button>
                        </Link>
                    </li>
                }

                {status === "booked" && <li className="list-group-item">
                    <Link to={`/reservations/${reservation_id}/edit`}>
                        <button href={`/reservations/${reservation_id}/edit`}>
                            Edit
                        </button>
                    </Link>
                </li>}
                <button type="button" className="btn btn-danger"
                    data-reservation-id-cancel={reservation_id}
                    onClick={modalCancel}>Cancel</button>

            </ul>
        </div>
    )

}

export default ReservationCard