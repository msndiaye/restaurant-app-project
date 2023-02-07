import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsCard({ reservations, reservationsError }) {

    if (!reservationsError) {
        return (
            <div>
                {
                    reservations.map(({
                        reservation_id,
                        first_name,
                        last_name,
                        mobile_number,
                        reservation_date,
                        reservation_time,
                        people,
                        status
                    }) => {

                        return <ReservationCard key={reservation_id}

                            first_name={first_name}
                            last_name={last_name}
                            mobile_number={mobile_number}
                            reservation_date={reservation_date}
                            reservation_time={reservation_time}
                            people={people}
                            reservation_id={reservation_id}
                            status={status}
                        />
                    })
                }
            </div>
        )
    } else {

        return null
    }

}



export default ReservationsCard