import React from "react";

import "../styles/style.css"

function ReservationsButton(
    {
        handleNextDate,
        handleTodayDate,
        handlePreviousDate,
    }
) {

    return (
        <div className="button-container">
            <button type="button" className="btn btn-success"
                onClick={handlePreviousDate}>Previous</button>
            <button type="button" className="btn btn-success"
                onClick={handleTodayDate}>today</button>
            <button type="button" className="btn btn-success"
                onClick={handleNextDate}>Next</button>

        </div>
    )
}



export default ReservationsButton