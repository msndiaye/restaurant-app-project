import React from "react";

function FormDataError({ error }) {


    if (!error) {
        return null
    }

    return (
        <div className={`${error ? "alert" : ""}  alert-danger`}>
            {error}
        </div>
    )
}




export default FormDataError