import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

function ErrorAlertContainer({ reservationsError, tablesError }) {

    return (
        <div>
            <ErrorAlert error={reservationsError} />
            <ErrorAlert error={tablesError} />
        </div>
    )
}




export default ErrorAlertContainer