import React from "react"


function SearchForm({ handleSearchChange, handleSubmitSearchForm, search }) {

    return (
        <form onSubmit={handleSubmitSearchForm}>
            <div className="input-group mb-3">
                <input type="text" className="form-control"
                    placeholder="Enter a customer's phone number"
                    aria-label="Enter a customer's phone number"
                    name="mobile_number"
                    aria-describedby="button-addon2"
                    value={search}
                    onChange={handleSearchChange} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Find</button>
                </div>
            </div>
        </form>
    )
}



export default SearchForm