import React from "react"


function SearchForm() {

    return (
        <form>
            <div class="input-group mb-3">
                <input type="text" class="form-control"
                    placeholder="Enter a customer's phone number"
                    aria-label="Enter a customer's phone number"
                    name="mobile_number"
                    aria-describedby="button-addon2" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Find</button>
                </div>
            </div>
        </form>
    )
}



export default SearchForm