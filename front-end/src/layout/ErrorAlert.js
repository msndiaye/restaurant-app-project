import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {

  return (
    error && (
      <p className="alert m-2"
        style={{ textAlign: "center" }}>Notice: {error.message}</p>
    )
  );
}

export default ErrorAlert;
