
const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

export async function createReservationService(reservationFormData) {


    const jsonData = await fetch(`http://localhost:5001/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: reservationFormData
        }),
    })

    const reservation = await jsonData.json()
    return reservation
}




