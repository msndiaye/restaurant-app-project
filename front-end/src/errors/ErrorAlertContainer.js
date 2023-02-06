import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

function ErrorAlertContainer({ reservationsError, tablesError, removeTableError }) {
    return (
        <div>
            <ErrorAlert error={reservationsError} />
            <ErrorAlert error={tablesError} />
            <ErrorAlert error={removeTableError} />
        </div>
    )
}




export default ErrorAlertContainer