
import React from "react";
import { useHistory } from "react-router-dom"
// able name: <input name="table_name" />, which must be at least 2 characters long.
// Capacity: <input name="capacity" />, this is the number of 
// people that can be seated at the table, which must be at least 1 person.

function CreateTableForm({
    handleTableDataChange,
    tableFormData,
    handleSubmitTableForm }) {

    const history = useHistory()



    return (
        <form onSubmit={handleSubmitTableForm}>
            <div className="row mb-3">
                <label htmlFor="tableName" className="col-sm-2 col-form-label">Table name:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="tableName"
                        name="table_name"
                        onChange={handleTableDataChange}
                        value={tableFormData.table_name}
                        required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="capacity" className="col-sm-2 col-form-label">Capacity:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="capacity"
                        name="capacity"
                        onChange={handleTableDataChange}
                        value={tableFormData.capacity}
                        required />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Cancel</button>

        </form>
    )
}

export default CreateTableForm