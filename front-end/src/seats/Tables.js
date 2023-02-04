import React from "react"

import { useHistory } from "react-router"

function Tables({ tables, handleTableChange, handleSubmitTableForm, table }) {

    const history = useHistory()

    return (
        <>

            <form onSubmit={handleSubmitTableForm}>
                <select className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    onChange={handleTableChange}
                    value={table}
                >
                    {
                        tables.map(({ table_name, capacity, table_id }, i) => {
                            return <option value={table_id} key={table_id}>
                                {`${table_name} - ${capacity}`}</option>
                        })
                    }

                </select>
                <input type="submit" value="Submit" />

            </form>
            <input type="submit" value="cancel" onClick={() => history.goBack()} />
        </>
    )

}




export default Tables