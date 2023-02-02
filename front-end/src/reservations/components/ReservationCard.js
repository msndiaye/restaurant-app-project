import React from "react";


function ReservationCard({ first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    reservation_id }) {

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
            </ul>
        </div>
    )

}

export default ReservationCard